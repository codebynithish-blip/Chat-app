import React from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import RoomItem from './RoomItem';
import styles from './RoomList.module.css';

const RoomList = () => {
  const { state, dispatch } = useStore();

  const dmRooms = state.rooms.rooms.filter((r) => r.type === 'dm');
  const channelRooms = state.rooms.rooms.filter((r) => r.type === 'room');

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <span>DIRECT MESSAGES</span>
        <button onClick={() => dispatch({ type: 'ui/toggleNewChatModal' })} className={styles.iconBtn}>
          <Plus size={14} />
        </button>
      </div>

      <div className={styles.list}>
        {dmRooms.map((r) => (
          <RoomItem key={r.id} room={r} />
        ))}
      </div>

      <div className={styles.sectionHeader} style={{ marginTop: '16px' }}>
        <span>CHANNELS</span>
        <button onClick={() => dispatch({ type: 'ui/toggleNewRoomModal' })} className={styles.iconBtn}>
          <Plus size={14} />
        </button>
      </div>

      <div className={styles.list}>
        {channelRooms.map((r) => (
          <RoomItem key={r.id} room={r} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
