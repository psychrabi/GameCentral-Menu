import { useEffect } from 'react'
import { useBoundStore } from '../../components/stores/BoundStore'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import categories from '../../data/AppTypes.json'

function Applications() {
  const token = useBoundStore((state) => state.token)
  const member = useBoundStore((state) => state.member)
  const fetchApplications = useBoundStore((state) => state.fetchApplications)
  const applications = useBoundStore((state) => state.applications)
  const filter = useBoundStore((state) => state.filter)
  const setFilter = useBoundStore((state) => state.setFilter)
  const type = useBoundStore((state) => state.type)
  const setType = useBoundStore((state) => state.setType)
  const getApplication = useBoundStore((state) => state.getApplication)
  const setCount = useBoundStore((state) => state.setCount)

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
