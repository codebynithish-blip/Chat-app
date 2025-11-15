import { useStore } from '../store/StoreContext';

export default function useChat() {
  const { state, dispatch } = useStore();

  const sendMessage = (msg) => dispatch({ type: 'chat/addMessage', payload: msg });
  const createRoom = (room) => dispatch({ type: 'rooms/addRoom', payload: room });
  const setCurrentRoom = (id) => dispatch({ type: 'ui/setCurrentRoom', payload: id });

  return {
    messages: state.chat.messages,
    rooms: state.rooms.rooms,
    currentRoom: state.ui.currentRoom,
    sendMessage, createRoom, setCurrentRoom
  };
}
