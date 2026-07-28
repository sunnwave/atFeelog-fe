import type { NextApiRequest, NextApiResponse } from "next";
import http from "http";
import https from "https";
import { UPLOAD_URI } from "@/api/config";

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
  if (!UPLOAD_URI) {
    res.status(500).json({ message: "UPLOAD_URI is not set" });
    return;
  }

  const url = new URL(UPLOAD_URI);
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
      const filteredHeaders: Record<string, string | string[]> = {};
      for (const [key, value] of Object.entries(proxyRes.headers)) {
        if (key.toLowerCase().startsWith("access-control-")) continue;
        if (value !== undefined)
          filteredHeaders[key] = value as string | string[];
      }

      res.writeHead(proxyRes.statusCode ?? 200, filteredHeaders);
      proxyRes.pipe(res);
    }
  );

  // 30초 타임아웃
  proxyReq.setTimeout(30_000, () => {
    proxyReq.destroy();
    if (!res.headersSent) {
      res.status(504).json({ message: "Gateway Timeout" });
    }
  });

  proxyReq.on("error", (err) => {
    console.error("[upload proxy] upstream error", err);
    if (!res.headersSent) {
      res.status(502).json({ message: "Bad Gateway" });
    }
  });

  req.on("error", (err) => {
    console.error("[upload proxy] request error", err);
    proxyReq.destroy();
  });

  req.pipe(proxyReq);
}
