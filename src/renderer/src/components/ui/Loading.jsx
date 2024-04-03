import { CircularProgress } from '@mui/material'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 position-absolute top-0 start-0">
      <CircularProgress size={100} />
    </div>
  )
}

export default Loading
