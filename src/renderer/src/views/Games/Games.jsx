import { useEffect, useMemo } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import Grid from '../../components/shared/Grid/Grid'
import Header from '../../components/shared/Header/Header'
import GameTypes from '../../data/GameTypes.js'

function Games() {
  const {
    token,
    member,
    fetchGames,
    games,
    filter,
    setFilter,
    type,
    setType,
    getGame,
    setCount,
    setTitle,
    setGameTypes
  } = useBoundStore((state) => ({
    token: state.token,
    member: state.member,
    fetchGames: state.fetchGames,
    games: state.games,
    filter: state.filter,
    setFilter: state.setFilter,
    type: state.type,
    setType: state.setType,
    getGame: state.getGame,
    setCount: state.setCount,
    setTitle: state.setTitle,
    setGameTypes: state.setGameTypes
  }))

  useEffect(() => {
    if (games.length === 0) {
      fetchGames(member.center_id, token)
    }
    setFilter('')
    setType('')
    setTitle('All Games')
    setGameTypes(GameTypes)
  }, [fetchGames, member.center_id, token])

  const filteredGames = useMemo(() => {
    return games.reduce((acc, item) => {
      const itemNameLower = item.name.toLowerCase()
      if (
        (filter && itemNameLower.includes(filter.toLowerCase())) ||
        (type && item.game_type === type) ||
        (!filter && !type)
      ) {
        acc.push(item)
      }
      return acc
    }, [])
  }, [games, filter, type])

  return <Grid games={filteredGames} getData={getGame} />
}

export default Games
