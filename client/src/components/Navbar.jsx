import { IoFitness } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNavBar = () => {
    setNavOpen(() => !navOpen);
  };
  const linkClass = "text-gray-800 text-lg mb-5 lg:mb-0";

  return (
    <nav
      className={`${navOpen ? "h-auto" : "h-[106px]"} overflow-hidden lg:h-auto px-7 md:px-14 lg:px-28 flex-wrap lg:flex items-center 
      py-6 xl:relative z-10 border-b-2 lg:border-b-0 fixed top-0 right-0 left-0 bg-white lg:bg-transparent lg:static`}
    >
      <div className="flex items-center justify-between mb-0 h-full">
        <Link to="/" className="hover:text-primary flex items-center text-3xl">
          <IoFitness />
          <h2 className="font-Playwrite">Bohan PT</h2>
        </Link>
        <button
          onClick={toggleNavBar}
          aria-label={
            navOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="lg:hidden w-10 h-10 ml-auto flex items-center justify-center text-primary border border-primary rounded-md"
        >
          <IoMenu size={25} />
        </button>
      </div>
      <ul
        className={`lg:flex flex-col lg:flex-row lg:items-center lg:mx-auto lg:space-x-8 xl:space-x-16
        transform transition-all duration-500 overflow-hidden mt-9 lg:mt-0
        ${navOpen ? "max-h-[500px]" : "max-h-0 lg:max-h-none"}`}
      >
        <li className={linkClass}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={linkClass}>
          <Link to="/metrics">Metrics</Link>
        </li>
        <li className={linkClass}>
          <Link to="/#map">Map</Link>
        </li>
        <li className={linkClass}>
          <Link to="/#faq">Faq</Link>
        </li>
        <li className={linkClass}>
          <Link to="/contact"></Link>
        </li>
      </ul>
      <a
        target="_blank"
        className={`px-5 py-3 border-2 hover:border-primary rounded-lg font-semibold hover:text-primary hover:bg-white text-lg bg-primary text-white transition ease-linear duration-500 
        ${navOpen === false && "hidden lg:block"}`}
      >
        Contact
      </a>
    </nav>
  );
};

export default Navbar;
