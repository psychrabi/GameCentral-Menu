import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Cart from './views/Cart/Cart'
import Notification from './views/Profile/Notification'

// Lazy imports
const MemberLogin = lazy(() => import('./views/Auth/MemberLogin'))
const Register = lazy(() => import('./views/Auth/Register'))
const AdminLogin = lazy(() => import('./views/Auth/AdminLogin'))

const MemberLayout = lazy(() => import('./components/layouts/MemberLayout'))
const AuthLayout = lazy(() => import('./components/layouts/AuthLayout'))
const ProfileLayout = lazy(() => import('./components/layouts/ProfileLayout'))
const Home = lazy(() => import('./views/Home/Home'))
const Games = lazy(() => import('./views/Games/Games'))
const Applications = lazy(() => import('./views/Applications/Applications'))
const Shop = lazy(() => import('./views/Shop/Shop'))
const Details = lazy(() => import('./views/Profile/Details'))
const Security = lazy(() => import('./views/Profile/Security'))
const Session = lazy(() => import('./views/Profile/Session'))
const NotFound = lazy(() => import('./views/NotFound'))

// Routes
const memberProfileRoutes = [
  { path: 'details', element: <Details /> },
  { path: 'security', element: <Security /> },
  { path: 'sessions', element: <Session /> },
  { path: 'notifications', element: <Notification /> }
]

const memberRoutes = [
  { path: 'home', element: <Home /> },
  { path: 'games', element: <Games /> },
  { path: 'applications', element: <Applications /> },
  { path: 'shop', element: <Shop /> },
  { path: 'cart', element: <Cart /> },
  { path: 'profile', element: <ProfileLayout />, children: memberProfileRoutes },
  { path: 'logout', element: undefined }
]

const authRoutes = [
  { path: 'admin', element: <AdminLogin /> },
  { path: 'login', element: <MemberLogin /> },
  { path: 'register', element: <Register /> }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <MemberLayout />,
    children: memberRoutes,
    errorElement: <NotFound />
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: authRoutes,
    errorElement: <NotFound />
  }
])

export default router
