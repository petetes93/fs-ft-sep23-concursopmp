import { Outlet } from 'react-router-dom'

import { Container } from '@mui/material'
import { Footer } from 'components'

// import { Navbar } from 'components'
import { ToastContainer } from 'react-toastify'
function RootLayout() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      maxWidth="xxl"
      disableGutters
    >
      <Container
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        maxWidth="xl"
        sx={{ mt: 5 }}
      >
        <Outlet />
      </Container>

      <Footer />

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
  )
}
export default RootLayout
