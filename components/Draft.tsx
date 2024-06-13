import React from "react";
import { draftMode } from "next/headers";

export default function Draft() {
    const { isEnabled } = draftMode();
    return (
        <>
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
        </>
    );
}
