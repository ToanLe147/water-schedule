import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Box, Paper, Fab, Typography } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';

import MainContent from './components/MainContent'
import waterMeLogo from '/water-drop.svg'
import { supabase } from './supabaseClient'


const AppContainerStyle = {
  height: "100dvh",
  width: "100dvw",
  display: 'flex',
  // flexWrap: 'wrap',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'text.primary',
  backgroundColor: '#FFCDD2',
  backgroundImage: 'radial-gradient(circle, #FFCDD2 0%, #000 100%)',
}

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

  const [session, setSession] = useState(null)
  const [session_event, setSessionEvent] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_IN') {
        setSession(session)
        setSessionEvent(null)
      }
      if (_event === 'SIGNED_OUT') {
        setSession(null)
        setSessionEvent(null)
      }
      if (_event === 'PASSWORD_RECOVERY') {
        setSession(null)
        setSessionEvent(_event)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loginWidth = window.innerWidth < 600 ? '100%' : '400px'

  if (!session) {

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
                    minWidth: loginWidth,
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

  else if (session_event === 'PASSWORD_RECOVERY') {
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
                    minWidth: loginWidth,
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

  else {

    return (
      <ThemeProvider theme={theme}>

        <CssBaseline />

        <Box sx={AppContainerStyle}>
          <Box sx={{
            maxWidth: '100%',
            }}>
            <MainContent />
            <Fab color="secondary" aria-label="out" onClick={() => supabase.auth.signOut()}
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                zIndex: 100,
                willChange: 'filter',
                transition: 'filter 300ms',
                ':hover': {
                  filter: 'drop-shadow(0 0 0.75rem #fff)',
                },
              }}>
              <LogoutIcon />
            </Fab>
          </Box>
        </Box>

      </ThemeProvider>
    )
  }
}

export default App
