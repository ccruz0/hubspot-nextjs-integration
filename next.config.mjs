/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => ([
    {
      source: "/",
      destination: "/migrate",
      permanent: true
    }
  ])
};

export default nextConfig;
