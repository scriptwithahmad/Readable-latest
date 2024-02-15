"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Page = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
  });

  const [categories, setCategories] = useState([]);

  const fetchCatgories = async () => {
    try {
      const { data } = await axios.get("/api/category");
      setCategories(data.getcat);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCatgories();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addNewCategory = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`/api/category`, { ...formData });
      if (res.data.success) {
        setFormData("");
        toast.success("Catgory Added Successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 7000);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);
      if (res.data.success) {
        toast.success("Catgory Deleted Successfully!");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <div className="bg-white max-w-7xl m-auto p-5 rounded-lg">
        <form onSubmit={addNewCategory}>
          <div className=" mb-4 text-2xl font-semibold">
            Add
            <span className=" text-indigo-600 font-semibold"> Category</span>
          </div>
          <div className=" flex items-center flex-wrap gap-4 mt-10">
            <input
              required
              autoFocus
              type="text"
              name="name"
              value={formData.name}
              placeholder="Catgory Name"
              onChange={handleAddressChange}
              className="block w-full outline-none rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:ring-indigo-400 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className=" mt-4 w-fit bg-indigo-500 text-white font-light hover:bg-indigo-600 flex items-center gap-2 px-5 py-2 rounded-lg transition duration-300 cursor-pointer"
            >
              <i className="fa fa-plus"></i>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
          <p className="errorPara">{error}</p>
        </form>

        <div className=" mt-6 px-2">
          {categories?.map((v, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b py-2"
              >
                <h3 className=" text-slate-600">{v.name} </h3>
                <div>
                  <i
                    onClick={() => {
                      window.confirm("Are you sure to delete this Category?") &&
                        deleteCategory(v._id);
                    }}
                    className="fa-solid fa-trash-can text-sm text-red-400 hover:text-red-500 cursor-pointer transition"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
