import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import '@fontsource/marcellus/latin-400.css'
import '@fontsource/albert-sans/latin-400.css'
import '@fontsource/albert-sans/latin-500.css'
import '@fontsource/albert-sans/latin-600.css'
import App from './App'
import './index.css'

// VITE_MEMORY_ROUTER=true builds a single-file preview that does not depend on server routing.
const Router = import.meta.env.VITE_MEMORY_ROUTER === 'true' ? MemoryRouter : BrowserRouter

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
