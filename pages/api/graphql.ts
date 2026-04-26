import type { NextApiRequest, NextApiResponse } from "next";
import http from "http";
import https from "https";
import { transformSetCookies } from "@/lib/proxy/transformSetCookies";

export const config = { api: { bodyParser: false } };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const target = process.env.NEXT_PUBLIC_GRAPHQL_URI;
  if (!target) {
    res.status(500).json({ message: "NEXT_PUBLIC_GRAPHQL_URI is not set" });
    return;
  }

  const url = new URL(target);
  const transport = url.protocol === "https:" ? https : http;

  const proxyReq = transport.request(
    {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname,
      method: req.method,
      headers: {
        ...req.headers,
        host: url.host,
      },
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

  proxyReq.on("error", (err) => {
    console.error("[graphql proxy] upstream error", err);
    if (!res.headersSent) {
      res.status(502).json({ message: "Bad Gateway" });
    }
  });

  req.pipe(proxyReq);
}
