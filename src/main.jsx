import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* RouterProvider : pembungkus element untuk memunculka elemn sesuai path yang diminta, router= : memberikan daftar routing yg ada di routes/index.jsx*/}
    <RouterProvider router={router} />
  </StrictMode>,
)
