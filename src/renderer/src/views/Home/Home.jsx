import { useCallback, useMemo } from 'react'
import Header from '../../components/ui/Header'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import { useStateContext } from '../../components/contexts/ContextProvider'
import { Loading } from '../../components/ui/Loading'
import useFavoriteGames from '../../utils/useFavoriteGames'
import useFilter from '../../utils/useFilter'

const Home = () => {
  //TODO: Get Games from remote server instead of json
  const { setShow } = useStateContext()
  // const [loading, setLoading] = useState(false)
  const { favoriteGames, isLoading } = useFavoriteGames()

  const { setSearch, setType, filteredList } = useFilter(favoriteGames, categories, 'game_type')

  // Use useState to store the game count
  const count = useMemo(() => filteredList?.length, [filteredList])

  const handleSearch = (search) => {
    setType('')
    setSearch(search)
  }

  const handleCategoriesChange = (event) => {
    setType(event.target.value)
  }

  const handleShow = useCallback((g) => {
    // console.log(g)
    localStorage.setItem('current-selected', JSON.stringify(g))
    setShow(true)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            title={'Favourites'}
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

export default Home
