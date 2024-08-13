import { getAllBlogs } from "../../lib/contentful/GraphQL";
import type { BlogProps } from "../../lib/contentful/adjustedTypes";
import { draftMode } from "next/headers";
import Iframe from "../../components/Iframe";
import Card from "../../components/Card";
import { getI18n } from "../../locales/server"; // getScopedI18n

export const revalidate = 0; // if this is the preview site

/*
// At build time, fetch all slugs to build the blog pages so they are static and cached
export async function generateStaticParams() {
    const allBlogs = await getAllBlogs();

    return allBlogs.map((blog: BlogProps) => ({
        slug: blog.slug
    }));
}
*/

export default async function Home({ params }: { params: { locale: string } }) {
    const { isEnabled } = draftMode();
    const blogs: BlogProps[] = await getAllBlogs(20, isEnabled, params.locale);

    let draft = 0;
    let published = 0;
    for (const blog of blogs) {
        if (blog.sys.publishedAt) {
            published = published + 1;
        } else {
            draft = draft + 1;
        }
    }

    const i18n = await getI18n();

    return (
        <>
            <Iframe />
            <h1 className="text-3xl font-bold tracking-tighter text-accent">
                {i18n("researchLibrary")}
            </h1>
            <p className="mt-2 text-xl/relaxed">{i18n("exploreLibrary")}</p>
            <p className="mt-2 text-xl/relaxed">
                {params.locale === "en" ? (
                    <>
                        {blogs.length} articles ({draft} drafts and {published} published) found.
                    </>
                ) : (
                    <>
                        {blogs.length} artículos ({draft} borradores y {published} publicados)
                        encontrados.
                    </>
                )}
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog: BlogProps) => (
                    <Card key={blog.sys.id} blog={blog} />
                ))}
            </div>
        </>
    );
}
