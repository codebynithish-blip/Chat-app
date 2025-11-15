const STORAGE_KEYS = {
  MESSAGES: 'chatApp_messages',
  ROOMS: 'chatApp_rooms',
  USERS: 'chatApp_users',
  CURRENT_USER: 'chatApp_currentUser',
};

// Maximum storage size (5MB)
const MAX_STORAGE_SIZE = 5 * 1024 * 1024;

/**
 * Save data to localStorage
 */
export const saveToLocalStorage = (data) => {
  try {
    const { messages, rooms, users, user } = data;

    // Save messages
    if (messages) {
      const messagesData = JSON.stringify(messages);
      if (messagesData.length < MAX_STORAGE_SIZE) {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, messagesData);
      } else {
        console.warn('Messages data exceeds storage limit');
      }
    }

    // Save rooms
    if (rooms) {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    }

    // Save users
    if (users) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    // Save current user
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Clearing old data...');
      clearOldMessages();
    }
  }
};

/**
 * Load data from localStorage
 */
export const loadFromLocalStorage = () => {
  try {
    const messages = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.MESSAGES) || '{}'
    );
    const rooms = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ROOMS) || 'null'
    );
    const users = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.USERS) || '[]'
    );
    const user = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null'
    );

    return { messages, rooms, users, user };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return { messages: {}, rooms: null, users: [], user: null };
  }
};

/**
 * Clear all chat data from localStorage
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    console.log('All data cleared from localStorage');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Clear only messages (keep user data)
 */
export const clearMessages = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    console.log('Messages cleared from localStorage');
  } catch (error) {
    console.error('Error clearing messages:', error);
  }
};

/**
 * Clear old messages to free up space
 * Keeps only the last 100 messages per room
 */
export const clearOldMessages = () => {
  try {
    const messages = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.MESSAGES) || '{}'
    );

    const trimmedMessages = {};
    Object.keys(messages).forEach((roomId) => {
      const roomMessages = messages[roomId];
      // Keep only last 100 messages per room
      if (roomMessages && roomMessages.length > 100) {
        trimmedMessages[roomId] = roomMessages.slice(-100);
      } else {
        trimmedMessages[roomId] = roomMessages;
      }
    });

    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(trimmedMessages));
    console.log('Old messages cleared successfully');
  } catch (error) {
    console.error('Error clearing old messages:', error);
  }
};

/**
 * Get storage usage information
 */
export const getStorageInfo = () => {
  try {
    let totalSize = 0;
    const sizes = {};

    Object.entries(STORAGE_KEYS).forEach(([key, value]) => {
      const data = localStorage.getItem(value);
      const size = data ? new Blob([data]).size : 0;
      sizes[key] = size;
      totalSize += size;
    });

    return {
      totalSize,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      sizes,
      maxSize: MAX_STORAGE_SIZE,
      maxSizeMB: (MAX_STORAGE_SIZE / (1024 * 1024)).toFixed(2),
      percentUsed: ((totalSize / MAX_STORAGE_SIZE) * 100).toFixed(2),
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};

/**
 * Export data as JSON (for backup)
 */
export const exportData = () => {
  try {
    const data = loadFromLocalStorage();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-backup-${new Date().toISOString()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('Data exported successfully');
  } catch (error) {
    console.error('Error exporting data:', error);
  }
};

/**
 * Import data from JSON file
 */
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          saveToLocalStorage(data);
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
};
