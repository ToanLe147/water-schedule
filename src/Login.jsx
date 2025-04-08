// import { useContext, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Box, Paper, Typography } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import waterMeLogo from '/water-drop.svg'
import { supabase } from './supabaseClient'
import { AppContainerStyle, authCardWidth, theme } from './styles'


export default function Login() {

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Box sx={AppContainerStyle}>
        <Paper elevation={3} sx={{
          padding: 10,
          minWidth: '50%',
          display: 'flex',
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          objectFit: 'contain',
        }}>
          <Box component="img" src={waterMeLogo} sx={{
            height: 100,
            width: 100,
            willChange: 'filter',
            transition: 'filter 300ms',
            objectFit: 'contain',
            ':hover, :active': {
              filter: 'drop-shadow(0 0 0.75rem #81C784)',
            },
          }} />
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 'bold',
          }}>
            Water Me
          </Typography>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  backgroundColor: '#f48fb1',
                  color: '#000',
                },
                input: {
                  backgroundColor: '#fff',
                  color: '#000',
                },
                container: {
                  minWidth: authCardWidth,
                },
              }
            }}
            theme='dark'
            providers={[]}
          />
        </Paper>
      </Box>

    </ThemeProvider>
  )
}

