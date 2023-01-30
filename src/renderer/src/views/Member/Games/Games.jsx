import { useEffect, useState, useMemo, useCallback } from 'react'
import Header from '../../../components/ui/Header'
import Grid from '../../../components/ui/Grid'
import categories from '../../../data/GameTypes.json'
import { sortByName } from '../../../utils/sortByName'
import { saveToLocalStorage } from '../../../utils/saveToLocalStorage'
import { useStateContext } from '../../../components/contexts/ContextProvider'
import { Loading } from '../../../components/ui/Loading'
import axiosClient from '../../../lib/axios-client'
function Games() {
  //TODO: Get Games from remote server instead of json
  const { search, setSearch, setShow } = useStateContext()
  const [loading, setLoading] = useState(false)

  // Store the filtered list of games in a separate variable

  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))
  const games = useMemo(() => data?.filter((g) => g.type === 'games'), [data])
  const gamesList = useMemo(() => games, [games])

  // Use useState to store the current game, the list of games, and the show state
  const [filteredGames, setFilteredGames] = useState(sortByName(gamesList))

  // Use useState to store the game type and the title
  const [type, setType] = useState('')
  const [title, setTitle] = useState(['All Games'])

  // Use useState to store the games count
  const [count, setCount] = useState(gamesList?.length)

  const handleCategoriesChange = (event) => {
    setType(event.target.value)
    let index = event.target.selectedIndex
    setTitle(event.target[index].text)
  }

  useEffect(() => {
    const member = JSON.parse(localStorage.getItem('member'))

    if (!localStorage.getItem('data')) {
      setLoading(true)
      try {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + member.token
        axiosClient.get(`/clientGames/${member.center_id}`).then(({ data }) => {
          console.log({ Games: data })
          setData(data)
          if (localStorage.getItem('data') == null) {
            localStorage.setItem('data', JSON.stringify(data))
          }
          setLoading(false)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  // Use the useCallback hook to handleShow and handleClose functions

  const handleShow = useCallback((g) => {
    saveToLocalStorage('current-selected', g)
    setShow(true)
  }, [])

  useEffect(() => {
    // Update the filtered games list when the type or search changes
    const newGames = type === '' ? gamesList : gamesList?.filter((g) => g.game_type === type)
    setFilteredGames(sortByName(newGames))
    setCount(newGames?.length)

    // Save the type to local storage
    saveToLocalStorage('current-selected-type', type)
  }, [type, gamesList])

  useEffect(() => {
    // Update the filtered games list when the search changes
    if (search !== '') {
      const newGames = gamesList?.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredGames(sortByName(newGames))
      setCount(search !== '' ? newGames?.length : gamesList?.length)
    } else {
      setFilteredGames(gamesList)
      setCount(gamesList?.length)
      setType('')
    }
  }, [search, gamesList])

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
            <Grid handleShow={handleShow} games={filteredGames} />
          </div>
        </>
      )}
    </>
  )
}

export default Games
