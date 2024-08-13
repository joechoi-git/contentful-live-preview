// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";
import { DEFAULT_LANGUAGE } from "./lib/contentful/Constants";

const I18nMiddleware = createI18nMiddleware({
    locales: ["en", "es"],
    defaultLocale: DEFAULT_LANGUAGE,
    urlMappingStrategy: "redirect"
});

export function middleware(request: NextRequest) {
    return I18nMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"]
};
