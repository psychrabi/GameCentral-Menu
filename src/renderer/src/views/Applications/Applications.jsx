import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/AppTypes.json'

function Applications() {
  const getApplications = useDataStore((state) => state.fetchApplications)
  const gamesList = useDataStore((state) => state.applications)

  const filter = useDataStore((state) => state.filter)
  const member = useAuthStore((state) => state.member)

  useEffect(() => {
    getApplications(member)
  }, [])

  return (
    <>
      <Header categories={categories} />
      <div className="games" id="favorite-games-container">
        <Grid
          games={gamesList?.filter((game) =>
            game.name.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      </div>
    </>
  )
}

export default Applications
