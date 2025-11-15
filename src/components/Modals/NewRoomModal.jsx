import React, { useState } from 'react';
import Modal from './Modal';
import { useStore } from '../../store/StoreContext';
import styles from './NewRoomModal.module.css';

const NewRoomModal = () => {
  const { state, dispatch } = useStore();
  const [roomName, setRoomName] = useState('');

  const createRoom = () => {
    if (roomName.trim()) {
      const room = {
        id: Date.now().toString(),
        name: roomName.trim(),
        icon: '💬',
        type: 'room',
      };
      dispatch({ type: 'rooms/addRoom', payload: room });
      dispatch({ type: 'ui/setCurrentRoom', payload: room.id });
      setRoomName('');
      dispatch({ type: 'ui/toggleNewRoomModal' });
    }
  };

  return (
    <Modal
      isOpen={state.ui.showNewRoomModal}
      onClose={() => dispatch({ type: 'ui/toggleNewRoomModal' })}
      title="Create New Channel"
    >
      <div className={styles.container}>
        <input
          className={styles.input}
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && createRoom()}
          placeholder="Channel name..."
        />
        <button className={styles.createBtn} onClick={createRoom}>Create</button>
      </div>
    </Modal>
  );
};

export default NewRoomModal;
