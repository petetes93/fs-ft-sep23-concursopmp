import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import '@fontsource/anton'

const theme = createTheme({
  palette: {
    primary: {
      main: '#073b4c',
    },
    secondary: {
      main: '#118ab2',
    },
    error: {
      main: '#ef476f',
    },
    warning: {
      main: '#ffd166',
    },
    success: {
      main: '#06d6a0',
    },
  },

  typography: {
    fontFamily: 'Barlow, sans-serif',
    h2: {
      fontSize: '2.5rem',
    },
  },
})

const ThemeProvider = ({ children }) => (
  <MUIThemeProvider theme={theme}>
    <CssBaseline />
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://www.hdwallpapers.in/download/blue_mixed_paint_aesthetic_background_4k_hd_blue_aesthetic-HD.jpg")',
          backgroundColor:'#95d5b2',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(30px)',
        }}
      ></div>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  </MUIThemeProvider>
);


export default ThemeProvider

// Enlaces para fondos
//https://images.pexels.com/photos/10458835/pexels-photo-10458835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
//https://www.hdwallpapers.in/download/blue_mixed_paint_aesthetic_background_4k_hd_blue_aesthetic-HD.jpg
//https://images6.alphacoders.com/133/1333587.jpg
//https://images.alphacoders.com/133/1338593.png
//https://images5.alphacoders.com/133/1330526.png