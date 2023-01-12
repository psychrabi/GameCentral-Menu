import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './assets/index.css'
import { Loading } from './components/ui/Loading'
import { ContextProvider } from './components/contexts/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </ContextProvider>
)
