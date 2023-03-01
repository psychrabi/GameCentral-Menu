import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { useDataStore } from '../stores/DataStore'

const Grid = ({ games }) => {
  const setShow = useDataStore((state) => state.setShow)
  const getGame = useDataStore((state) => state.getGame)

  const handleSelect = (id) => {
    getGame(id)
    setShow(true)
  }

  return (
    <>
      {games?.map((game) => (
        <Card key={game.id} onClick={() => handleSelect(game.id)} className="game shadow-sm">
          <Card.Img src={game.poster} alt={game.name} style={{ objectFit: 'cover' }} />
        </Card>
      ))}
    </>
  )
}

Grid.propTypes = {
  games: PropTypes.array,
  handleShow: PropTypes.func
}

export default Grid
