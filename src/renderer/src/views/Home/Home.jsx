import { useEffect, useMemo } from 'react'
import Header from '../../components/shared/Header/Header'
import Grid from '../../components/shared/Grid/Grid'
import GameTypes from '../../data/GameTypes.js'
import { useBoundStore } from '../../components/stores/BoundStore'
import { Navigate } from 'react-router-dom'

const Home = () => {
  const {
    token,
    member,
    checkFavoriteGames,
    favoriteGames,
    filter,
    setFilter,
    type,
    setType,
    getFavoriteGame,
    setCount,
    setTitle,
    setGameTypes
  } = useBoundStore((state) => ({
    token: state.token,
    member: state.member,
    checkFavoriteGames: state.checkFavoriteGames,
    favoriteGames: state.favoriteGames,
    filter: state.filter,
    setFilter: state.setFilter,
    type: state.type,
    setType: state.setType,
    getFavoriteGame: state.getFavoriteGame,
    setCount: state.setCount,
    setTitle: state.setTitle,
    setGameTypes: state.setGameTypes
  }))

  useEffect(() => {
    checkFavoriteGames()
    setFilter('')
    setType('')
    setTitle('Favorite Games')
    setGameTypes(GameTypes)
  }, [])

  const filteredGames = useMemo(
    () =>
      favoriteGames?.filter((item) => {
        const itemNameLower = item.name.toLowerCase()
        const filterLower = filter.toLowerCase()
        return filter ? itemNameLower.includes(filterLower) : type ? item.game_type === type : true
      }),
    [favoriteGames, filter, type]
  )

  useEffect(() => {
    setCount(filteredGames?.length)
  }, [filteredGames, setCount])

  return <Grid games={filteredGames} getData={getFavoriteGame} />
}

export default Home
