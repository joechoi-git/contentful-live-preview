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

type BynderAsset = {
    archive: number;
    brandId: string;
    copyright: string | null;
    dateCreated: string;
    dateModified: string;
    datePublished: string;
    description: string | null;
    extension: string[];
    fileSize: number;
    height: number;
    id: string;
    isPublic: number;
    limited: number;
    name: string;
    orientation: string;
    original: string;
    thumbnails: {
        webimage: string;
        thul: string;
        original: string;
        mini: string;
        transformBaseUrl: string;
        Social: string;
    };
    type: string;
    watermarked: number;
    width: number;
    videoPreviewURLs: string[];
    tags: string[];
    textMetaproperties: string[];
    src: string;
};

export interface BlogDetailProps
    extends Omit<IBlogPostFields, "details" | "heroImage" | "carousel">,
        IBlogPost {
    sys: IBlogPost["sys"] & Sys; // extend with &
    details: Document; // override with omit
    heroImage: Asset; // override with omit
    carousel: BynderAsset; // override with omit
    relatedBlogsCollection?: {
        items: BlogDetailProps[]; // add
    };
}
