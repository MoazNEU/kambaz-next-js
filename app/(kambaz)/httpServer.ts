/**
 * Base URL for the Express API (no trailing slash).
 *
 * On Vercel: set NEXT_PUBLIC_HTTP_SERVER to your Render URL, e.g.
 * https://your-service.onrender.com — then redeploy (required so the value is in the client bundle).
 */
export function getHttpServerBase(): string {
  const v = process.env.NEXT_PUBLIC_HTTP_SERVER?.trim().replace(/\/$/, "");
  if (v) return v;
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4000";
  }
  return "";
}

export const HTTP_SERVER = getHttpServerBase();
