/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
      "mongodb+srv://ahmed:ahmed@edify.9anuaq1.mongodb.net/readable-blogs?retryWrites=true&w=majority",
    JWT_SECRET: "readableBlog@3#!8faUshwn33",
    HOSTING_URL: "http://localhost:3000",
    // "https://readable-blogging.vercel.app",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.samaa.tv",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
