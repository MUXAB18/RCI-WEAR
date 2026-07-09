import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// No StrictMode in production — avoids double renders/effects that skew FCP
createRoot(document.getElementById('root')).render(<App />)
