import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import App from './App.jsx'
import './index.css'
import Stairs from './components/common/Stairs.jsx'
import NavContext from './context/NavContext.jsx'

import './index.css'

// ── Register all GSAP plugins once globally
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin)

// ── GSAP global defaults for buttery smooth animations
gsap.defaults({
  ease: 'power3.out',
  duration: 0.9,
})

// ── ScrollTrigger global config
ScrollTrigger.config({
  ignoreMobileResize: true,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavContext>
        <Stairs>
          <App />
        </Stairs>
      </NavContext>
    </BrowserRouter>
  </React.StrictMode>,
)