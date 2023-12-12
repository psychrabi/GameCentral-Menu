import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/AppTypes.json'

function Applications() {
  const { token, member } = useAuthStore()
  const {
    fetchApplications,
    applications,
    setFilter,
    filter,
    setType,
    type,
    getApplication,
    setCount
  } = useDataStore()

  useEffect(() => {
    if (!applications.length > 0) {
      fetchApplications(member.center_id, token)
    }
    setFilter('')
    setType('')
  }, [])

  const filteredApps = applications?.filter((item) => {
    if (filter) {
      return item.name.toLowerCase().includes(filter.toLowerCase())
    } else if (type) {
      return item.game_type === type
    } else {
      return true
    }
  })

  useEffect(() => {
    setCount(filteredApps.length)
  }, [applications, filter, type])

  return (
    <>
      <Header categories={categories} page_title={'All Applications'} />
      <div className="games" id="favorite-games-container">
        <Grid games={filteredApps} getData={getApplication} />
      </div>
    </>
  )
}

export default Applications
