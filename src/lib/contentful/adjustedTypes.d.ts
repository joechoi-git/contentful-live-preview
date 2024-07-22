import type { IBlogPost, IBlogPostFields } from "./generatedTypes";

type Sys = {
    publishedAt: string;
    publishedVersion: number;
};

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
    sys: IBlogPost["sys"] & Sys; // extend with &
    details: Document; // override with omit
    heroImage: Asset; // override with omit
    relatedBlogsCollection?: {
        items: BlogDetailProps[]; // add
    };
}
