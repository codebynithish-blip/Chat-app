import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import styles from './MessageInput.module.css';

const MessageInput = () => {
  const { state, dispatch } = useStore();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() && state.auth.user) {
      const message = {
        id: Date.now(),
        text: inputValue.trim(),
        user: state.auth.user,
        room: state.ui.currentRoom,
        timestamp: new Date().toISOString(),
      };

      dispatch({ type: 'chat/addMessage', payload: message });
      setInputValue('');
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className={styles.sendButton} onClick={handleSendMessage} disabled={!inputValue.trim()}>
        <Send size={18} />
      </button>
    </div>
  );
};

export default MessageInput;
