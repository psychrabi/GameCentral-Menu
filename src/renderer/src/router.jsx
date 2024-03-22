import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const loadLazy = path => lazy(() => import(`${path}`));

// Lazy imports
const MemberLogin = loadLazy('./views/Auth/MemberLogin');
const Register = loadLazy('./views/Auth/Register');
const AdminLogin = loadLazy('./views/Auth/AdminLogin');
const ResetPassword = loadLazy('./views/Auth/ResetPassword');
const MemberLayout = loadLazy('./components/MemberLayout');
const AuthLayout = loadLazy('./components/AuthLayout');
const ProfileLayout = loadLazy('./components/ProfileLayout');
const Home = loadLazy('./views/Home/Home');
const Games = loadLazy('./views/Games/Games');
const Applications = loadLazy('./views/Applications/Applications');
const Shop = loadLazy('./views/Shop/Shop');
const Details = loadLazy('./views/Profile/Details');
const Security = loadLazy('./views/Profile/Security');
const Session = loadLazy('./views/Profile/Session');
const NotFound = loadLazy('./views/NotFound');

// Routes
const memberProfileRoutes = [
  { path: 'details', element: <Details /> },
  { path: 'security', element: <Security /> },
  { path: 'sessions', element: <Session /> }
];

const memberRoutes = [
  { index: true, element: <Home /> },
  { path: 'games', element: <Games /> },
  { path: 'applications', element: <Applications /> },
  { path: 'shop', element: <Shop /> },
  { path: 'profile', element: <ProfileLayout />, children: memberProfileRoutes },
  { path: 'logout', element: undefined }
];

const authRoutes = [
  { path: 'admin', element: <AdminLogin /> },
  { path: 'login', element: <MemberLogin /> },
  { path: 'register', element: <Register /> },
  { path: 'forgot-password', element: <ResetPassword /> }
];

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
]);

export default router;

