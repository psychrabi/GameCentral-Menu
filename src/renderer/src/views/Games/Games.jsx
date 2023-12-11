import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/GameTypes.json'

function Games() {
  const { token, member } = useAuthStore()
  const { fetchGames, games, filter, setFilter, type, setType, getGame } = useDataStore()
  useEffect(() => {
    if (!games.length > 0) {
      fetchGames(member.center_id, token)
    }
    // console.log(games)
    setFilter('')
    setType('')
    // console.log(games)
  }, [])

  return (
    <>
      <Header categories={categories} page_title={'All Games'} />
      <div className="games" id="favorite-games-container">
        <Grid
          games={games?.filter((apps) => {
            if (filter) {
              return apps.name.toLowerCase().includes(filter.toLowerCase())
            } else if (type) {
              return apps.game_type === type
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
