import React, { useState } from 'react';
import searchIcon from '../pngsearch.png'; 
import styles from './SearchInput.module.css'; 

const SearchInput = ({ searchTerm, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search your trip"
        className={styles.searchInput}
      />
      <img
        src={searchIcon}
        alt="Search"
        className={styles.searchIcon}
        onClick={handleSearchSubmit}
      />
    </div>
  );
};

export default SearchInput;