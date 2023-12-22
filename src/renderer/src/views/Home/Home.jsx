import { useEffect } from 'react'
import Header from '../../components/ui/Header'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import { useBoundStore } from '../../components/stores/BoundStore'

const Home = () => {
  const token = useBoundStore((state) => state.token)
  const member = useBoundStore((state) => state.member)
  const fetchFavoriteGames = useBoundStore((state) => state.fetchFavoriteGames)
  const favoriteGames = useBoundStore((state) => state.favoriteGames)
  const filter = useBoundStore((state) => state.filter)
  const setFilter = useBoundStore((state) => state.setFilter)
  const type = useBoundStore((state) => state.type)
  const setType = useBoundStore((state) => state.setType)
  const getFavoriteGame = useBoundStore((state) => state.getFavoriteGame)
  const setCount = useBoundStore((state) => state.setCount)

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
