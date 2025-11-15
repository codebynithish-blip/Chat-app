import React from 'react';
import { LogOut } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import Avatar from '../Common/Avatar';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { state, dispatch } = useStore();
  const user = state.auth.user || { name: 'Guest', color: '#667eea' };

  return (
    <div className={styles.container}>
      <Avatar user={user} size={48} />
      <div className={styles.info}>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.status}>Online</div>
      </div>
      <button className={styles.logoutBtn} onClick={() => dispatch({ type: 'auth/logout' })}>
        <LogOut size={18} />
      </button>
    </div>
  );
};

export default UserProfile;
