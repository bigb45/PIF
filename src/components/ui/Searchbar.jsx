import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

function Searchbar() {
  const [query, setQuery] = useState("");
  return (
    <form
      className="bg-white shadow-lg w-[50%] h-16 rounded-full flex-row items-center justify-center py-[15px] px-[30px] space-x-3"
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `/search/${query}`;
      }}
    >
      <SearchIcon className="text-slate-400 cursor-pointer" />
      <input
        className="w-[90%] h-full focus:outline-0"
        id="input"
        type="search"
        placeholder="Enter a company name or a short description"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>
    </form>
  );
}

export default Searchbar;
