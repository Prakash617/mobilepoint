import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "api.gowell.edu.np",
        // port: "8000",
        pathname: "/media/**",
      },
      // Django local media
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },

      // Placeholder images
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      // Admin panel media (carousel/uploads)
      {
        protocol: "http",
        hostname: "mobilepoint-admin.sayathari.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "mobilepoint-admin.sayathari.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
