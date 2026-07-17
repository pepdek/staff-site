import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/router: usePathname() returns the path without the
// locale prefix, and router.replace(path, {locale}) swaps locale while
// staying on the same page — used by LanguageToggle.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
