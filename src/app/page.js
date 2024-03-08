import Header from "@/components/Header";
import BlogLists from "@/components/BlogLists";
import { Suspense } from "react";
import BlogListLoader from "@/components/BlogListLoader";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<BlogListLoader />}>
        <BlogLists />
      </Suspense>
    </>
  );
}
