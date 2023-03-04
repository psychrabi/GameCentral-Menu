import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { useDataStore } from '../stores/DataStore'

const Grid = ({ games, getData }) => {
  const setShow = useDataStore((state) => state.setShow)

  const handleSelect = (id) => {
    getData(id)
    setShow(true)
  }

  return (
    <>
      {games?.map((game) => (
        <Card key={game.id} onClick={() => handleSelect(game.id)} className="game shadow-sm">
          <img
            className="card-img"
            src={game.poster}
            alt={game.name}
            style={{ objectFit: 'cover', aspectRatio: '3 / 4' }}
            loading="lazy"
          // height={'240'}
          // width={'160'}
          />
        </Card>
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
