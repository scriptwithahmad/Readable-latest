/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
      "mongodb+srv://ahmed:ahmed@edify.9anuaq1.mongodb.net/latest-blog-app?retryWrites=true&w=majority",
      JWT_SECRET: "readableBlog@3#!8faUshwn33"
  },
};

export default nextConfig;
