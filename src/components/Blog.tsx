/* eslint-disable indent */
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
import type { BlogDetailProps } from "../lib/contentful/adjustedTypes";
import {
    renderOption,
    isoToFriendlyDate,
    isoToFriendlyDateTime,
    transformBynderAsset
} from "../lib/contentful/Utils";
import { ContentfulLivePreview } from "@contentful/live-preview";
import Iframe from "./Iframe";
import Card from "./Card";

export const Blog = ({ blog }: { blog: BlogDetailProps }) => {
    const updatedBlog = useContentfulLiveUpdates(blog);
    const inspectorProps = useContentfulInspectorMode({ entryId: blog.sys.id });

    return (
        <>
            <Iframe entryId={blog.sys.id} />
            <h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl"
                {...inspectorProps({ fieldId: "title" })}
            >
                {updatedBlog.title}
            </h1>
            <p
                className="mt-2 text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400"
                {...inspectorProps({ fieldId: "summary" })}
            >
                {updatedBlog.summary}
            </p>
            <div className="mt-6 space-y-4 md:space-y-6">
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
                {blog?.carousel && blog?.carousel?.length > 0 && (
                    <div {...inspectorProps({ fieldId: "carousel" })}>
                        <div className="flex flex-wrap gap-4">
                            {blog?.carousel?.map((slide, index) => {
                                return (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={`${index}-${slide.id}`}
                                        alt={
                                            slide.description && slide.description.length > 0
                                                ? slide.description
                                                : slide.name
                                        }
                                        height="300"
                                        width="300"
                                        src={transformBynderAsset(
                                            slide,
                                            "io=transform:fill,width:300,height:300"
                                        )}
                                    />
                                    /*
                                    <Image
                                        key={`${index}-${slide.id}`}
                                        alt={
                                            slide.description && slide.description.length > 0
                                                ? slide.description
                                                : slide.name
                                        }
                                        height="500"
                                        width="500"
                                        src={transformBynderAsset(slide)}
                                    />
                                    */
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className="dark:text-zinc-400" {...inspectorProps({ fieldId: "details" })}>
                    {updatedBlog?.details?.json
                        ? documentToReactComponents(updatedBlog.details.json, renderOption)
                        : null}
                </div>
                {updatedBlog?.relatedBlogsCollection &&
                    updatedBlog?.relatedBlogsCollection?.items?.length > 0 && (
                        <>
                            <h2
                                className="text-2xl font-bold tracking-tighter sm:text-5xl mb-8"
                                {...inspectorProps({ fieldId: "relatedBlogs" })}
                            >
                                Related Blogs
                            </h2>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {updatedBlog?.relatedBlogsCollection?.items?.map(
                                    (blog: BlogDetailProps) => (
                                        <Card key={blog?.sys?.id} blog={blog} />
                                    )
                                )}
                            </div>
                        </>
                    )}
            </div>
        </>
    );
};
