import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from './context/ErrorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </BrowserRouter>
  </StrictMode>
);

