/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.myanimelist.net",
            },
            {
                hostname: "avatars.githubusercontent.com",
            },
            {
                hostname: "lh3.googleusercontent.com"
            }
        ]
    },
};

export default nextConfig;
