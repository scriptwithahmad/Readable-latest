"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const jsonData = [
  { firstName: "Babar" },
  { firstName: "umar" },
  { firstName: "Ahamd" },
  { firstName: "ali" },
  { firstName: "alied" },
  { firstName: "aliaed" },
];

const Page = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // console.log(data)

  const fetchData = async () => {
    const { data } = await axios.get(`/api/get-blogs`);
    console.log(data.message.data)
    setData(data.message.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard here</h1>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        placeholder="search here.."
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
  );
};

export default Page;
