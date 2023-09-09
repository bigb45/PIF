import React from "react";

function Header() {
  return (
    <div>
      <div className="header w-full shadow-lg backdrop-blur-md h-[60px] flex space-x-24 items-center justify-center fixed top-0 z-10">
        <a
          href="https://www.pif.ps/home/"
          className="text-white hover:opacity-70 text-md font-medium transition-all duration-300"
        >
          PIF
        </a>
        <p className="text-white hover:opacity-70 text-md font-medium transition-all duration-300">
          Home
        </p>
        <p className="text-white hover:opacity-70 text-md font-medium transition-all duration-300">
          About
        </p>
      </div>
    </div>
  );
}

export default Header;
