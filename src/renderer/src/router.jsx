import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const MemberLogin = lazy(() => import('./views/Auth/MemberLogin'))
const Register = lazy(() => import('./views/Auth/Register'))
const AdminLogin = lazy(() => import('./views/Auth/AdminLogin'))
const ResetPassword = lazy(() => import('./views/Auth/ResetPassword'))
const MemberLayout = lazy(() => import('./components/MemberLayout'))
const AuthLayout = lazy(() => import('./components/AuthLayout'))
const ProfileLayout = lazy(() => import('./components/ProfileLayout'))
const Home = lazy(() => import('./views/Home/Home'))
const Games = lazy(() => import('./views/Games/Games'))
const Applications = lazy(() => import('./views/Applications/Applications'))
const Shop = lazy(() => import('./views/Shop/Shop'))
const Profile = lazy(() => import('./views/Profile/Profile'))
const Notification = lazy(() => import('./views/Profile/Notification'))
const Security = lazy(() => import('./views/Profile/Security'))
const Billing = lazy(() => import('./views/Profile/Billing'))

const router = createBrowserRouter([
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
            path: 'details',
            element: <Profile />
          },
          {
            path: 'security',
            element: <Security />
          },
          {
            path: 'billing',
            element: <Billing />
          },
          {
            path: 'notification',
            element: <Notification />
          }
        ]
      }
    ]
    // errorElement: <NotFound />
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/admin',
        element: <AdminLogin />
      },
      {
        path: '/login',
        element: <MemberLogin />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forgot-password',
        element: <ResetPassword />
      }
    ]
  }
])

export default router
