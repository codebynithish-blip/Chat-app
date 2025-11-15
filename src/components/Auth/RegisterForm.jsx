import React, { useState } from 'react';
import { User, Plus } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import styles from './RegisterForm.module.css';
import { COLORS } from '../../utils/constants';

const RegisterForm = ({ onSwitchMode }) => {
  const { state, dispatch } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const existingUser = state.auth.users.find((u) => u.email === email.toLowerCase());
    if (existingUser) {
      setError('Email already registered');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password,
      avatar,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      online: true,
    };

    dispatch({ type: 'auth/registerSuccess', payload: newUser });
    setError('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Create account</h2>
      <p className={styles.subheading}>Sign up to start chatting</p>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.avatarRow}>
        <div className={styles.avatarWrap}>
          {avatar ? (
            <img src={avatar} alt="avatar" className={styles.avatarImage} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <User size={40} color="white" />
            </div>
          )}

          <button
            type="button"
            className={styles.addAvatarBtn}
            onClick={() => document.getElementById('registerAvatarInput').click()}
          >
            <Plus size={14} color="white" />
          </button>

          <input
            id="registerAvatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
        />
      </div>

      <button className={styles.submitButton} onClick={handleRegister}>
        Create Account
      </button>

      <div className={styles.switchMode}>
        Already have an account?{' '}
        <button className={styles.switchButton} onClick={onSwitchMode}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
