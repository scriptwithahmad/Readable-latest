const Header = async () => {
  return (
    <>
      <main className="standardWidth px-3 2xl:px-0">
        <div className="my-8 md:my-20">
          <div className="flex items-center gap-2">
            <h3 className=" text-slate-600 text-xs md:text-base">Home</h3>
            <i className=" text-slate-500 not-italic text-lg">✦</i>
            <span className="accentColor text-xs md:text-base">
              Blogs And News
            </span>
          </div>
          <h1 className="globalHeroText leading-[1.1] font-bold my-3 text-slate-800">
            Expanding Our Knowledge <br /> & Your, One Blog at a Time.
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
