import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getBlog } from "../../../../lib/contentful/GraphQL";
import { Blog } from "../../../../components/Blog";
import { ContentfulPreviewProvider } from "../../../../components/ContentfulPreviewProvider";
import { convertLocale } from "@/lib/contentful/Utils";

export const revalidate = 0; // if this is the preview site

export default async function BlogPage({ params }: { params: { slug: string; locale: string } }) {
    const { isEnabled } = draftMode();
    const blog = await getBlog(params.slug, isEnabled, params.locale);

    if (!blog) {
        notFound();
    }

    return (
        <ContentfulPreviewProvider
            locale={convertLocale(params.locale)}
            enableInspectorMode={isEnabled}
            enableLiveUpdates={isEnabled}
        >
            <Blog blog={blog} />
        </ContentfulPreviewProvider>
    );
}
