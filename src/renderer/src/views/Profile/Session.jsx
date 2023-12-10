import { useEffect, useState } from 'react'
import axiosClient from '../../lib/axios-client'
import { formatTime } from '../../utils/formatTIme'
export default function Billing() {
  const [sessions, setSessions] = useState([])

  // const sum = sessions.reduce((prev, curr) => prev + curr.session_cost, 0)
  useEffect(() => {
    axiosClient.get('/sessions').then((response) => {
      setSessions(response.data)
    })
  }, [])
  return (
    <>
      <div className="card mb-4">
        <div className="card-header">Session History</div>
        <div className="card-body p-0">
          <div className="table-responsive table-billing-history">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th className="border-gray-200" scope="col">
                    Session Start
                  </th>
                  <th className="border-gray-200" scope="col">
                    Session End
                  </th>
                  <th className="border-gray-200" scope="col">
                    Usage
                  </th>
                  <th className="border-gray-200" scope="col">
                    Paid
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions?.map((session) => (
                  <tr key={session.id}>
                    <td>{new Date(session.start_time).toLocaleString()}</td>
                    <td>
                      {session.end_time ? new Date(session.end_time).toLocaleString() : 'On-going'}
                    </td>
                    <td>{formatTime(session.total_time)}</td>
                    <td>$ {session.session_cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
