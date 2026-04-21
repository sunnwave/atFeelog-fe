import type { NextApiRequest, NextApiResponse } from "next";
import http from "http";
import https from "https";

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
        ...(req.headers.authorization
          ? { authorization: req.headers.authorization }
          : {}),
        ...(req.headers.cookie ? { cookie: req.headers.cookie } : {}),
      },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode ?? 200, {
        ...proxyRes.headers,
        // Explicitly forward Set-Cookie so the browser receives refresh token cookies
        ...(proxyRes.headers["set-cookie"]
          ? { "set-cookie": proxyRes.headers["set-cookie"] }
          : {}),
      });
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
