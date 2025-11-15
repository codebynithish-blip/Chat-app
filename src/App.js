import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from './store/StoreContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Sidebar from './components/Sidebar/Sidebar';
import ChatHeader from './components/Chat/ChatHeader';
import MessageList from './components/Chat/MessageList';
import MessageInput from './components/Chat/MessageInput';
import NewChatModal from './components/Modals/NewChatModal';
import NewRoomModal from './components/Modals/NewRoomModal';
import CallModal from './components/Modals/CallModal';
import SettingsModal from './components/Modals/SettingsModal';
import styles from './App.module.css';

const App = () => {
  const { state } = useStore();
  const [authMode, setAuthMode] = useState('login');

  const currentRoomData = state.rooms.rooms.find(
    (r) => r.id === state.ui.currentRoom
  );

  if (!state.auth.isAuthenticated) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authBanner}>
            <div className={styles.brandContainer}>
              <div className={styles.brandIcon}>
                <MessageCircle size={32} />
              </div>
              <h1 className={styles.brandName}>Chat-App</h1>
            </div>
            <h2 className={styles.bannerHeading}>
              Connect with anyone, anywhere
            </h2>
            <p className={styles.bannerSubheading}>
              Real-time messaging             </p>
          </div>

          <div className={styles.authForm}>
            {authMode === 'login' ? (
              <LoginForm onSwitchMode={() => setAuthMode('register')} />
            ) : (
              <RegisterForm onSwitchMode={() => setAuthMode('login')} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <Sidebar />

      <div className={styles.chatContainer}>
        <ChatHeader room={currentRoomData} />
        <MessageList />
        <MessageInput />
      </div>

      <NewChatModal />
      <NewRoomModal />
      <CallModal />
      <SettingsModal />
    </div>
  );
};

export default App;