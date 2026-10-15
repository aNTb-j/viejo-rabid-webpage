import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import AuthenticationContextProvider from './components/shared/auth/AuthenticationContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthenticationContextProvider>
			<App />
		</AuthenticationContextProvider>
  </StrictMode>
)
