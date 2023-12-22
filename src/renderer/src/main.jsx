import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './assets/index.css'
import { Loading } from './components/ui/Loading'
import Notification from './context/Notification'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Notification>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Notification>
  </React.StrictMode>
)
