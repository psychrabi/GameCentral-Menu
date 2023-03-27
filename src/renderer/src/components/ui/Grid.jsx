import PropTypes from 'prop-types'
import { useDataStore } from '../stores/DataStore'
const Grid = ({ games, getData }) => {
  const setShow = useDataStore((state) => state.setShow)

  const handleSelect = (id) => {
    getData(id).then(() => {
      setShow(true)
    })
  }

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
