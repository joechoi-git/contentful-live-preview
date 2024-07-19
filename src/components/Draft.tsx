import React from "react";
import { draftMode } from "next/headers";

export default function Draft() {
    const { isEnabled } = draftMode();
    return (
        <div
            id="control-panel"
            className="my-6 border border-blue-500 rounded w-full p-4 flex gap-4 bg-slate-100"
        >
            <p className="font-bold">Control Panel</p>
            {isEnabled ? (
                <p className="text-green-500">
                    Draft Mode is <strong>Enabled.</strong>{" "}
                    <a href="/api/disable-draft-mode" className="text-blue-500 underline">
                        Disable Draft Mode
                    </a>
                </p>
            ) : (
                <p className="text-red-500">
                    Draft Mode is <strong>Disabled.</strong>{" "}
                    <a href="/api/enable-draft-mode" className="text-blue-500 underline">
                        Enable Draft Mode
                    </a>
                </p>
            )}
        </div>
    );
}
