async function getData() {
  const res = await fetch("http://localhost:3000/api/users", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Header = async () => {
  const data = await getData();

  return (
    <>
      <h1>Header Section</h1>
    </>
  );
};

export default Header;
