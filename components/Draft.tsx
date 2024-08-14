import React from "react";
import { draftMode } from "next/headers";
import { getI18n } from "../locales/server";

export default async function Draft() {
    const { isEnabled } = draftMode();
    const i18n = await getI18n();
    return (
        <div
            id="control-panel"
            className="my-6 border-4 border-accent bg-primary text-primary-content rounded w-full p-4 flex gap-4"
        >
            <p className="font-bold">{i18n("controlPanel")}</p>
            {isEnabled ? (
                <p className="text-primary-content">
                    {i18n("draftEnabled")}{" "}
                    <a href="/api/disable-draft-mode" className="text-primary-content underline">
                        {i18n("disableDraftMode")}
                    </a>
                </p>
            ) : (
                <p className="text-secondary-content">
                    {i18n("draftDisabled")}{" "}
                    <a href="/api/enable-draft-mode" className="text-primary-content underline">
                        {i18n("enableDraftMode")}
                    </a>
                </p>
            )}
        </div>
    );
}
