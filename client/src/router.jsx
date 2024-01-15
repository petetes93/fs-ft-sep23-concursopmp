import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/ErrorPage'
import RootLayout from 'layouts/RootLayout'
import ProductsPage from './pages/ProductsPage'
import ContestPage from './pages/ContestPage'
import LoginPage from 'pages/LoginPage'
import RegisterPage from 'pages/RegisterPage'
import AddDesingPage from 'pages/AddDesingPage'

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
        path: '/product',
        element: <ProductsPage />,
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
      {
        path: '/product/add_desing',
        element: <AddDesingPage />,
      },
    ],
  },
])

export default router
