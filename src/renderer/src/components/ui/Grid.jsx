import { Card } from 'react-bootstrap'

const Grid = ({ games, handleShow }) => {
  return (
    <>
      {games?.map((game) => (
        <Card key={game.id} onClick={() => handleShow(game)} className="game">
          <Card.Img src={game.poster} alt={game.name} />
        </Card>
      ))}
    </>
  )
}

export default Grid
