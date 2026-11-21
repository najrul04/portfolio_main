/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   // Old resume URLs (shared on LinkedIn, job sites, etc.) keep working and land
   // on the file named after me, so a direct download isn't saved as "Resume.pdf".
   async redirects() {
      return [
         { source: '/Resume.pdf', destination: '/MD-Najrul-Islam-Sumon-Resume.pdf', permanent: true },
         { source: '/assets/Resume.pdf', destination: '/MD-Najrul-Islam-Sumon-Resume.pdf', permanent: true },
      ];
   },
   images: {
      // Allow remote cover images. Tighten this list once you know which CDNs you'll use.
      remotePatterns: [
         { protocol: 'https', hostname: '**' },
      ],
   },
};

export default nextConfig;
