import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/AppTypes.json'

function Games() {
  const { token, member } = useAuthStore()
  const { fetchGames, games, filter, type, getGame } = useDataStore()
  useEffect(() => {
    fetchGames(member.center_id, token)
    // console.log(games)
  }, [])

  return (
    <>
      <Header categories={categories} />
      <div className="games" id="favorite-games-container">
        <Grid
          games={games?.filter((apps) => {
            if (filter) {
              return apps.name.toLowerCase().includes(filter.toLowerCase())
            } else if (type) {
              return apps.product_type === type
            } else {
              return true
            }
          })}
          getData={getGame}
        />
      </div>
    </>
  )
}

export default Games
