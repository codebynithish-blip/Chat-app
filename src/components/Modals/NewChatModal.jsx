import React from 'react';
import Modal from './Modal';
import { useStore } from '../../store/StoreContext';
import Avatar from '../Common/Avatar';
import styles from './NewChatModal.module.css';

const NewChatModal = () => {
  const { state, dispatch } = useStore();

  const availableUsers = state.auth.users.filter(
    (u) =>
      u.id !== state.auth.user?.id &&
      !state.rooms.rooms.some((r) => r.type === 'dm' && r.id.includes(u.id.toString()))
  );

  const createDirectMessage = (otherUser) => {
    const roomId = [state.auth.user.id, otherUser.id].sort().join('-');
    const existingRoom = state.rooms.rooms.find((r) => r.id === roomId);

    if (!existingRoom) {
      dispatch({
        type: 'rooms/addRoom',
        payload: {
          id: roomId,
          name: otherUser.name,
          type: 'dm',
          otherUser: otherUser,
        },
      });
    }

    dispatch({ type: 'ui/setCurrentRoom', payload: roomId });
    dispatch({ type: 'ui/toggleNewChatModal' });
  };

  return (
    <Modal
      isOpen={state.ui.showNewChatModal}
      onClose={() => dispatch({ type: 'ui/toggleNewChatModal' })}
      title="Start New Chat"
    >
      <div className={styles.list}>
        {availableUsers.length === 0 ? (
          <p className={styles.empty}>No users available. Register more users to chat!</p>
        ) : (
          availableUsers.map((user) => (
            <button key={user.id} className={styles.userBtn} onClick={() => createDirectMessage(user)}>
              <Avatar user={user} size={40} />
              <div className={styles.name}>{user.name}</div>
            </button>
          ))
        )}
      </div>
    </Modal>
  );
};

export default NewChatModal;
