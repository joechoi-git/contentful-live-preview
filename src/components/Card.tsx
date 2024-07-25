import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogDetailProps } from "../lib/contentful/adjustedTypes";
import { isoToFriendlyDate, isoToFriendlyDateTime } from "../lib/contentful/Utils";

interface CardProps {
    blog: BlogDetailProps;
}

const Card: React.FC<CardProps> = ({ blog }) => {
    return blog && blog.slug ? (
        <article className="h-full flex flex-col border-2 border-secondary rounded-xl shadow-xl overflow-hidden">
            <Link href={`/blogs/${blog.slug}`}>
                <Image
                    alt="placeholder"
                    className={`aspect-[4/3] object-cover w-full ${blog.sys.publishedAt ? "" : "grayscale"}`}
                    height="263"
                    src={blog?.heroImage?.url ?? "/default.jpeg"}
                    width="350"
                />
            </Link>
            <div className={`flex-1 p-6 ${blog.sys.publishedAt ? "bg-base-100" : "bg-base-300"}`}>
                <Link href={`/blogs/${blog.slug}`}>
                    <h3 className="text-2xl font-bold leading-tight py-4 text-accent">
                        {blog.title}
                    </h3>
                </Link>
                <div className="font-bold">{blog.categoryName}</div>
                <p className="mt-4 mb-2">{blog.summary}</p>
                <p className="mt-2 mb-2 font-bold">Authored By: {blog.author}</p>
                <p className="mt-2 mb-2 font-bold">
                    Authored On: {blog.date ? isoToFriendlyDate(blog.date.toString()) : ""}
                </p>
                <p className="mt-2 mb-2 font-bold text-secondary">
                    Published On:{" "}
                    {blog.sys.publishedAt
                        ? isoToFriendlyDateTime(blog.sys.publishedAt.toString())
                        : "In Draft"}
                </p>
                <div className="flex justify-end">
                    <Link
                        className="inline-flex h-10 items-center justify-center font-medium text-accent"
                        href={`/blogs/${blog.slug}`}
                    >
                        Read More →
                    </Link>
                </div>
            </div>
        </article>
    ) : null;
};

export default Card;
