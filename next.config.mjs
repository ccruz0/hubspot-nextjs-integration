/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: "/",
      destination: "/migrate",
      permanent: true,
    },
  ],
  experimental: {
    serverActions: false,
  },
};

export default nextConfig;
