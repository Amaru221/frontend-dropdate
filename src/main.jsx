import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="776070009407-c3herb6a4rjkrjp8no1diubcopj04tl9.apps.googleusercontent.com">

    <AuthProvider>
      <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
