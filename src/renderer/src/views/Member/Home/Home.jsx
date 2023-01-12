import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../../../components/ui/Header'
import DataList from '../../../components/ui/Grid'
import categories from '../../../data/GameTypes.json'
import { sortByName } from '../../../utils/sortByName'
import { useStateContext } from '../../../components/contexts/ContextProvider'
import { Loading } from '../../../components/ui/Loading'
import axiosClient from '../../../lib/axios-client'

const Home = () => {
  //TODO: Get Games from remote server instead of json
  const { search, setSearch, setShow } = useStateContext()
  const [loading, setLoading] = useState(false)

  // Store the filtered list of games in a separate variable
  const [data, setData] = useState(JSON.parse(localStorage.getItem('favorite_games')))
  const HomeList = useMemo(
    () => data?.filter((g) => g.type === 'apps' || g.type === 'games'),
    [data]
  )

  // Use useState to store the current game, the list of games, and the show state
  const [filteredGames, setFilteredGames] = useState(sortByName(HomeList))

  // Use useState to store the game count
  const [count, setCount] = useState(HomeList?.length)

  useEffect(() => {
    // Update the filtered apps list when the search changes
    if (search !== '') {
      const newApps = HomeList?.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredGames(sortByName(newApps))
      setCount(search !== '' ? newApps?.length : HomeList?.length)
    } else {
      setFilteredGames(HomeList)
      setCount(HomeList?.length)
    }
  }, [search, HomeList])

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem('member'))
    if (!localStorage.getItem('favorite_games')) {
      setLoading(true)

      try {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + member.token
        axiosClient.get(`/favorite-games/${member.id}`).then(({ data }) => {
          setData(data)
          // console.log({ Favorite_Games: data });
          if (localStorage.getItem('favorite_games') == null) {
            localStorage.setItem('favorite_games', JSON.stringify(data))
          }
          setLoading(false)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const handleCategoriesChange = (event) => {
    console.log(event.target.value)
  }

  const handleShow = useCallback((g) => {
    console.log(g)
    localStorage.setItem('current-selected', JSON.stringify(g))
    setShow(true)
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header
            title={'Favourites'}
            categories={categories}
            handleCategoriesChange={handleCategoriesChange}
            count={count}
            setSearch={setSearch}
          />
          <div className="games" id="favorite-games-container">
            <DataList handleShow={handleShow} games={filteredGames} />
          </div>
        </>
      )}
    </>
  )
}

export default Home
