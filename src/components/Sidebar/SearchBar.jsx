import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.wrapper}>
      <Search size={16} className={styles.icon} />
      <input className={styles.input} placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
