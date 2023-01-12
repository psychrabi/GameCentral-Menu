import { saveToLocalStorage } from './saveToLocalStorage'

export const addToFavourites = (item) => {
  const data = localStorage.getItem('data')
  const newList = data.filter((g) => g.id !== item.id)
  saveToLocalStorage('data', newList)
}
