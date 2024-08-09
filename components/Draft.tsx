import React from "react";
import { draftMode } from "next/headers";

export default function Draft() {
    const { isEnabled } = draftMode();
    return (
        <div
            id="control-panel"
            className="my-6 border-4 border-accent bg-primary text-primary-content rounded w-full p-4 flex gap-4"
        >
            <p className="font-bold">Control Panel</p>
            {isEnabled ? (
                <p className="text-primary-content">
                    Draft Mode is <strong>Enabled.</strong>{" "}
                    <a href="/api/disable-draft-mode" className="text-primary-content underline">
                        Disable Draft Mode
                    </a>
                </p>
            ) : (
                <p className="text-secondary-content">
                    Draft Mode is <strong>Disabled.</strong>{" "}
                    <a href="/api/enable-draft-mode" className="text-primary-content underline">
                        Enable Draft Mode
                    </a>
                </p>
            )}
        </div>
    );
}
