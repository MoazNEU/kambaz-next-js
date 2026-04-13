/**
 * Base URL for a remote HTTP API (no trailing slash), or empty to use this
 * Next.js app’s own `/api/*` routes on the current origin.
 *
 * Set NEXT_PUBLIC_HTTP_SERVER to your hosted API (e.g. Render) when not using
 * the built-in API routes.
 */
export function getHttpServerBase(): string {
  const v = process.env.NEXT_PUBLIC_HTTP_SERVER?.trim().replace(/\/$/, "");
  if (v) return v;
  return "";
}

/** Resolves to `/api/...` on the same host, or `https://host/api/...` when remote. */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = getHttpServerBase();
  if (!base) return p;
  return `${base.replace(/\/$/, "")}${p}`;
}

export const HTTP_SERVER = getHttpServerBase();
