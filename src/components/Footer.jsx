import Link from "next/link";
import { Merienda } from "next/font/google";

const Meriend = Merienda({
  weight: "800",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg globalShadow2 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              className="w-10"
              alt="Readable Logo"
              src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1713427098/blog-image/favicon_jcqo9l.png"
            />
            <span
              className={`${Meriend.className} self-center text-gray-600 text-2xl font-semibold whitespace-nowrap `}
            >
              Readable
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:underline me-4 md:me-6">
                Create account
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/write"
                className="hover:underline me-4 md:me-6"
              >
                Create Post
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="flex items-center justify-between">
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Readable™
            </Link>
            . All Rights Reserved.
          </span>
          <p>
            Powered by{" "}
            <Link
              target="_blank"
              href="https://scriptwithahmad.vercel.app"
              className="text-sm text-gray-500 hover:underline"
            >
              @scriptwithahmad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
