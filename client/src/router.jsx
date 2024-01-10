import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from 'pages/ErrorPage'
import RootLayout from 'layouts/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: false,
      },
    ],
  },
])

export default router
