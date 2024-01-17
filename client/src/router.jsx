import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/ErrorPage'
import RootLayout from 'layouts/RootLayout'
import ProductsPage from './pages/ProductsPage'
import ContestPage from './pages/ContestPage'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
// import AdminPage from "./pages/AdminPage";
import AdminUserPage from './pages/AdminUserPage'
import DetailsPage from './pages/DetailPage'
import LoginAdmin from './pages/AdminLogin'
import ConcursoForm from './pages/CrearConcurso/crearconcurso'
import EditarConcurso from './pages/EditarConcurso/EditarConcurso'

import AddDesignPage from 'pages/AddDesignPage'
import AdminContestPage from './pages/AdminContestPage'
import ProtectedRoute from './utils/ProtectedRoute'
import LogoutPage from './pages/LogoutPage'
import Dashboard from './pages/Dashboard'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ContestPage />,
      },
      {
        path: '/contest/:contestId',
        element: <ProductsPage />,
      },
      {
        path: '/product/add_desing/:contestId',
        element: <AddDesignPage />,
      },
      {
        path: '/login',
        // element: <ProtectedRoute page={LoginPage} role='anonymous' />,
        element: <LoginPage />,
      },
      {
        path: '/register',
        // element: <ProtectedRoute page={RegisterPage} role='anonymous' />,
        element: <RegisterPage />,
      },
      // {
      //   path: "/admin",
      //   // element: <ProtectedRoute page={RegisterPage} role='anonymous' />,
      //   element: <AdminPage />,
      // },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },

      {
        path: '/adminuser',
        // element: <ProtectedRoute page={RegisterPage} role='anonymous' />,
        element: <AdminUserPage />,
      },
      {
        path: '/admincontest',
        // element: <ProtectedRoute page={RegisterPage} role='anonymous' />,
        element: <AdminContestPage />,
      },
      {
        path: '/design/:designId',
        element: <DetailsPage />,
      },
      {
        path: '/admin',
        element: <LoginAdmin />,
      },
      {
        path: '/createcontest',
        element: <ConcursoForm />,
      },
      {
        path: '/editcontest/:contestId',
        element: <EditarConcurso />,
      },
      {
        path: '/logout',
        element: <LogoutPage />,
      },
    ],
  },
])

export default router
