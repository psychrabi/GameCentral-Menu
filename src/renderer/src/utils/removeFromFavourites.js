import { saveToLocalStorage } from './saveToLocalStorage'

export const removeFromFavourites = (data, item) => {
  const index = data.findIndex((object) => object.id === item.id)
  data[index].isFavorite = false
  saveToLocalStorage('data', data)
}
