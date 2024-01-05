import { useBoundStore } from '../../components/stores/BoundStore'
import { formatTime } from '../../utils/formatTIme'
import { formatCurrency } from '../../utils/formatCurrency'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function Billing() {
  const { sessions } = useBoundStore()

  const columns = [
    {
      field: 'start_time',
      headerName: 'Session Start',
      flex: true,
      renderCell: (params) => <span>{new Date(params.value).toLocaleString()}</span>
    },
    {
      field: 'end_time',
      headerName: 'Session End',
      flex: true,
      renderCell: (params) =>
        params.value ? (
          <span>{new Date(params.value).toLocaleString()}</span>
        ) : (
          <span className="badge text-bg-success">On going</span>
        )
    },
    {
      field: 'total_time',
      headerName: 'Usage',
      flex: true,
      renderCell: (params) =>
        params.value ? (
          <span>{formatTime(params.value)}</span>
        ) : (
          <span className="badge text-bg-success">On going</span>
        )
    },
    {
      field: 'session_cost',
      headerName: 'Paid',
      flex: true,
      renderCell: (params) =>
        params.value ? (
          <span>{formatCurrency(params.value)}</span>
        ) : (
          <span className="badge text-bg-success">On going</span>
        )
    }
  ]

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={sessions ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8
              }
            }
          }}
          pageSizeOptions={[8]}
        />
      </div>
    </>
  )
}
