import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useBoundStore } from '../stores/BoundStore'
const Grid = ({ games, getData }) => {
  const setCount = useBoundStore((state) => state.setCount)
  const setShow = useBoundStore((state) => state.setShow)

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
