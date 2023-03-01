import { useDataStore } from '../../components/stores/DataStore'
import { useEffect } from 'react'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import Header from '../../components/ui/Header'
import { useAuthStore } from '../../components/stores/AuthStore'

export const GamesList = () => {
  const getGames = useDataStore((state) => state.fetchGames)
  const gamesList = useDataStore((state) => state.games)

  const filter = useDataStore((state) => state.filter)
  const type = useDataStore((state) => state.type)
  const member = useAuthStore((state) => state.member)

  useEffect(() => {
    getGames(member)
  }, [])

  return (
    <>
      {/* <FilterInput /> */}
      <Header categories={categories} />
      <div className="games" id="favorite-games-container">
        <Grid
          games={gamesList?.filter((game) => {
            if (filter) {
              return game.name.toLowerCase().includes(filter.toLowerCase())
            } else if (type) {
              return game.game_type === type
            } else {
              return true
            }
          })}
        />
      </div>
    </>
  )
}
