import { useState, useEffect } from 'react'
import axiosClient from '../lib/axios-client'
import { addDataIntoCache } from './addDataIntoCache'

const useFavoriteGames = () => {
  const [favoriteGames, setFavoriteGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const member = JSON.parse(localStorage.getItem('member'))
  // Function to add our give data into cache

  useEffect(() => {
    if (!localStorage.getItem('favorite_games')) {
      setIsLoading(true)
      try {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + member.token
        axiosClient.defaults.headers.common['Cache-Control'] = 'max=99999999'
        axiosClient.get(`/favoriteGames/${member.id}`).then(({ data }) => {
          setFavoriteGames(data)
          addDataIntoCache(
            'favoriteGames',
            `http://gamecentralmenu.test/api/favoriteGames/${member.id}`,
            data
          )

          localStorage.setItem('favorite_games', JSON.stringify(data))
          setIsLoading(false)
        })
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    } else {
      setFavoriteGames(JSON.parse(localStorage.getItem('favorite_games')))
      setIsLoading(false)
    }
  }, [])

  return { favoriteGames, isLoading }
}

export default useFavoriteGames
