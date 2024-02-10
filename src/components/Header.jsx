// async function getData() {
//   const res = await fetch("http://localhost:3000/api/users", {
//     next: { revalidate: 10 },
//   });

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const Header = async () => {
  // const data = await getData();

  return (
    <>
      <main className="standardWidth">
        <div className=" my-20">
          <div className="flex items-center gap-2">
            <h3 className=" text-slate-600">Home</h3>
            <pre className=" text-slate-500">.</pre>
            <span className="accentColor">Blogs And News</span>
          </div>
          <h1 className=" text-6xl leading-[1.1] font-bold my-3 text-slate-800">
            Expanding Our Knowledge & <br /> Your, One Blog at a Time.
          </h1>
          <p className=" text-slate-500 ">
            All the latest news and events of our creative team.
          </p>
        </div>
      </main>
    </>
  );
};

export default Header;
