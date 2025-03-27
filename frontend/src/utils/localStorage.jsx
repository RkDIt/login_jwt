const localStorageUtil = {
  get: (key) => {
    const value = localStorage.getItem(key);
    return value;
  },

  set: (key, value) => {
    localStorage.setItem(key, value);

  },

  clear: () => {
    localStorage.clear();
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },
};

export default localStorageUtil;
