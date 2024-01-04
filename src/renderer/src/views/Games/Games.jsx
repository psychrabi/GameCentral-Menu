import { useEffect } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import GameTypes from '../../data/GameTypes.js'

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
  const setTitle = useBoundStore((state) => state.setTitle)

  useEffect(() => {
    if (!games.length > 0) {
      fetchGames(member.center_id, token)
    }
    setFilter('')
    setType('')
    setTitle('All Games')
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
  }, [filter, type])

  return (
    <>
      <Header categories={GameTypes} />
      <div className="games" id="favorite-games-container">
        <Grid games={filteredGames} getData={getGame} />
      </div>
    </>
  )
}

export default Games
