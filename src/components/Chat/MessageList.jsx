import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store/StoreContext';
import MessageItem from './MessageItem';
import styles from './MessageList.module.css';

const MessageList = () => {
  const { state } = useStore();
  const messagesEndRef = useRef(null);
  const messages = state.chat.messages[state.ui.currentRoom] || [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      {messages.length === 0 && (
        <div className={styles.empty}>
          No messages yet — say hello 👋
        </div>
      )}

      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} isOwn={msg.user.id === state.auth.user?.id} />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
