"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const routehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const loginUser = await axios.post("/api/users/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("User Logged In");
      window.location.reload();
      setTimeout(() => {
        router.back();
      }, 1000);
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
      <div className="flex flex-col items-center px-6 py-12 lg:px-8">
        <div className="shadow-2xl rounded-lg px-8 py-8 mt-2 sm:mx-auto w-[500px]">
          <div className=" flex items-center gap-2 mb-4">
            <img
              alt="Logo Here"
              className=" w-8"
              src="https://res.cloudinary.com/dmyrswz0r/image/upload/v1706707781/ulogo_hclp4i.png"
            />
            <h2 className="text-slate-700 text-xl font-bold">Login</h2>
          </div>
          <form className="space-y-6" onSubmit={submitForm}>
            {/* Username ----------------------- */}
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
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>
            {/* Password ----------------------- */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm leading-6 text-gray-500"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={routehandler}
                  value={formData.password}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 focus:outline-none"
                />
              </div>
            </div>
            {/* Button here --------------------- */}
            <div>
              <button
                type="submit"
                className="rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
              >
                {loading ? "Processing..." : "Log In"}
              </button>
            </div>
          </form>
          {/* accout Info ----------------------- */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Dont Have an Accout /
            <a
              href="/register"
              className="leading-6 text-orange-500 hover:text-orange-600"
            >
              Sigin Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
