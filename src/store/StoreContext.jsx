import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { rootReducer } from './reducers';
import { initialState } from './initialState';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    
    if (savedData.messages && Object.keys(savedData.messages).length > 0) {
      dispatch({ type: 'chat/setMessages', payload: savedData.messages });
    }
    
    if (savedData.users && savedData.users.length > 0) {
      dispatch({ type: 'auth/setUsers', payload: savedData.users });
    }
    
    if (savedData.rooms) {
      dispatch({ type: 'rooms/setRooms', payload: savedData.rooms });
    }
    
    if (savedData.user) {
      dispatch({ type: 'auth/loginSuccess', payload: savedData.user });
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    saveToLocalStorage({
      messages: state.chat.messages,
      rooms: state.rooms.rooms,
      users: state.auth.users,
      user: state.auth.user,
    });
  }, [state.chat.messages, state.rooms.rooms, state.auth.users, state.auth.user]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
