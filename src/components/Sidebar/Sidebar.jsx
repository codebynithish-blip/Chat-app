import React from 'react';
import UserProfile from './UserProfile';
import SearchBar from './SearchBar';
import RoomList from './RoomList';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <UserProfile />
        <SearchBar />
      </div>

      <RoomList />
    </aside>
  );
};

export default Sidebar;
