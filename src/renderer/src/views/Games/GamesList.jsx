import { useGamesStore } from '../../components/stores/GamesStore'
import { useEffect } from 'react'
import { Loading } from '../../components/ui/Loading'
import Details from '../../components/ui/Details'
import Grid from '../../components/ui/Grid'
import categories from '../../data/GameTypes.json'
import Header from '../../components/ui/Header'

export const GamesList = () => {
  const getGames = useGamesStore((state) => state.fetchGames)
  const gamesList = useGamesStore((state) => state.games)
  const loading = useGamesStore((state) => state.loading)
  const error = useGamesStore((state) => state.error)
  const filter = useGamesStore((state) => state.filter)
  const show = useGamesStore((state) => state.show)
  const type = useGamesStore((state) => state.type)

  useEffect(() => {
    getGames()
  }, [getGames])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>Cannot read data</p>
  }

  return (
    <>
      {/* <FilterInput /> */}
      {show && <Details />}
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

// const FilterInput = () => {
//   const filter = useGamesStore((state) => state.filter)
//   const setFilter = useGamesStore((state) => state.setFilter)
//   return (
//     <form
//       className="col-auto col-lg-auto mb-2 mb-lg-0 me-lg-auto"
//       role="search"
//       onSubmit={(ev) => ev.preventDefault()}
//     >
//       <label htmlFor="search" className="visually-hidden">
//         Search
//       </label>
//       <input
//         type="search"
//         className="form-control"
//         placeholder="Search..."
//         name="search"
//         id="search"
//         aria-label="Search"
//         value={filter}
//         onChange={(event) => setFilter(event.target.value)}
//       />
//     </form>
//   )
// }
