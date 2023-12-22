import { useEffect } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/GameTypes.json'

function Games() {
  const token = useBoundStore((state) => state.token)
  const member = useBoundStore((state) => state.member)
  const fetchGames = useBoundStore((state) => state.fetchGames)
  const games = useBoundStore((state) => state.games)
  const filter = useBoundStore((state) => state.filter)
  const setFilter = useBoundStore((state) => state.setFilter)
  const type = useBoundStore((state) => state.type)
  const setType = useBoundStore((state) => state.setType)
  const getGame = useBoundStore((state) => state.getGame)
  const setCount = useBoundStore((state) => state.setCount)

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
