// import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Login'
import ResetPassword from './ResetPassword'
import MainContent from './pages/MainContent'
import { AuthProvider } from './Auth'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <MainContent />
          } />
          <Route path="/reset-password" element={
            <ResetPassword/>
          } />
          <Route path="/login" element={
            <Login/>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )

}

export default App
