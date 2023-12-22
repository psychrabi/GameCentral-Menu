import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/GameTypes.json'

function Games() {
  const token = useAuthStore((state) => state.token)
  const member = useAuthStore((state) => state.member)
  const fetchGames = useDataStore((state) => state.fetchGames)
  const games = useDataStore((state) => state.games)
  const filter = useDataStore((state) => state.filter)
  const setFilter = useDataStore((state) => state.setFilter)
  const type = useDataStore((state) => state.type)
  const setType = useDataStore((state) => state.setType)
  const getGame = useDataStore((state) => state.getGame)
  const setCount = useDataStore((state) => state.setCount)

  useEffect(() => {
    if (!games.length > 0) {
      fetchGames(member.center_id, token)
    }
    setFilter('')
    setType('')
  }, [])

  const filteredGames = games?.filter((item) => {
    if (filter) {
      return item.name.toLowerCase().includes(filter.toLowerCase())
    } else if (type) {
      return item.game_type === type
    } else {
      return true
    }
  })

  useEffect(() => {
    setCount(filteredGames.length)
  }, [games, filter, type])

  return (
    <>
      <Header categories={categories} page_title={'All Games'} />
      <div className="games" id="favorite-games-container">
        <Grid games={filteredGames} getData={getGame} />
      </div>
    </>
  )
}

export default Games
