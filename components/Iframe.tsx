"use client";

import React from "react";

interface IframeProps {
    entryId?: string;
}

const Iframe: React.FC<IframeProps> = ({ entryId }) => {
    React.useEffect(() => {
        const previewUrl = entryId
            ? `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/entries/${entryId}/preview/${process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ID}`
            : `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/views/entries`;

        const checkIfInIframe = () => {
            try {
                return window.self !== window.top;
            } catch (e) {
                // If an error is caught, it's likely a cross-origin issue, meaning we are in an iframe.
                return true;
            }
        };

        const inIframe = checkIfInIframe();

        const controlPanel = document.getElementById("control-panel");
        if (controlPanel) {
            // if exists already, remove it
            const iframeContent = document.getElementById("iframe-content");
            if (iframeContent) {
                iframeContent.remove();
            }
            // create a new dom element and append it
            const content = document.createElement("p");
            content.id = "iframe-content";
            if (inIframe) {
                content.classList.add("text-green-500");
                content.innerHTML = `Viewing <strong>Inside</strong> Contentful.`;
            } else {
                content.classList.add("text-red-500");
                content.innerHTML = `Viewing <strong>Outside</strong> Contentful. <a href="${previewUrl}" class="text-blue-500 underline">Open Live Preview</a>`;
            }
            controlPanel.appendChild(content);
        }
    }, [entryId]);
    return null;
};
export default Iframe;
