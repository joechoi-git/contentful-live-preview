import { DEFAULT_LANGUAGE } from "./Constants";
import { convertLocale } from "./Utils";

/* eslint-disable indent */
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
    heroImage {
        sys {
            id
        }
        __typename
        url
    }
    date
    author
    categoryName
    carousel
    details {
        json
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
      date
      author
      categoryName
      carousel
      details {
        json
      }
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

export async function getAllBlogs(limit = 20, isDraftMode = false, locale = DEFAULT_LANGUAGE) {
    // console.log("getAllBlogs", limit, isDraftMode, locale);
    const blogs = await fetchGraphQL(
        `query {
      blogPostCollection(where:{slug_exists: true}, locale: "${convertLocale(locale)}", order: date_DESC, limit: ${limit}, preview: ${
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
    // console.log("getAllBlogs", JSON.stringify(blogs, null, 4));
    return extractBlogEntries(blogs);
}

export async function getBlog(slug: string, isDraftMode = false, locale = DEFAULT_LANGUAGE) {
    // console.log("getBlog", slug, isDraftMode, locale);
    const blog = await fetchGraphQL(
        `query {
      blogPostCollection(where:{slug: "${slug}"}, locale: "${convertLocale(locale)}", limit: 1, preview: ${
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
