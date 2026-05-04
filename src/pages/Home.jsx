import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Video from '../components/home/Video'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottomText from '../components/home/HomeBottomText'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  useEffect(() => {
    // Force ScrollTrigger to recalculate after component mounts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="text-white">

      {/* ── HERO — full screen with video bg ── */}
      <div className="relative h-screen overflow-hidden">

        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <Video />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Hero text */}
        <div className="relative z-20 h-full flex flex-col justify-center">
          <HomeHeroText />
        </div>

      </div>

      {/* ── SCROLL CONTENT — quotes, places, footer ── */}
      <HomeBottomText />

    </div>
  )
}

export default Home