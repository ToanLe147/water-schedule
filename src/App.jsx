import { useState } from 'react'
import { Box } from '@mui/material'

import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import PlantCard from './components/PlantCard'


function App() {
  const theme = createTheme({
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

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Box sx={{
        height: "100vh",
        width: "100vw",
        display: 'flex',
      }}>
        <PlantCard />
        <PlantCard />

      </Box>

    </ThemeProvider>
  )
}

export default App
