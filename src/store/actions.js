// Action Types
export const actionTypes = {
  // Auth Actions
  AUTH_LOGIN_SUCCESS: 'auth/loginSuccess',
  AUTH_LOGOUT: 'auth/logout',
  AUTH_REGISTER_SUCCESS: 'auth/registerSuccess',
  AUTH_SET_USERS: 'auth/setUsers',
  
  // Chat Actions
  CHAT_ADD_MESSAGE: 'chat/addMessage',
  CHAT_SET_MESSAGES: 'chat/setMessages',
  CHAT_CLEAR_MESSAGES: 'chat/clearMessages',
  
  // Room Actions
  ROOMS_ADD_ROOM: 'rooms/addRoom',
  ROOMS_SET_ROOMS: 'rooms/setRooms',
  
  // UI Actions
  UI_SET_CURRENT_ROOM: 'ui/setCurrentRoom',
  UI_TOGGLE_NEW_CHAT_MODAL: 'ui/toggleNewChatModal',
  UI_TOGGLE_NEW_ROOM_MODAL: 'ui/toggleNewRoomModal',
  UI_TOGGLE_SETTINGS_MODAL: 'ui/toggleSettingsModal',
  UI_OPEN_CALL_MODAL: 'ui/openCallModal',
  UI_CLOSE_CALL_MODAL: 'ui/closeCallModal',
};

// Action Creators
export const authActions = {
  loginSuccess: (user) => ({
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    payload: user,
  }),
  logout: () => ({
    type: actionTypes.AUTH_LOGOUT,
  }),
  registerSuccess: (user) => ({
    type: actionTypes.AUTH_REGISTER_SUCCESS,
    payload: user,
  }),
  setUsers: (users) => ({
    type: actionTypes.AUTH_SET_USERS,
    payload: users,
  }),
};

export const chatActions = {
  addMessage: (message) => ({
    type: actionTypes.CHAT_ADD_MESSAGE,
    payload: message,
  }),
  setMessages: (messages) => ({
    type: actionTypes.CHAT_SET_MESSAGES,
    payload: messages,
  }),
  clearMessages: () => ({
    type: actionTypes.CHAT_CLEAR_MESSAGES,
  }),
};

export const roomActions = {
  addRoom: (room) => ({
    type: actionTypes.ROOMS_ADD_ROOM,
    payload: room,
  }),
  setRooms: (rooms) => ({
    type: actionTypes.ROOMS_SET_ROOMS,
    payload: rooms,
  }),
};

export const uiActions = {
  setCurrentRoom: (roomId) => ({
    type: actionTypes.UI_SET_CURRENT_ROOM,
    payload: roomId,
  }),
  toggleNewChatModal: () => ({
    type: actionTypes.UI_TOGGLE_NEW_CHAT_MODAL,
  }),
  toggleNewRoomModal: () => ({
    type: actionTypes.UI_TOGGLE_NEW_ROOM_MODAL,
  }),
  toggleSettingsModal: () => ({
    type: actionTypes.UI_TOGGLE_SETTINGS_MODAL,
  }),
  openCallModal: (callType) => ({
    type: actionTypes.UI_OPEN_CALL_MODAL,
    payload: callType,
  }),
  closeCallModal: () => ({
    type: actionTypes.UI_CLOSE_CALL_MODAL,
  }),
};