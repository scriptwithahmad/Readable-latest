/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
      "mongodb+srv://ahmed:ahmed@edify.9anuaq1.mongodb.net/populate?retryWrites=true&w=majority",
  },
};

export default nextConfig;
