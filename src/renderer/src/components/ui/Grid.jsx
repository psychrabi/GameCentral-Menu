import PropTypes from 'prop-types'
import { useDataStore } from '../stores/DataStore'
import { motion } from 'framer-motion'
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
        <motion.div
          layout
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          key={game.id}
          onClick={() => handleSelect(game.id)}
          className="card game shadow-sm"
        >
          <img
            className="card-img"
            src={game.poster}
            alt={game.name}
            style={{ objectFit: 'cover', aspectRatio: '3 / 4' }}
          // height={'240'}
          // width={'160'}
          />
        </motion.div>
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
