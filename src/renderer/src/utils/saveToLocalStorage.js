export const saveToLocalStorage = (store, items) => {
  localStorage.setItem(store, JSON.stringify(items))
}
