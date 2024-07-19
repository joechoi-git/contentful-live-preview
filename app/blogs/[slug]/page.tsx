import { BlogDetail, getAllBlogs, getBlog } from "@/lib/contentful/api";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Blog } from "@/components/Blog";
import { ContentfulPreviewProvider } from "@/components/ContentfulPreviewProvider";

export const revalidate = 60;

// At build time, fetch all slugs to build the blog pages so they are static and cached
export async function generateStaticParams() {
    const allBlogs = await getAllBlogs();

    return allBlogs.map((blog: BlogDetail) => ({
        slug: blog.slug
    }));
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
    const { isEnabled } = draftMode();
    const blog = await getBlog(params.slug, isEnabled);

    if (!blog) {
        notFound();
    }

    return (
        <ContentfulPreviewProvider
            locale="en-US"
            enableInspectorMode={isEnabled}
            enableLiveUpdates={isEnabled}
        >
            <Blog blog={blog} />
        </ContentfulPreviewProvider>
    );
}
