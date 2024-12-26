/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  output: "standalone",
  images: {
    domains: ["nftstorage.link", "i.pinimg.com"],
  },
};

export default nextConfig;
