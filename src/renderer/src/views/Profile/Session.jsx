import { useBoundStore } from '../../components/stores/BoundStore'
import { formatTime } from '../../utils/formatTime'
import { formatCurrency } from '../../utils/formatCurrency'
import { DataGrid } from '@mui/x-data-grid'

export default function Billing() {
  const member = useBoundStore((state) => state.member)

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
      renderCell: (params) => <span>{params.value ? formatTime(params.value) : '---'}</span>
    },
    {
      field: 'session_cost',
      headerName: 'Paid',
      flex: true,
      renderCell: (params) => <span>{params.value ? formatCurrency(params.value) : '---'}</span>
    }
  ]

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={member.sessions ?? []}
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
