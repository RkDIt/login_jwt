
const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);

  return value;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const clearStorage = () => {
  localStorage.clear();
};

const removeStorage = ()=>{
    localStorage.removeItem(key)
}

export default {getLocalStorage, setLocalStorage, clearStorage, removeStorage}