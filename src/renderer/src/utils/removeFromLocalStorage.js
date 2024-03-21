export const removeFromLocalStorage = (...keys) => {
  keys.forEach(key => localStorage.removeItem(key));
}
