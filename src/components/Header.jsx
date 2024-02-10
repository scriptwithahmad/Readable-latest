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
        <div>
          <div className="flex items-center gap-2">
            <h3>Home</h3>
            <pre>.</pre>
            <span>Blogs And News</span>
          </div>
          <h1>
            Expanding Our Knowledge & <br /> Your, One Blog at a Time.
          </h1>
        </div>
      </main>
    </>
  );
};

export default Header;
