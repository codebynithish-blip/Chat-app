import React from 'react';
import Avatar from '../Common/Avatar';
import { Phone, Video, Settings } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import styles from './ChatHeader.module.css';

const ChatHeader = ({ room }) => {
  const { dispatch } = useStore();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {room?.type === 'dm' ? (
          <Avatar user={room.otherUser} size={48} />
        ) : (
          <div className={styles.channelIcon}>{room?.icon}</div>
        )}
        <div className={styles.title}>{room?.name}</div>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={() => dispatch({ type: 'ui/openCallModal', payload: 'voice' })}>
          <Phone />
        </button>
        <button className={styles.iconBtn} onClick={() => dispatch({ type: 'ui/openCallModal', payload: 'video' })}>
          <Video />
        </button>
        <button className={styles.iconBtn} onClick={() => dispatch({ type: 'ui/toggleSettingsModal' })}>
          <Settings />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
