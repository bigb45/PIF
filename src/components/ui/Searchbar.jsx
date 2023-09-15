import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useContext } from "react";
import SearchContext from "../context/SearchContext";

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");
  const { setSearchResultsVisible, setSearchQuery } = useContext(SearchContext);

  return (
    <form
      className="bg-white shadow-lg w-[50%] h-16 rounded-full flex-row items-center justify-center py-[15px] px-[30px] space-x-3"
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchQuery(query);
        onSubmit();
        // window.location.href = `/search/${query}`;
      }}
    >
      <SearchIcon className="text-slate-400 cursor-pointer" />
      <input
        className="w-[90%] h-full focus:outline-0"
        id="input"
        type="search"
        placeholder="Enter a company name or a short description"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          if (e.target.value === "") setSearchResultsVisible(false);
        }}
      ></input>
    </form>
  );
}

export default Searchbar;
