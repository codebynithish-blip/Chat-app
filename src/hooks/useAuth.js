import { useStore } from '../store/StoreContext';

export default function useAuth() {
  const { state, dispatch } = useStore();

  const login = (user) => dispatch({ type: 'auth/loginSuccess', payload: user });
  const logout = () => dispatch({ type: 'auth/logout' });
  const register = (user) => dispatch({ type: 'auth/registerSuccess', payload: user });

  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    users: state.auth.users,
    login, logout, register
  };
}
