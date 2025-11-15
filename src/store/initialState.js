export const initialState = {
  auth: {
    user: null,
    isAuthenticated: false,
    users: [],
    error: null,
  },
  chat: {
    messages: {},
  },
  rooms: {
    rooms: [
      { 
        id: 'general', 
        name: 'General', 
        icon: '💬', 
        type: 'room' 
      }
    ],
  },
  ui: {
    currentRoom: 'general',
    showNewChatModal: false,
    showNewRoomModal: false,
    showSettingsModal: false,
    showCallModal: false,
    callType: null,
  },
};