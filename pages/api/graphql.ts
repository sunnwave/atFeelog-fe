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

      // ✅ Set-Cookie 수정
      const setCookies = proxyRes.headers["set-cookie"];
      if (setCookies) {
        const arr = Array.isArray(setCookies) ? setCookies : [setCookies];

        filteredHeaders["set-cookie"] = arr.map((cookie) => {
          let c = cookie;

          // 1) Domain 제거 (서비스 도메인에 저장 가능하게)
          c = c.replace(/;\s*domain=[^;]+/gi, "");

          // 2) SameSite 제거 후 Lax로 통일
          c = c.replace(/;\s*SameSite=\w+/gi, "");

          // 3) 중복 세미콜론 정리 (Domain, SameSite 제거 후 발생할 수 있는 ;;)
          c = c.replace(/;;+/g, ";");

          // 4) SameSite=Lax 추가
          c += "; SameSite=Lax";

          // 5) Path=/ 없으면 추가
          if (!/;\s*Path=/i.test(c)) {
            c += "; Path=/";
          }

          // 6) https면 Secure 없으면 추가
          if (url.protocol === "https:" && !/;\s*Secure/i.test(c)) {
            c += "; Secure";
          }

          return c;
        });
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
