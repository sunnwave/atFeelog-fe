import type { NextApiRequest, NextApiResponse } from "next";
import http from "http";
import https from "https";
import { transformSetCookies } from "@/api/server/proxy/transformSetCookies";
import { GRAPHQL_URI } from "@/api/config";

export const config = { api: { bodyParser: false } };

/** 프록시에서 제거해야 하는 hop-by-hop 헤더 */
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "te",
  "trailers",
  "upgrade",
  "proxy-authorization",
  "proxy-authenticate",
]);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const target = GRAPHQL_URI;
  if (!target) {
    res.status(500).json({ message: "GRAPHQL_URI is not set" });
    return;
  }

  const url = new URL(target);
  const transport = url.protocol === "https:" ? https : http;

  const forwardedHeaders = Object.fromEntries(
    Object.entries({ ...req.headers, host: url.host }).filter(
      ([key]) => !HOP_BY_HOP.has(key.toLowerCase())
    )
  );

  const proxyReq = transport.request(
    {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname,
      method: req.method,
      headers: forwardedHeaders,
    },
    (proxyRes) => {
      // ✅ CORS 헤더 제거 (브라우저 혼동 방지)
      const filteredHeaders: Record<string, string | string[]> = {};
      for (const [key, value] of Object.entries(proxyRes.headers)) {
        if (key.toLowerCase().startsWith("access-control-")) continue;
        if (value !== undefined)
          filteredHeaders[key] = value as string | string[];
      }

      const setCookies = proxyRes.headers["set-cookie"];
      if (setCookies) {
        const arr = Array.isArray(setCookies) ? setCookies : [setCookies];
        filteredHeaders["set-cookie"] = transformSetCookies(arr, url.protocol);
      }

      res.writeHead(proxyRes.statusCode ?? 200, filteredHeaders);
      proxyRes.pipe(res);
    }
  );

  proxyReq.setTimeout(30_000, () => {
    proxyReq.destroy();
    if (!res.headersSent) {
      res.status(504).json({ message: "Gateway Timeout" });
    }
  });

  proxyReq.on("error", (err) => {
    console.error("[graphql proxy] upstream error", err);
    if (!res.headersSent) {
      res.status(502).json({ message: "Bad Gateway" });
    }
  });

  req.on("error", (err) => {
    console.error("[graphql proxy] request error", err);
    proxyReq.destroy();
  });

  req.pipe(proxyReq);
}
