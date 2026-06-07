/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      // Allow remote cover images. Tighten this list once you know which CDNs you'll use.
      remotePatterns: [
         { protocol: 'https', hostname: '**' },
      ],
   },
};

export default nextConfig;
