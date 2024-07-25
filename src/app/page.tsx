import { getAllBlogs } from "../lib/contentful/GraphQL";
import type { BlogDetailProps } from "../lib/contentful/adjustedTypes";
import { draftMode } from "next/headers";
import Iframe from "../components/Iframe";
import Card from "../components/Card";

export const revalidate = 0;

export default async function Home() {
    const { isEnabled } = draftMode();
    const blogs: BlogDetailProps[] = await getAllBlogs(20, isEnabled);

    let draft = 0;
    let published = 0;
    for (const blog of blogs) {
        if (blog.sys.publishedAt) {
            published = published + 1;
        } else {
            draft = draft + 1;
        }
    }

    return (
        <>
            <Iframe />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Research Library</h1>
            <p className="text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                Explore the latest innovations, clinical trials and research articles
            </p>
            <p className="my-6 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                {blogs.length} articles ({draft} drafts and {published} published) found.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog: BlogDetailProps) => (
                    <Card key={blog.sys.id} blog={blog} />
                ))}
            </div>
        </>
    );
}
