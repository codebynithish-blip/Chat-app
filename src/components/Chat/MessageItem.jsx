import React from 'react';
import Avatar from '../Common/Avatar';
import styles from './MessageItem.module.css';

const MessageItem = ({ message, isOwn }) => {
  return (
    <div className={`${styles.row} ${isOwn ? styles.own : ''}`}>
      <Avatar user={message.user} size={36} />
      <div className={styles.bubbleWrap}>
        <div className={styles.sender}>{message.user.name}</div>
        <div className={`${styles.bubble} ${isOwn ? styles.bubbleOwn : ''}`}>
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
