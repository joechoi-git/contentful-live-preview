/* eslint-disable indent */
import type { IBlogPost, IBlogPostFields } from "./generatedTypes";

/*
type Blog = {
    sys: {
        id: string;
        publishedAt: string;
        publishedVersion: number;
    };
    slug: string;
    title: string;
    summary: string;
    author: string;
    heroImage?: {
        sys?: {
            id: string;
        };
        url: string;
    };
    categoryName: string;
    // date: Date;
    date: string;
    details: {
        json: any;
    };
};

// omit details
export type RelatedBlog = Omit<Blog, "details"> & {
    details?: {
        json: any;
    };
};

export type BlogDetail = Blog & {
    relatedBlogsCollection?: {
        items: RelatedBlog[];
    };
};
*/

type Asset = {
    sys?: {
        id: string;
    };
    url: string;
};

type Document = {
    json: any;
};

export interface BlogDetailProps extends Omit<IBlogPostFields, "details" | "heroImage">, IBlogPost {
    sys: IBlogPost["sys"] & {
        publishedAt: string;
        publishedVersion: number;
    };
    details: Document;
    heroImage: Asset;
    relatedBlogsCollection?: {
        items: BlogDetailProps[];
    };
}

// Define BlogDetailProps with extended heroImage field
export interface BlogDetailProps2 extends IBlogPostFields, IBlogPost {
    sys: IBlogPost["sys"] & {
        publishedAt: string;
        publishedVersion: number;
    };
    /*
    slug: IBlogPostFields["slug"];
    title: IBlogPostFields["title"];
    summary: IBlogPostFields["summary"];
    author: IBlogPostFields["author"];
    categoryName: IBlogPostFields["categoryName"];
    date: IBlogPostFields["date"];
    */
    details: IBlogPostFields["details"] & Document;
    heroImage: IBlogPostFields["heroImage"] & Asset;
    relatedBlogsCollection?: {
        items: BlogDetailProps[];
    };
}

// Set a variable that contains all the fields needed for blogs when a fetch for content is performed
/*
// GraphQL playground
query {
  blogPostCollection(where: { slug: "supporting-neurodevelopment-of-pediatric-heart-patients-4-new-initiatives" }) {
    items {
      sys {
        id
      }
      title
      summary
      heroImage {
        url
      }
      slug
      details {
        json
      }
      date
      author
      categoryName
      relatedBlogsCollection {
        items {
          sys {
            id
          }
          title
          summary
          heroImage {
            url
          }
          slug
          date
          author
          categoryName
        }
      }
    }
  }
}
*/
const BLOG_GRAPHQL_FIELDS = `
    sys {
        id
        publishedAt
        publishedVersion
    }
    __typename
    title
    slug
    summary
    details {
        json
    }
    date
    author
    categoryName
    heroImage {
        sys {
            id
        }
        __typename
        url
    }
    relatedBlogsCollection {
        items {
            sys {
                id
                publishedAt
                publishedVersion
            }
            title
            summary
            heroImage {
                sys {
                    id
                }
                __typename
                url
            }
            slug
            date
            author
            categoryName
        }
    }
`;

async function fetchGraphQL(query: string, preview = false, tags: [string] = [""]) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Switch the Bearer token depending on whether the fetch is supposed to retrieve draft or published content
                Authorization: `Bearer ${
                    preview
                        ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                        : process.env.CONTENTFUL_ACCESS_TOKEN
                }`
            },
            body: JSON.stringify({ query }),
            // Add a Next.js specific header with tags to revalidate the content:
            // Associate all fetches for blogs with an "blogs" cache tag so content can be revalidated or updated from Contentful on publish
            next: { tags, revalidate: 0 }
        }
    ).then((response) => response.json());
}

function extractBlogEntries(fetchResponse: { data: { blogPostCollection: { items: any } } }) {
    return fetchResponse?.data?.blogPostCollection?.items;
}

export async function getAllBlogs(limit = 20, isDraftMode = false) {
    const blogs = await fetchGraphQL(
        `query {
      blogPostCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
          isDraftMode ? "true" : "false"
      }) {
          items {
            ${BLOG_GRAPHQL_FIELDS}
          }
        }
      }`,
        isDraftMode,
        ["blogs"]
    );

    return extractBlogEntries(blogs);
}

export async function getBlog(slug: string, isDraftMode = false) {
    const blog = await fetchGraphQL(
        `query {
      blogPostCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
          isDraftMode ? "true" : "false"
      }) {
          items {
            ${BLOG_GRAPHQL_FIELDS}
          }
        }
      }`,
        isDraftMode,
        [slug]
    );
    // console.log("getBlog", JSON.stringify(blog, null, 4));
    return extractBlogEntries(blog)[0];
}
