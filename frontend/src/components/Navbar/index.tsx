import { Link } from "react-router";

export const Navbar = () => {
  const linkStyle =
    "flex justify-center items-center gap-4 px-4 py-2 rounded font-bold transition cursor-pointer w-fit text-sm text-white hover:text-blue-200";

  // Link prevents the page from reloading
  return (
    <div className="bg-blue-500 h-14 flex">
      <div className=" flex items-center justify-center p-2 gap-3">
        <img src="logo.svg" alt="logo" />
        <h1 className="font-bold text-2xl text-white">Finance.App</h1>
      </div>

      <div className="flex-1 flex items-center gap-10 px-10 py-2">
        <Link to="/" className={linkStyle}>
          HOME
        </Link>

        <Link to="/transactions" className={linkStyle}>
          TRANSACTIONS
        </Link>

        <Link to="/savings" className={linkStyle}>
          SAVINGS
        </Link>
      </div>

      <div className="px-5 flex items-center">
        <Link to="/my-account" className={linkStyle}>
          MY ACCOUNT
        </Link>
      </div>
    </div>
  );
};
