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
import type { BlogProps, CardProps } from "../lib/contentful/adjustedTypes";
import { renderOption, isoToFriendlyDate, isoToFriendlyDateTime } from "../lib/contentful/Utils";
import { ContentfulLivePreview } from "@contentful/live-preview";
import Iframe from "./Iframe";
import Card from "./Card";
import Carousel from "./Carousel";
import { useI18n } from "../locales/client";

export const Blog = ({ blog }: { blog: BlogProps }) => {
    const i18n = useI18n();
    const updatedBlog: BlogProps = useContentfulLiveUpdates(blog);
    // console.log("updatedBlog", updatedBlog?.relatedBlogsCollection?.items);
    const inspectorProps = useContentfulInspectorMode({ entryId: blog.sys.id });

    return (
        <>
            <Iframe entryId={blog.sys.id} />
            <h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl text-accent"
                {...inspectorProps({ fieldId: "title" })}
            >
                {updatedBlog.title}
            </h1>
            <p
                className="mt-2 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
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
                    <p {...inspectorProps({ fieldId: "author" })}>
                        {i18n("authoredBy")}: {updatedBlog.author}
                    </p>
                    <p {...inspectorProps({ fieldId: "date" })}>
                        {i18n("authoredOn")}:{" "}
                        {updatedBlog.date ? isoToFriendlyDate(updatedBlog.date.toString()) : ""}
                    </p>
                    <p className="text-secondary">
                        {i18n("publishedOn")}:{" "}
                        {updatedBlog.sys.publishedAt
                            ? isoToFriendlyDateTime(updatedBlog.sys.publishedAt.toString())
                            : "In Draft"}
                    </p>
                </div>
                {updatedBlog?.carousel && updatedBlog?.carousel?.length > 0 && (
                    <div {...inspectorProps({ fieldId: "carousel" })}>
                        <Carousel
                            slides={updatedBlog?.carousel}
                            width={1200}
                            height={300}
                            quality={50}
                        />
                    </div>
                )}
                <div {...inspectorProps({ fieldId: "details" })}>
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
                                {i18n("relatedBlogs")}
                            </h2>
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {updatedBlog?.relatedBlogsCollection?.items?.map(
                                    (relatedBlog: CardProps, index) => (
                                        <Card
                                            key={`${index}-${relatedBlog?.sys?.id}`}
                                            blog={relatedBlog}
                                        />
                                    )
                                )}
                            </div>
                        </>
                    )}
            </div>
        </>
    );
};
