import { useState } from 'react';
import styles from './searchbar.module.css';
import { TbSearch } from 'react-icons/tb';


export function SearchBar ({ searchText, onSearch, onClear }) {
    return (
        <div className={styles.searchBar}>
          <div>
            <TbSearch/>
            <input type='text' placeholder='Search By Description' value={searchText} onChange={onSearch}/>
          </div>
          <button type="button" onClick={onClear}>
            Clear
          </button>
        </div>
    );
};