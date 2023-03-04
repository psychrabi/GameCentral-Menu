import { createHashRouter } from 'react-router-dom'
import { lazy } from 'react'

// Client side components

const NewLogin = lazy(() => import('./views/Auth/NewLogin'))
const MemberLayout = lazy(() => import('./components/MemberLayout'))
const ProfileLayout = lazy(() => import('./components/ProfileLayout'))
const Home = lazy(() => import('./views/Home/Home'))
const Games = lazy(() => import('./views/Games/Games'))
const Applications = lazy(() => import('./views/Applications/Applications'))
const Shop = lazy(() => import('./views/Shop/Shop'))
const Profile = lazy(() => import('./views/Profile/Profile'))
const Notification = lazy(() => import('./views/Profile/Notification'))
const Security = lazy(() => import('./views/Profile/Security'))
const Billing = lazy(() => import('./views/Profile/Billing'))

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
        element: <ProfileLayout />,
        children: [
          {
            path: '/profile/profile',
            element: <Profile />
          },
          {
            path: '/profile/security',
            element: <Security />
          },
          {
            path: '/profile/billing',
            element: <Billing />
          },
          {
            path: '/profile/notification',
            element: <Notification />
          }
        ]
      }
    ]
    // errorElement: <NotFound />
  },
  {
    exact: true,
    path: '/',
    element: <NewLogin />,
    children: [
      {
        path: '/login',
        element: <NewLogin />
      }
    ]
    // errorElement: <NotFound />
  }
])

export default router
