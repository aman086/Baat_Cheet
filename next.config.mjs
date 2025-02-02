/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   reactCompiler: true,
  //   appDir: true,
  //   runtime: 'edge',
  //   ppr: 'incremental'
  // },
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
