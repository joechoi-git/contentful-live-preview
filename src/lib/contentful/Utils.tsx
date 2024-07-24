import { BLOCKS } from "@contentful/rich-text-types";
import { BynderAsset } from "./adjustedTypes";

export const renderOption = {
    renderNode: {
        [BLOCKS.HEADING_1]: (node: any, children: any) => <h1 className="font-bold">{children}</h1>,
        [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="font-bold">{children}</h2>,
        [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
            <p className="py-4 pt-4 [&>a]:text-blue-500">{children}</p>
        ),
        [BLOCKS.UL_LIST]: (node: any, children: any) => (
            <ul className="list-disc" style={{ marginLeft: 50 }}>
                {children}
            </ul>
        ),
        [BLOCKS.OL_LIST]: (node: any, children: any) => (
            <ul className="list-decimal pl-12">{children}</ul>
        ),
        [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="">{children}</li>
    }
};

export const isoToFriendlyDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return date.toLocaleDateString("en-US", options);
};

export const isoToFriendlyDateTime = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // This will format the time in 12-hour format with AM/PM
        timeZoneName: "short"
    };

    return date.toLocaleDateString("en-US", options);
};

export const convertStringToFriendlyUri = (input: string): string => {
    let result = input.toLowerCase();
    result = result.replace(/[^a-z0-9-]/g, "-");
    result = result.replace(/-+/g, "-");
    result = result.replace(/^-+|-+$/g, "");
    return result;
};

// https://support.bynder.com/hc/en-us/articles/18953104053266-Create-a-DAT-Derivative-Using-URL-Parameters#:~:text=Temperature,image%20as%20possible%20remains%20visible.
export const transformBynderAsset = (slide: BynderAsset, options?: string): string => {
    const DEFAULT_CONFIG = "format=webp&quality=70";
    const name =
        slide.tags && slide.tags.length > 0
            ? convertStringToFriendlyUri(slide.tags.join("-"))
            : convertStringToFriendlyUri(slide.name);
    let url = slide.thumbnails.transformBaseUrl;
    url = url.substring(0, url.lastIndexOf("/")); // trim the last bit of the URL
    url = `${url}/${name}?${DEFAULT_CONFIG}`; // ${options ? options : ""}`;
    if (options && options.length > 0) {
        url = `${url}&${options}`;
    }
    console.log("transformBynderAsset", url);
    return url;
};
