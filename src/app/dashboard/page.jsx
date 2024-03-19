"use client";
import DHome from "@/components/DHome";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(`/api/get-blogs`);
    setData(data.message.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DHome />
      <div className="globalShadow3 border-dotted p-4 rounded-lg mt-4">
        <h1>Dashboard here</h1>
        <input
          type="search"
          placeholder="search here.."
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1.5 my-2 rounded-lg"
        />

        <table>
          <tbody>
            {data
              .filter((item) => {
                const lowerCaseSearch = search.toLowerCase();
                const lowerCaseTitle = item.title.toLowerCase();
                return lowerCaseSearch === ""
                  ? true
                  : lowerCaseTitle.includes(lowerCaseSearch);
              })
              .map((v, index) => (
                <tr key={index}>
                  <td>{v.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
