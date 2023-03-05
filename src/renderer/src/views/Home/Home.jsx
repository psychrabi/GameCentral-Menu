import { useEffect } from 'react'
import Header from '../../components/ui/Header'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import { useDataStore } from '../../components/stores/DataStore'
import { useAuthStore } from '../../components/stores/AuthStore'

const Home = () => {
  const { token, member } = useAuthStore()
  const { fetchFavoriteGames, favoriteGames, filter, type, getFavoriteGame } = useDataStore()

  useEffect(() => {
    fetchFavoriteGames(member.id, token)
    // console.log(favoriteGames)
  }, [])

  return (
    <>
      <Header categories={categories} />
      <div className="games" id="favorite-games-container">
        <Grid
          games={favoriteGames?.filter((game) => {
            if (filter) {
              return game.name.toLowerCase().includes(filter.toLowerCase())
            } else if (type) {
              return game.game_type === type
            } else {
              return true
            }
          })}
          getData={getFavoriteGame}
        />
      </div>
    </>
  )
}

export default Home
