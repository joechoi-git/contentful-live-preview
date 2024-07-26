import { getAllBlogs } from "../lib/contentful/GraphQL";
import type { BlogProps } from "../lib/contentful/adjustedTypes";
import { draftMode } from "next/headers";
import Iframe from "../components/Iframe";
import Card from "../components/Card";

export const revalidate = 0;

export default async function Home() {
    const { isEnabled } = draftMode();
    const blogs: BlogProps[] = await getAllBlogs(20, isEnabled);

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
            <h1 className="text-3xl font-bold tracking-tighter text-accent">Research Library</h1>
            <p className="mt-2 text-xl/relaxed">
                Explore the latest innovations, clinical trials and research articles
            </p>
            <p className="mt-2 text-xl/relaxed">
                {blogs.length} articles ({draft} drafts and {published} published) found.
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog: BlogProps) => (
                    <Card key={blog.sys.id} blog={blog} />
                ))}
            </div>
        </>
    );
}
