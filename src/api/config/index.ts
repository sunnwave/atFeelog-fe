const isLegacy = process.env.NEXT_PUBLIC_API_VERSION !== "new";

export const IS_NEW_API = !isLegacy;

export const GRAPHQL_URI =
  (isLegacy
    ? process.env.NEXT_PUBLIC_GRAPHQL_URI_LEGACY
    : process.env.NEXT_PUBLIC_GRAPHQL_URI_NEW) ?? "";

// Legacy uploads go through the GraphQL uploadFile mutation (same endpoint).
// New API uploads go to a dedicated REST endpoint.
export const UPLOAD_URI = isLegacy
  ? GRAPHQL_URI
  : (process.env.NEXT_PUBLIC_UPLOAD_URI_NEW ?? "");

export function getGraphqlUri(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/graphql`;
  }
  return GRAPHQL_URI;
}

export function getUploadUri(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/upload`;
  }
  return UPLOAD_URI;
}
