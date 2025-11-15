import React from 'react';
import Avatar from '../Common/Avatar';
import { useStore } from '../../store/StoreContext';
import styles from './RoomItem.module.css';

const RoomItem = ({ room }) => {
  const { state, dispatch } = useStore();
  const isActive = state.ui.currentRoom === room.id;

  return (
    <button
      className={`${styles.container} ${isActive ? styles.active : ''}`}
      onClick={() => dispatch({ type: 'ui/setCurrentRoom', payload: room.id })}
    >
      {room.type === 'dm' ? (
        <Avatar user={room.otherUser} size={40} />
      ) : (
        <div className={styles.channelIcon}>{room.icon}</div>
      )}

      {/* FIX: show correct other user name */}
      <div className={styles.label}>
        {room.type === "dm" ? room.otherUser?.name : room.name}
      </div>
    </button>
  );
};

export default RoomItem;
