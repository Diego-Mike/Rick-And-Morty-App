import React from "react";

import "./Search.css";

const Search = ({ styles, search, handleSearch, searchInput }) => {
  return (
    <div className={styles ? "Search-black" : "Search"}>
      <input
        type="text"
        placeholder="Name Of The Character"
        maxLength="50"
        ref={searchInput}
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
