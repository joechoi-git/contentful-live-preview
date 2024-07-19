/*
  We have to make this a client component to use the `useContentfulInspectorMode` and `useContentfulLiveUpdates` hooks to enable live preview mode.
  This does not mean it is rendered on the client, but that the HTML, CSS and JavaScript are shipped to the client to hydrate the page.
  This is necessary because we need interactivity to enable live preview mode.
*/
"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import {
    useContentfulInspectorMode,
    useContentfulLiveUpdates
} from "@contentful/live-preview/react";
import type { BlogDetail, RelatedBlog } from "@/lib/contentful/api";
import { renderOption, isoToFriendlyDate, isoToFriendlyDateTime } from "@/lib/contentful/options";
import { ContentfulLivePreview } from "@contentful/live-preview";
import Iframe from "../components/Iframe";
import Link from "next/link";

export const Blog = ({ blog }: { blog: BlogDetail }) => {
    const updatedBlog = useContentfulLiveUpdates(blog);
    const inspectorProps = useContentfulInspectorMode({ entryId: blog.sys.id });

    return (
        <>
            <Iframe entryId={blog.sys.id} />
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl"
                    {...inspectorProps({ fieldId: "title" })}
                >
                    {updatedBlog.title}
                </h1>
                <p
                    className="text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400"
                    {...inspectorProps({ fieldId: "summary" })}
                >
                    {updatedBlog.summary}
                </p>
            </div>
            <div className="space-y-4 md:space-y-6">
                <Image
                    alt="Blog Image"
                    className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                    height="365"
                    src={
                        updatedBlog?.heroImage?.url
                            ? (updatedBlog?.heroImage?.url as string)
                            : "/default.jpeg"
                    }
                    width="650"
                    {...ContentfulLivePreview.getProps({
                        assetId: updatedBlog.heroImage?.sys?.id || "",
                        fieldId: "file"
                    })}
                />
                <div className="md:text-lg/relaxed lg:text-sm/relaxed xl:text-lg/relaxed">
                    <p
                        className="text-zinc-500 dark:text-zinc-400"
                        {...inspectorProps({ fieldId: "author" })}
                    >
                        Authored By: {updatedBlog.author}
                    </p>
                    <p
                        className="text-zinc-500 dark:text-zinc-400"
                        {...inspectorProps({ fieldId: "date" })}
                    >
                        Authored On:{" "}
                        {updatedBlog.date ? isoToFriendlyDate(updatedBlog.date.toString()) : ""}
                    </p>
                    <p className="text-red-600 dark:text-red-400">
                        Published On:{" "}
                        {blog.sys.publishedAt
                            ? isoToFriendlyDateTime(blog.sys.publishedAt.toString())
                            : "In Draft"}
                    </p>
                </div>
                <div className="dark:text-zinc-400" {...inspectorProps({ fieldId: "details" })}>
                    {updatedBlog?.details?.json
                        ? documentToReactComponents(updatedBlog.details.json, renderOption)
                        : null}
                </div>
                {updatedBlog?.relatedBlogsCollection &&
                    updatedBlog?.relatedBlogsCollection?.items?.length > 0 && (
                        <div>
                            <h2
                                className="text-2xl font-bold tracking-tighter sm:text-5xl mb-8"
                                {...inspectorProps({ fieldId: "relatedBlogs" })}
                            >
                                Related Blogs
                            </h2>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {updatedBlog?.relatedBlogsCollection?.items?.map(
                                    (blog: RelatedBlog) => (
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
                                                    {blog.date
                                                        ? isoToFriendlyDate(blog.date.toString())
                                                        : ""}
                                                </p>
                                                <p className="max-w-none text-red-600 mt-2 mb-2 text-sm font-bold dark:text-red-400">
                                                    Published On:{" "}
                                                    {blog.sys.publishedAt
                                                        ? isoToFriendlyDateTime(
                                                              blog.sys.publishedAt.toString()
                                                          )
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
                                    )
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
};
