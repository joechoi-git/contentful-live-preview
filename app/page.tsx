import { BlogDetail, getAllBlogs } from "@/lib/contentful/api";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { isoToFriendlyDate, isoToFriendlyDateTime } from "@/lib/contentful/options";
import Iframe from "../components/Iframe";

export const revalidate = 60;

export default async function Home() {
    const { isEnabled } = draftMode();
    const blogs: BlogDetail[] = await getAllBlogs(20, isEnabled);

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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Research Library
                </h1>
                <p className="text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                    Explore the latest innovations, clinical trials and research articles
                </p>
            </div>
            <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                {blogs.length} articles ({draft} drafts and {published} published) found.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog: BlogDetail) => (
                    <article
                        key={blog.sys.id}
                        className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden"
                    >
                        <Link href={`/blogs/${blog.slug}`}>
                            <Image
                                alt="placeholder"
                                className="aspect-[4/3] object-cover w-full"
                                height="263"
                                src={blog?.heroImage?.url ?? "/default.jpeg"}
                                width="350"
                            />
                        </Link>
                        <div className="flex-1 p-6">
                            <Link href={`/blogs/${blog.slug}`}>
                                <h3 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50  py-4">
                                    {blog.title}
                                </h3>
                            </Link>
                            <div className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-800">
                                {blog.categoryName}
                            </div>
                            <p className="max-w-none text-zinc-500 mt-4 mb-2 text-sm dark:text-zinc-400">
                                {blog.summary}
                            </p>
                            <p className="max-w-none text-zinc-600 mt-2 mb-2 text-sm font-bold dark:text-zinc-400">
                                Authored By: {blog.author}
                            </p>
                            <p className="max-w-none text-zinc-600 mt-2 mb-2 text-sm font-bold dark:text-zinc-400">
                                Authored On:{" "}
                                {blog.date ? isoToFriendlyDate(blog.date.toString()) : ""}
                            </p>
                            <p className="max-w-none text-red-600 mt-2 mb-2 text-sm font-bold dark:text-red-400">
                                Published On:{" "}
                                {blog.sys.publishedAt
                                    ? isoToFriendlyDateTime(blog.sys.publishedAt.toString())
                                    : "In Draft"}
                            </p>
                            <div className="flex justify-end">
                                <Link
                                    className="inline-flex h-10 items-center justify-center text-sm font-medium"
                                    href={`/blogs/${blog.slug}`}
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}
