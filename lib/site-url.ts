import { site } from "@/data/site";

/** The address the site calls itself: the custom domain in data/site.ts if
 *  set, otherwise the production URL Vercel gives the build. */
export function siteUrl(): string {
  if (site.url) return site.url;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
