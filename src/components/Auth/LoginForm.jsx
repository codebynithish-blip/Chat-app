import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import styles from './LoginForm.module.css';

const LoginForm = ({ onSwitchMode }) => {
  const { state, dispatch } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const user = state.auth.users.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    dispatch({ 
      type: 'auth/loginSuccess', 
      payload: { ...user, online: true } 
    });
    setError('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome back</h2>
      <p className={styles.subheading}>Sign in to continue</p>

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <div className={styles.inputWrapper}>
          <Mail className={styles.inputIcon} size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <div className={styles.inputWrapper}>
          <Lock className={styles.inputIcon} size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="••••••••"
            className={styles.input}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button onClick={handleLogin} className={styles.submitButton}>
        Sign In
      </button>

      <div className={styles.switchMode}>
        Don't have an account?{' '}
        <button onClick={onSwitchMode} className={styles.switchButton}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;