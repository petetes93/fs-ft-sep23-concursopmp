import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/ErrorPage'
import RootLayout from 'layouts/RootLayout'
import ProductsPage from './pages/ProductsPage'
import ContestPage from './pages/ContestPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
       {
         path: '/',
         element: <ContestPage/>
       },
      {
        path: '/product',
        element: <ProductsPage/>,
      },
    ],
  },
])

export default router
