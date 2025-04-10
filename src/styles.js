import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f48fb1',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  shape: {
    borderRadius: 12,
  },
})

export const authCardWidth = window.innerWidth < 600 ? '100%' : '400px'

export const AppContainerStyle = {
  height: "100dvh",
  width: "100dvw",
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'text.primary',
  backgroundColor: '#FFCDD2',
  backgroundImage: 'radial-gradient(circle, #FFCDD2 0%, #000 100%)',
}
