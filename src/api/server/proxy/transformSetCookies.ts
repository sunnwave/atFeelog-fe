/**
 * Normalizes Set-Cookie headers forwarded from the upstream GraphQL server
 * so they are stored and sent correctly by the browser for the Next.js origin.
 *
 * - Removes `Domain`    : upstream domain must not override the Next.js origin
 * - Replaces `SameSite` : normalizes to Lax for same-site proxy requests
 * - Adds `Path=/`       : ensures the cookie is available for all routes
 * - Adds `Secure`       : only when the upstream uses HTTPS
 */
export function transformSetCookies(
  cookies: string[],
  targetProtocol: string
): string[] {
  return cookies.map((cookie) => {
    let c = cookie;

    c = c.replace(/;\s*domain=[^;]+/gi, "");
    c = c.replace(/;\s*SameSite=\w+/gi, "");
    c = c.replace(/;;+/g, ";");

    c += "; SameSite=Lax";

    if (!/;\s*Path=/i.test(c)) {
      c += "; Path=/";
    }

    if (targetProtocol === "https:" && !/;\s*Secure/i.test(c)) {
      c += "; Secure";
    }

    return c;
  });
}
