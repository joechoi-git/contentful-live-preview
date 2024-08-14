"use client";

import React from "react";
import { useI18n } from "../locales/client";

interface IframeProps {
    entryId?: string;
}

const Iframe: React.FC<IframeProps> = ({ entryId }) => {
    const i18n = useI18n();
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
                content.classList.add("text-primary-content");
                content.innerHTML = i18n("viewingInside");
            } else {
                content.classList.add("text-primary-content");
                content.innerHTML = `${i18n("viewingOutside")} <a href="${previewUrl}" class="text-primary-content underline">${i18n("openLivePreview")}</a>`;
            }
            controlPanel.appendChild(content);
        }
    }, [entryId, i18n]);
    return null;
};
export default Iframe;
