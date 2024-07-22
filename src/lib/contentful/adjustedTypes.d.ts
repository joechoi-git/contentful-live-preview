import type { IBlogPost, IBlogPostFields } from "./generatedTypes";

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
