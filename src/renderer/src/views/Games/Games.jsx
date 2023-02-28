import { useCallback, useEffect, useMemo, useState } from 'react'
import { useStateContext } from '../../components/contexts/ContextProvider'
import Grid from '../../components/ui/Grid'
import Header from '../../components/ui/Header'
import { Loading } from '../../components/ui/Loading'
import categories from '../../data/GameTypes.json'
import { saveToLocalStorage } from '../../utils/saveToLocalStorage'
import { fetchData } from '../../utils/sortByName'
import useFilter from '../../utils/useFilter'
import { addDataIntoCache } from '../../utils/addDataIntoCache'
function Games() {
  //TODO: Get Games from remote server instead of json
  const { setShow } = useStateContext()
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState(JSON.parse(localStorage.getItem('data')) ?? [])

  const { setSearch, setType, filteredList } = useFilter(games, categories, 'game_type')

  // Use useState to store the current game, the list of games, and the show state

  // Use useState to store the game type and the title
  // const [type, setType] = useState('')
  const [title, setTitle] = useState(['All Games'])

  // Use useState to store the games count

  const count = useMemo(() => filteredList.length, [filteredList])

  const handleCategoriesChange = (event) => {
    setSearch('')
    let index = event.target.selectedIndex
    setTitle(event.target[index].text)
    setType(event.target.value)
  }

  const handleSearch = (search) => {
    setType('')
    setSearch(search)
  }

  useEffect(() => {
    setLoading(true)
    ;(async function () {
      const member = JSON.parse(localStorage.getItem('member'))
      const games = await fetchData(`/clientGames/${member.center_id}`, member.token)
      addDataIntoCache(
        'games',
        `http://gamecentralmenu.test/api/clientGames/${member.center_id}`,
        games
      )
      setGames(games)
      setLoading(false)
    })()
  }, [])

  // Use the useCallback hook to handleShow and handleClose functions
  const handleShow = useCallback((g) => {
    saveToLocalStorage('current-selected', g)
    setShow(true)
  }, [])

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
            handleSearch={handleSearch}
          />
          <div className="games" id="favorite-games-container">
            <Grid handleShow={handleShow} games={filteredList} />
          </div>
        </>
      )}
    </>
  )
}

export default Games
