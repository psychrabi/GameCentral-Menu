import { useEffect, useState, useMemo, useCallback } from 'react'
import Header from '../../../components/ui/Header'
import DataList from '../../../components/ui/Grid'
import categories from '../../../data/AppTypes.json'
import { sortByName } from '../../../utils/sortByName'
import { saveToLocalStorage } from '../../../utils/saveToLocalStorage'
import { useStateContext } from '../../../components/contexts/ContextProvider'
import { Loading } from '../../../components/ui/Loading'
import axiosClient from '../../../lib/axios-client'

function Applications() {
  //TODO: Get Apps from remote server instead of json
  const { search, setSearch, setShow } = useStateContext()
  const [loading, setLoading] = useState(false)
  // Store the filtered list of apps in a separate variable
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))
  const apps = useMemo(() => data?.filter((g) => g.type === 'apps'), [data])
  const appsList = useMemo(() => apps?.filter((g) => !g.isFavorite), [apps])

  // Use useState to store the current app, the list of apps, and the show state
  const [filteredApps, setFilteredApps] = useState(sortByName(appsList))

  // Use useState to store the app type and the title
  const [type, setType] = useState('')
  const [title, setTitle] = useState(['All Apps'])

  // Use useState to store the apps count
  const [count, setCount] = useState(appsList.length)

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem('member'))
    if (!localStorage.getItem('products')) {
      setLoading(true)

      try {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + member.token

        axiosClient.get(`/clientProducts/${member.center_id}`).then(({ data }) => {
          setData(data)
          // console.log({ Products: data });
          if (localStorage.getItem('products') == null) {
            localStorage.setItem('products', JSON.stringify(data))
          }
          setLoading(false)
        })
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }, [])

  const handleCategoriesChange = (event) => {
    setType(event.target.value)
    let index = event.target.selectedIndex
    setTitle(event.target[index].text)
  }

  // Use the useCallback hook to handleShow and handleClose functions
  const handleShow = useCallback((g) => {
    saveToLocalStorage('current-selected', g)
    setShow(true)
  }, [])

  useEffect(() => {
    // Update the filtered apps list when the gameType or search changes
    const newApps = type === '' ? appsList : appsList?.filter((g) => g.gameType === type)
    setFilteredApps(sortByName(newApps))
    setCount(newApps.length)

    // Save the type to local storage
    saveToLocalStorage('current-selected-type', type)
  }, [type, appsList])

  useEffect(() => {
    // Update the filtered apps list when the search changes
    if (search !== '') {
      const newApps = appsList?.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredApps(sortByName(newApps))
      setCount(search !== '' ? newApps?.length : appsList?.length)
    } else {
      setFilteredApps(appsList)
      setCount(appsList?.length)
    }
    setType('')
  }, [search, appsList])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header
            title={title}
            categories={categories}
            handleCategoriesChange={handleCategoriesChange}
            count={count}
            setSearch={setSearch}
          />
          <div className="games" id="favorite-games-container">
            <DataList handleShow={handleShow} games={filteredApps} />
          </div>
        </>
      )}
    </>
  )
}

export default Applications
