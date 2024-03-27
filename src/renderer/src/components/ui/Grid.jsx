import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useBoundStore } from '../stores/BoundStore'

const Grid = React.memo(({ games, getData }) => {
  const setCount = useBoundStore((state) => state.setCount)
  const setShow = useBoundStore((state) => state.setShow)

  useEffect(() => {
    // Update the count whenever games change
    setCount(games?.length)
  }, [games])

  const handleSelect = useCallback((id) => {
    getData(id)
    setShow(true)

  }, [getData, setShow])

  return (
    <>
      {games?.map((game) => (
        <div key={game.id} onClick={() => handleSelect(game.id)} className="card game shadow-sm">
          <LazyLoadImage
            className="card-img"
            src={game.poster}
            alt={game.name}
            effect="blur"
            style={{ objectFit: 'cover', aspectRatio: '3 / 4' }}
          />
        </div>
      ))}
    </>
  )
})

Grid.propTypes = {
  games: PropTypes.array,
  handleShow: PropTypes.func,
  getData: PropTypes.func
}

export default Grid
