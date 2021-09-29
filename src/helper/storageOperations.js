export const getItemFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const removeItemFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const setItemOnLocalStorage = (name, item) => {
  localStorage.setItem(name, item);
  getItemFromLocalStorage(name);
};

export const updateItemOnLocalStorage = (name, item) => {
  localStorage.removeItem(name);
  localStorage.setItem(name, item);
};
