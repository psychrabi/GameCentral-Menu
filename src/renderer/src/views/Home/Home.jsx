import { useEffect } from 'react'
import Header from '../../components/ui/Header'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import { useDataStore } from '../../components/stores/DataStore'
import { useAuthStore } from '../../components/stores/AuthStore'

const Home = () => {
  const { token, member } = useAuthStore()
  const {
    fetchFavoriteGames,
    favoriteGames,
    setFilter,
    setType,
    filter,
    type,
    getFavoriteGame,
    setCount
  } = useDataStore()

  useEffect(() => {
    if (!favoriteGames?.length > 0) {
      console.log('game fresh')
      fetchFavoriteGames(member.center_id, token)
    }
    console.log(favoriteGames)
    setFilter('')
    setType('')
  }, [])

  const filteredGames = favoriteGames?.filter((item) => {
    if (filter) {
      return item.name.toLowerCase().includes(filter.toLowerCase())
    } else if (type) {
      return item.game_type === type
    } else {
      return favoriteGames
    }
  })

  useEffect(() => {
    setCount(filteredGames?.length)
  }, [filter, type])

  return (
    <>
      <Header categories={categories} page_title={'All Games'} />
      <div className="games" id="favorite-games-container">
        <Grid games={filteredGames} getData={getFavoriteGame} />
      </div>
    </>
  )
}

export default Home
