import type { NextApiRequest, NextApiResponse } from "next";
import http from "http";
import https from "https";
import { UPLOAD_URI } from "@/api/config";

export const config = { api: { bodyParser: false } };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!UPLOAD_URI) {
    res.status(500).json({ message: "UPLOAD_URI is not set" });
    return;
  }

  const url = new URL(UPLOAD_URI);
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

  proxyReq.on("error", (err) => {
    console.error("[upload proxy] upstream error", err);
    if (!res.headersSent) {
      res.status(502).json({ message: "Bad Gateway" });
    }
  });

  req.pipe(proxyReq);
}
