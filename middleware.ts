import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// Scoped ONLY to the talent-facing pages — every client-facing route
// (/, /calculator, /guide, /bookkeeper, /staff-accountant, /api/*) is
// deliberately absent from this matcher and never touches next-intl.
export const config = {
  matcher: [
    "/join",
    "/join/:path*",
    "/academy",
    "/academy/:path*",
    "/es/join",
    "/es/join/:path*",
    "/es/academy",
    "/es/academy/:path*",
    "/pt/join",
    "/pt/join/:path*",
    "/pt/academy",
    "/pt/academy/:path*",
  ],
};
