import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

const Grid = ({ games, handleShow }) => {
  return (
    <>
      {games?.map((game) => (
        <Card key={game.id} onClick={() => handleShow(game)} className="game shadow-sm">
          <Card.Img src={game.poster} alt={game.name} width="180" height="240" />
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
