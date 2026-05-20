/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "atfeelog-bucket.s3.ap-northeast-2.amazonaws.com" },
    ],
  },
};

export default nextConfig;
