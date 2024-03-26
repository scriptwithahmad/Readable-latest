"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
  });

  const routehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = await axios.post("/api/users", formData, {});
      toast.success("User Register Successfully!");
      router.push("/login");
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center flex-col px-6 py-12 lg:px-8">
        <div className="globalShadow rounded-lg px-6 py-8 mt-2 sm:mx-auto w-[500px]">
          <div className=" flex items-center gap-2 mb-4">
            <img
              alt="Logo Here"
              className="w-8"
              src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1706707781/ulogo_hclp4i.png"
            />
            <h2 className="text-slate-700 text-xl font-bold">Readable</h2>
          </div>
          <form className="space-y-6" onSubmit={submitForm}>
            {/* Full name  ----------------*/}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm leading-6 text-gray-500"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  onChange={routehandler}
                  value={formData.fullName}
                  autoComplete="fullName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 focus:outline-none px-3"
                />
              </div>
            </div>
            {/* Username  ----------------*/}
            <div>
              <label
                htmlFor="username"
                className="block text-sm leading-6 text-gray-500"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={routehandler}
                  autoComplete="username"
                  value={formData.username}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 focus:outline-none px-3"
                />
              </div>
            </div>
            {/* Email ----------------*/}
            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-6 text-gray-500"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={routehandler}
                  value={formData.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 focus:outline-none px-3"
                />
              </div>
            </div>
            {/* Password ----------------*/}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-500"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="block text-sm leading-6 text-gray-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={routehandler}
                  value={formData.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 focus:outline-none px-3"
                />
              </div>
            </div>
            {/* button ----------------*/}
            <div>
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have an Account /
            <a
              href="/login"
              className="leading-6 text-orange-500 hover:text-orange-600"
            >
              {" "}
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
