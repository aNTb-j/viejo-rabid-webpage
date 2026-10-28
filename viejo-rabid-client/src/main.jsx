import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import { ToastContainer } from 'react-toastify'

import ThemeContextProvider from './components/services/theme/ThemeContextProvider.jsx'
import AuthenticationContextProvider from './components/shared/auth/AuthenticationContextProvider.jsx'

import './styles/style.module.scss'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeContextProvider>
			<AuthenticationContextProvider>
				<App />
				<ToastContainer />
			</AuthenticationContextProvider>
		</ThemeContextProvider>
	</StrictMode>
)
