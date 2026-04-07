import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";

export const Navbar = () => {
  const navStyle = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative flex justify-center items-center px-2 py-1.5 font-semibold transition-colors duration-300 text-sm tracking-wide",

      isActive ? "text-white" : "text-blue-100 hover:text-white",

      `after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-full after:h-[3px] after:bg-white after:transition-transform
       after:duration-300 after:origin-center`,
      isActive
        ? "after:scale-x-100"
        : "after:scale-x-0 hover:after:scale-x-100",
    );

  return (
    <div className="bg-blue-600 h-16 flex items-center sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-center p-2 px-6 gap-3">
        <img src="logo.svg" alt="logo" className="w-8 h-8" />

        <h1 className="font-bold text-2xl text-white tracking-tight">
          Finance.App
        </h1>
      </div>

      <div className="flex-1 flex items-center gap-8 px-10 *:text-[16px]">
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>
        <NavLink to="/transactions" className={navStyle}>
          Transactions
        </NavLink>
        <NavLink to="/savings" className={navStyle}>
          Savings
        </NavLink>
      </div>

      <div className="px-8 flex items-center *:text-[16px]">
        <NavLink to="/my-account" className={navStyle}>
          My Account
        </NavLink>
      </div>
    </div>
  );
};
