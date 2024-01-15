import { Outlet } from 'react-router-dom'

import { Footer } from 'components'

import { Navbar } from 'components'
import { Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'

function RootLayout() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Container
        display="flex"
        flexDirection="column"
        maxWidth="xxl"
        disableGutters
        style={{ flex: 1 }}
      >
        <Navbar />
        <Container disableGutters maxWidth="100vh">
          <Outlet />
        </Container>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>

      <Footer />
    </div>
  )
}

export default RootLayout
