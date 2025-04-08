// import { useContext, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Box, Paper, Typography } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import LockResetIcon from '@mui/icons-material/LockReset';

import { supabase } from './supabaseClient'
import { AppContainerStyle, authCardWidth, theme } from './styles'


export default function ResetPassword() {

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

