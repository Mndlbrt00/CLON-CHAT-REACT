import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import ContactContextProvider from './contexts/ContactContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContactContextProvider>
      <App />
    </ContactContextProvider>
  </BrowserRouter>
)
