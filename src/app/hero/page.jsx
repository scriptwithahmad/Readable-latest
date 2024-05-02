import React from "react";

const Page = () => {
  return (
    <div className="h-screen overflow-hidden w-full bg-gradient-to-tr to-slate-900 from-gray-950 grid justify-self-center">
      <div className="grid grid-cols-3 h-fit max-w-[1200px] m-auto gap-4">
        <div className="bg-slate-800 p-6 col-span-2 container">
          <div className="w-full mb-5 relative z-[99]">
            <h1 className="text-3xl font-semibold text-gray-300/90 mb-3">
              Plagiarism Checker
            </h1>
            <p className="text-gray-400 text-sm">
              Each day the worlds largest businesses and educational
              institutes—along with millions of students—trust our exclusive
              AI-powered text analysis to identify potential plagiarism and
              paraphrasing across nearly every language, detect AI generated
              content, verify ownership, and empower error-free writing.
            </p>
          </div>
          <div className="relative z-[99]">
            <textarea
              cols="10"
              rows="10"
              placeholder="Enter text here..."
              className="w-full overflow-hidden rounded-lg bg-slate-700/80 hover:bg-slate-700/90 py-2 px-3 outline-none text-gray-400 focus:text-gray-300"
            ></textarea>
            <button className="absolute bottom-4 right-2 px-6 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
              Check
            </button>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg">
          <h1>section 2</h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
