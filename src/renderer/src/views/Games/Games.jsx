import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/GameTypes.json'
import { motion, AnimatePresence } from 'framer-motion '

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
      <motion.div layout className="games" id="favorite-games-container">
        <AnimatePresence>
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
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default Games
