const isLegacy = process.env.NEXT_PUBLIC_API_VERSION !== "new";

export const GRAPHQL_URI =
  (isLegacy
    ? process.env.NEXT_PUBLIC_GRAPHQL_URI_LEGACY
    : process.env.NEXT_PUBLIC_GRAPHQL_URI_NEW) ?? "";

export function getGraphqlUri(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/graphql`;
  }
  return GRAPHQL_URI;
}
