import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export function middleware(request: NextRequest) {
  // If the user accesses the root, detect language from the headers.
  if (request.nextUrl.pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language");
    let locale = routing.defaultLocale;
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(",")[0].split("-")[0];
      if (routing.locales.includes(preferred as "en" | "fr")) {
        locale = preferred as "en" | "fr";
      }
    }
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  return createMiddleware(routing)(request);
}

export const config = {
  // Match only internationalized pathnames.
  matcher: ["/", "/(en|fr)/:path*"],
};
