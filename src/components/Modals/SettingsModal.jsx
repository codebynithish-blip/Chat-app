import React from 'react';
import Modal from './Modal';
import { useStore } from '../../store/StoreContext';
import styles from './SettingsModal.module.css';

const SettingsModal = () => {
  const { state, dispatch } = useStore();

  return (
    <Modal
      isOpen={state.ui.showSettingsModal}
      onClose={() => dispatch({ type: 'ui/toggleSettingsModal' })}
      title="Settings"
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div>
            <div className={styles.title}>Notifications</div>
            <div className={styles.desc}>Enable message notifications</div>
          </div>
          <div className={styles.toggleOn}>
            <div className={styles.toggleDot}></div>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.title}>Sound Effects</div>
            <div className={styles.desc}>Play sound for new messages</div>
          </div>
          <div className={styles.toggleOff}>
            <div className={styles.toggleDot}></div>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <div className={styles.title}>Dark Mode</div>
            <div className={styles.desc}>Switch to dark theme</div>
          </div>
          <div className={styles.toggleOff}>
            <div className={styles.toggleDot}></div>
          </div>
        </div>

        <div className={styles.accountSection}>
          <div className={styles.accountTitle}>Account</div>
          <div className={styles.accountItem}>Email: {state.auth.user?.email}</div>
          <div className={styles.accountItem}>Member since: {new Date().toLocaleDateString()}</div>
        </div>

        <button className={styles.clearBtn} onClick={() => dispatch({ type: 'chat/clearMessages' })}>
          Clear All Messages
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
