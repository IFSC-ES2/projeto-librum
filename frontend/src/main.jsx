import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/fraunces/400.css'
import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/700.css'
import '@fontsource/mulish/400.css'
import '@fontsource/mulish/600.css'
import '@fontsource/mulish/700.css'
import '@fontsource/spectral/400.css'
import '@fontsource/spectral/500.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
