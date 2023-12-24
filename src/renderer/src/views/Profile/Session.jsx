import { useBoundStore } from '../../components/stores/BoundStore'
import { formatTime } from '../../utils/formatTIme'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function Billing() {
  const { getSessions, sessions } = useBoundStore()

  const columns = [
    {
      field: 'start_time',
      headerName: 'Session Start',
      width: 200,
      flex: true,
      renderCell: (params) => <span>{new Date(params.value).toLocaleString()}</span>
    },
    {
      field: 'end_time',
      headerName: 'Session End',
      width: 200,
      flex: true,

      renderCell: (params) => <span>{new Date(params.value).toLocaleString()}</span>
    },
    { field: 'total_time', headerName: 'Usage', width: 200, flex: true },
    { field: 'session_cost', headerName: 'Paid', width: 200, flex: true }
  ]

  useEffect(() => {
    getSessions()
  }, [])

  return (
    <>
      <div className="card mb-2">
        <div className="card-header">Session History</div>
        <div className="card-body p-0">
          <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid
              rows={sessions}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
