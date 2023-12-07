import { useEffect, useState } from 'react'
import axiosClient from '../../lib/axios-client'

export default function Billing({ member }) {
  const [sessions, setSessions] = useState([])

  const sum = sessions.reduce((prev, curr) => prev + curr.session_cost, 0)
  useEffect(() => {
    axiosClient.get('/sessions').then((response) => {
      setSessions(response.data)
    })
  }, [])
  return (
    <>
      {/* <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card h-100 border-start-lg border-start-primary">
            <div className="card-body">
              <div className="small text-muted">Balance</div>
              <div className="h3">$20.00</div>
              <a className="text-arrow-icon small" href="#!">
                Switch to yearly billing
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-right"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100 border-start-lg border-start-secondary">
            <div className="card-body">
              <div className="small text-muted">Next payment due</div>
              <div className="h3">July 15</div>
              <a className="text-arrow-icon small text-secondary" href="#!">
                View payment history
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-right"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100 border-start-lg border-start-success">
            <div className="card-body">
              <div className="small text-muted">Current plan</div>
              <div className="h3 d-flex align-items-center">Freelancer</div>
              <a className="text-arrow-icon small text-success" href="#!">
                Upgrade plan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-right"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div> */}
      <div className="card mb-4">
        <div className="card-header">Billing History</div>
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
                    <td>{session.total_time % 60} minutes</td>
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
