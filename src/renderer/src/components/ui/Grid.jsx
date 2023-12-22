import PropTypes from 'prop-types'
import { useDataStore } from '../stores/DataStore'
import { useEffect } from 'react'
const Grid = ({ games, getData }) => {
  const setCount = useDataStore((state) => state.setCount)
  const setShow = useDataStore((state) => state.setShow)

  const handleSelect = (id) => {
    getData(id).then(() => {
      setShow(true)
    })
  }

  useEffect(() => {
    // Update the count whenever games or the filter changes
    setCount(games?.length)
  }, [])

  return (
    <>
      {games?.map((game) => (
        <div key={game.id} onClick={() => handleSelect(game.id)} className="card game shadow-sm">
          <img
            className="card-img"
            src={game.poster}
            alt={game.name}
            style={{ objectFit: 'cover', aspectRatio: '3 / 4' }}
          />
        </div>
      ))}
    </>
  )
}

Grid.propTypes = {
  games: PropTypes.array,
  handleShow: PropTypes.func,
  getData: PropTypes.func
}

export default Grid
