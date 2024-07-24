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

export const transformBynderAsset = (slide: BynderAsset): string => {
    console.log("transformBynderAsset", slide);
    return slide.thumbnails.transformBaseUrl;
};
