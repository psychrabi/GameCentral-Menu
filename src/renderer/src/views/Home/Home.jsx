import { useEffect } from 'react'
import Header from '../../components/ui/Header'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import { useDataStore } from '../../components/stores/DataStore'
import { useAuthStore } from '../../components/stores/AuthStore'

const Home = () => {
  const token = useAuthStore((state) => state.token)
  const member = useAuthStore((state) => state.member)
  const fetchFavoriteGames = useDataStore((state) => state.fetchFavoriteGames)
  const favoriteGames = useDataStore((state) => state.favoriteGames)
  const filter = useDataStore((state) => state.filter)
  const setFilter = useDataStore((state) => state.setFilter)
  const type = useDataStore((state) => state.type)
  const setType = useDataStore((state) => state.setType)
  const getFavoriteGame = useDataStore((state) => state.getFavoriteGame)
  const setCount = useDataStore((state) => state.setCount)

  useEffect(() => {
    if (!favoriteGames?.length > 0) {
      fetchFavoriteGames(member.id, token)
    }
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
  }, [favoriteGames, filter, type])

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
