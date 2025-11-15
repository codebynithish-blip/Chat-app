import React from 'react';
import styles from './Avatar.module.css';

const Avatar = ({ user, size = 48, onClick }) => {
  const avatarStyle = {
    width: size,
    height: size,
    fontSize: size / 3,
  };

  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className={styles.avatarImage}
        style={avatarStyle}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      className={styles.avatarPlaceholder}
      style={{ ...avatarStyle, backgroundColor: user.color }}
      onClick={onClick}
    >
      {user.name[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
