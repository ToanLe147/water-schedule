import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Box, Paper, Typography } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { supabase } from './supabaseClient'
import { AppContainerStyle, authCardWidth, theme } from './styles'
import AuthContext from './contexts'


export default function ResetPassword() {

  const {session, _} = useContext(AuthContext)
  const navigate = useNavigate()

  if (session) {
    // If the user is already logged in, redirect to the main page
    navigate('/')
  }
  else {
    // If the user is not logged in, redirect to the login page
    navigate('/login')
  }

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Box sx={AppContainerStyle}>
        <Paper elevation={3} sx={{
          padding: 10,
          minWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          objectFit: 'contain',
        }}>
          <LockResetIcon fontSize='large' />
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 'bold',
          }}>
            Reset Password
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
            view='update_password'
          />
        </Paper>
      </Box>

    </ThemeProvider>
  )
}

