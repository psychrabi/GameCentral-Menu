import { useEffect } from 'react'
import Header from '../../components/ui/Header'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import { useDataStore } from '../../components/stores/DataStore'
import { useAuthStore } from '../../components/stores/AuthStore'

const Home = () => {
  const getFavoriteGames = useDataStore((state) => state.fetchFavoriteGames)
  const gamesList = useDataStore((state) => state.favoriteGames)

  const filter = useDataStore((state) => state.filter)
  const member = useAuthStore((state) => state.member)

  useEffect(() => {
    getFavoriteGames(member)
  }, [])

  return (
    <>
      <Header categories={categories} />
      <div className="games" id="favorite-games-container">
        <Grid
          games={gamesList?.filter((game) =>
            game.name.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      </div>
    </>
  )
}

export default Home
