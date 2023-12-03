import { useEffect } from 'react'
import { useAuthStore } from '../../components/stores/AuthStore'
import { useDataStore } from '../../components/stores/DataStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/AppTypes.json'

function Applications() {
  const { token, member } = useAuthStore()
  const { fetchApplications, applications, filter, type, getApplication } = useDataStore()

  useEffect(() => {
    fetchApplications(member.center_id, token)
    // console.log(applications)
  }, [])

  return (
    <>
      <Header categories={categories} page_title={'All Applications'} />
      <div className="games" id="favorite-games-container">
        <Grid
          games={applications?.filter((apps) => {
            if (filter) {
              return apps.name.toLowerCase().includes(filter.toLowerCase())
            } else if (type) {
              return apps.game_type === type
            } else {
              return true
            }
          })}
          getData={getApplication}
        />
      </div>
    </>
  )
}

export default Applications
