import { saveToLocalStorage } from './saveToLocalStorage'

export const addToFavourites = (data, item) => {
  const index = data.findIndex((object) => object.id === item.id)
  data[index].isFavorite = true
  saveToLocalStorage('data', data)
}
