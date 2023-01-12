import { createHashRouter } from 'react-router-dom'
import { lazy } from 'react'

// Client side components

const Login = lazy(() => import('./views/Auth/Login'))
const MemberLayout = lazy(() => import('./components/MemberLayout'))
const Home = lazy(() => import('./views/Member/Home/Home'))
const Games = lazy(() => import('./views/Member/Games/Games'))
const Applications = lazy(() => import('./views/Member/Applications/Applications'))
const Shop = lazy(() => import('./views/Member/Shop/Shop'))
const Profile = lazy(() => import('./views/Member/Profile/Profile'))
const NotFound = lazy(() => import('./views/NotFound'))

const router = createHashRouter([
  {
    path: '/',
    element: <MemberLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/games',
        element: <Games />
      },
      {
        path: '/applications',
        element: <Applications />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ],
    errorElement: <NotFound />
  },
  {
    exact: true,
    path: '/',
    element: <Login />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ],
    errorElement: <NotFound />
  }
])

export default router
