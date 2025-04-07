import { useState, useEffect } from "react";

import { supabase } from "./supabaseClient";
import AuthContext from "./contexts";

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [sessionEvent, setSessionEvent] = useState(null);

  useEffect(() => {

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_IN') {
        setSession(session)
        setSessionEvent(null)
        // navigate('/')
      }
      if (_event === 'SIGNED_OUT') {
        setSession(null)
        setSessionEvent(null)
        // navigate('/login')
      }
      if (_event === 'PASSWORD_RECOVERY') {
        setSession(null)
        setSessionEvent(_event)
        // navigate('/reset-password')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  console.log(session)

  return (
    <AuthContext.Provider value={{ session, sessionEvent }}>
      {children}
    </AuthContext.Provider>
  );
};
