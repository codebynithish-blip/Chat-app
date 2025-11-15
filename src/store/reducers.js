import { actionTypes } from './actions';

export function rootReducer(state, action) {
  switch (action.type) {
    // Auth Reducers
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          isAuthenticated: true,
          error: null,
        },
      };
      
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: null,
          isAuthenticated: false,
          error: null,
        },
      };
      
    case actionTypes.AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          isAuthenticated: true,
          users: [...state.auth.users, action.payload],
          error: null,
        },
      };
      
    case actionTypes.AUTH_SET_USERS:
      return {
        ...state,
        auth: { ...state.auth, users: action.payload },
      };

    // Chat Reducers
    case actionTypes.CHAT_ADD_MESSAGE: {
      const { room } = action.payload;
      const roomMessages = state.chat.messages[room] || [];
      return {
        ...state,
        chat: {
          messages: {
            ...state.chat.messages,
            [room]: [...roomMessages, action.payload],
          },
        },
      };
    }
    
    case actionTypes.CHAT_SET_MESSAGES:
      return {
        ...state,
        chat: { messages: action.payload },
      };
      
    case actionTypes.CHAT_CLEAR_MESSAGES:
      return {
        ...state,
        chat: { messages: {} },
      };

    // Room Reducers
    case actionTypes.ROOMS_ADD_ROOM:
      return {
        ...state,
        rooms: {
          rooms: [...state.rooms.rooms, action.payload],
        },
      };
      
    case actionTypes.ROOMS_SET_ROOMS:
      return {
        ...state,
        rooms: { rooms: action.payload },
      };

    // UI Reducers
    case actionTypes.UI_SET_CURRENT_ROOM:
      return {
        ...state,
        ui: { ...state.ui, currentRoom: action.payload },
      };
      
    case actionTypes.UI_TOGGLE_NEW_CHAT_MODAL:
      return {
        ...state,
        ui: { ...state.ui, showNewChatModal: !state.ui.showNewChatModal },
      };
      
    case actionTypes.UI_TOGGLE_NEW_ROOM_MODAL:
      return {
        ...state,
        ui: { ...state.ui, showNewRoomModal: !state.ui.showNewRoomModal },
      };
      
    case actionTypes.UI_TOGGLE_SETTINGS_MODAL:
      return {
        ...state,
        ui: { ...state.ui, showSettingsModal: !state.ui.showSettingsModal },
      };
      
    case actionTypes.UI_OPEN_CALL_MODAL:
      return {
        ...state,
        ui: { ...state.ui, showCallModal: true, callType: action.payload },
      };
      
    case actionTypes.UI_CLOSE_CALL_MODAL:
      return {
        ...state,
        ui: { ...state.ui, showCallModal: false, callType: null },
      };

    default:
      return state;
  }
}
