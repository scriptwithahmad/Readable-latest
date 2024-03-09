"use client";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Comment = () => {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [formData, setFormData] = useState({
    comment: "",
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      var submitionData = {
        ...formData,
        author: user._id,
      };
      var res = await axios.post(`/api/comments`, submitionData);

      if (res.data.success) {
        toast.success("Blog Submitted 😎");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={HandleSubmit}
        className="max-w-[800px] m-auto py-0 px-3 2xl:px-0 my-6"
      >
        <h2 className="text-2xl font-semibold text-slate-700">
          Post Your Comment
        </h2>
        <div className="flex items-start gap-4 my-4">
          <img
            alt="Image here"
            src="/images/logo.png"
            className="w-14 h-14 border p-1 rounded-full object-contain"
          />
          <fieldset>
            <textarea
              rows="5"
              cols="85"
              id="comment"
              name="comment"
              className="p-4 text-sm"
              value={formData.comment}
              placeholder="Post Your Thought..."
              onChange={(e) => setFormData(e.target.value)}
            ></textarea>
          </fieldset>
        </div>
        <button type="submit" className="signInSubmitBtn mt-7">
          Post
        </button>
      </form>
    </>
  );
};

export default Comment;
