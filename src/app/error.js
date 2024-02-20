"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  console.log(error.message);
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div className="standardWidth py-4">
      <h2>Something went wrong!</h2>
      <p>Error Page Trigger</p>
      <button className="border" onClick={() => reset()}>Try again</button>
    </div>
  );
}
