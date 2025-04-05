import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Box, Paper, Fab } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout';

import MainContent from './components/MainContent'


const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

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

  console.log('session', session)

  if (!session) {
    return (

      <ThemeProvider theme={theme}>

        <CssBaseline />

        <Box sx={{
          height: "100vh",
          width: "100vw",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'text.primary',
          backgroundColor: '#FFCDD2',
        }}>
          <Paper elevation={3} sx={{
            padding: 10,
            minHeight: '50%',
            minWidth: '50%',
            objectFit: 'contain',
          }}>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme='default' providers={[]} />
          </Paper>
        </Box>

      </ThemeProvider>
    )
  }

  else if (session_event === 'PASSWORD_RECOVERY') {
    return (

      <ThemeProvider theme={theme}>

        <CssBaseline />

        <Box sx={{
          height: "100vh",
          width: "100vw",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'text.primary',
          backgroundColor: '#FFCDD2',
        }}>
          <Paper elevation={3} sx={{
            padding: 10,
            minHeight: '50%',
            minWidth: '50%',
            objectFit: 'contain',
          }}>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme='default'
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

        <Box sx={{
          height: "100vh",
          width: "100vw",
          display: 'flex',
        }}>
          <Box sx={{
            padding: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'text.primary',
            backgroundColor: '#FFCDD2',
          }}>
            <MainContent />
          </Box>
          <Fab color="secondary" aria-label="out" onClick={() => supabase.auth.signOut()}
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}>
            <LogoutIcon />
          </Fab>
        </Box>

      </ThemeProvider>
    )
  }
}

export default App
