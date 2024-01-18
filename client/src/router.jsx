import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/ErrorPage'
import RootLayout from 'layouts/RootLayout'
import DesignsPage from './pages/DesignsPage'
import ContestPage from './pages/ContestPage'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
// import AdminPage from "./pages/AdminPage";
import AdminUserPage from './pages/AdminUserPage'
import DetailsPage from './pages/DetailPage'
import LoginAdmin from './pages/AdminLogin'
import CreateContestPage from './pages/CreateContestPage'
import AdminEditContest from './pages/AdminEditContestPage'
import AddDesignPage from 'pages/AddDesignPage'
import AdminDesignPage from './pages/AdminDesignPage'
import AdminContestPage from './pages/AdminContestPage'
import ProtectedRoute from './utils/ProtectedRoute'
import LogoutPage from './pages/LogoutPage'
import Dashboard from './pages/Dashboard'
import AdminDetailPage from './pages/AdminDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute page={ContestPage} role="anonymous" />,
      },
      {
        path: '/login',
        element: <ProtectedRoute page={LoginPage} role="anonymous" />,
      },
      {
        path: '/register',
        element: <ProtectedRoute page={RegisterPage} role="anonymous" />,
      },
      {
        path: '/contest/:contestId',
        element: <ProtectedRoute page={DesignsPage} role="anonymous" />,
      },
      {
        path: '/design/:designId',
        element: <ProtectedRoute page={DetailsPage} role="anonymous" />,
      },
      {
        path: '/design/add_design/:contestId',
        element: <ProtectedRoute page={AddDesignPage} role="anonymous" />,
      },
      {
        path: '/admin',
        element: <ProtectedRoute page={LoginAdmin} role="anonymous" />,
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute page={Dashboard} role="admin" />,
      },

      {
        path: '/adminuser',
        element: <ProtectedRoute page={AdminUserPage} role="admin" />,
      },
      {
        path: '/admincontest',
        element: <ProtectedRoute page={AdminContestPage} role="admin" />,
      },
      {
        path: '/admindesigns/:contestId',
        element: <ProtectedRoute page={AdminDesignPage} role="admin" />,
      },
      {
        path: '/admindesign/:designId',
        element: <ProtectedRoute page={AdminDetailPage} role="admin" />,
      },
      {
        path: '/createcontest',
        element: <ProtectedRoute page={CreateContestPage} role="admin" />,
      },
      {
        path: '/editcontest/:contestId',
        element: <ProtectedRoute page={AdminEditContest} role="admin" />,
      },
      {
        path: '/logout',
        element: <ProtectedRoute page={LogoutPage} role="anonymous" />,
      },
    ],
  },
])

export default router
