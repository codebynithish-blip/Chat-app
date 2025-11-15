import React from 'react';
import Modal from './Modal';
import { Phone, Video, X } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import Avatar from '../Common/Avatar';
import styles from './CallModal.module.css';

const CallModal = () => {
  const { state, dispatch } = useStore();
  const currentRoom = state.rooms.rooms.find((r) => r.id === state.ui.currentRoom);

  return (
    <Modal
      isOpen={state.ui.showCallModal}
      onClose={() => dispatch({ type: 'ui/closeCallModal' })}
      title={state.ui.callType === 'voice' ? 'Voice Call' : 'Video Call'}
    >
      <div className={styles.container}>
        <div className={styles.avatarWrap}>
          {currentRoom?.type === 'dm' ? (
            <Avatar user={currentRoom.otherUser} size={100} />
          ) : (
            <div className={styles.channelIcon}>{currentRoom?.icon}</div>
          )}
        </div>

        <h3 className={styles.roomName}>{currentRoom?.name}</h3>

        <p className={styles.status}>Calling...</p>

        {state.ui.callType === 'video' && (
          <div className={styles.videoPlaceholder}>
            <Video size={64} />
          </div>
        )}

        <div className={styles.controls}>
          <button className={styles.accept}>
            {state.ui.callType === 'voice' ? <Phone /> : <Video />}
          </button>
          <button className={styles.end} onClick={() => dispatch({ type: 'ui/closeCallModal' })}>
            <X />
          </button>
        </div>

        <p className={styles.note}>This is a demo. Real calls require WebRTC integration.</p>
      </div>
    </Modal>
  );
};

export default CallModal;
