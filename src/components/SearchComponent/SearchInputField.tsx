import React, { FC, useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Company } from "../../types/company";
import { Link } from "react-router-dom";

interface SearchProps {
  onSearch: (searchValue: string) => void;
  searchResults: Company[];
}

const SearchInputField: FC<SearchProps> = ({
  onSearch,
  searchResults,
}): JSX.Element => {
  const [search, setSearch] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setIsHidden(true);
  };
  useEffect(() => {
    setIsHidden(false);
  }, [search]);
  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <div className="search">
      <div className="search__input">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="search__icon">
        <HiOutlineSearch size={20} />
      </div>
      <div
        className={`search__dropdown ${
          search === "" || isHidden ? "hide" : ""
        }`}
      >
        {searchResults.map((result) => (
          <div className="search__dropdown--results" key={result.id}>
            <Link to={`/company/${result.id}`} onClick={handleClick}>
              <p>{result.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchInputField;
