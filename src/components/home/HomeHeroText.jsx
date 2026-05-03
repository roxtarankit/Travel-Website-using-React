import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import Video from './Video'

const HomeHeroText = () => {
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Lines drop in staggered
    tl.from('.hero-line', {
      yPercent: 110,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power4.out',
    })

    // Badge fades in
    tl.from('.hero-badge', {
      opacity: 0,
      y: 12,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.4')

    // Buttons pop in
    tl.from('.hero-btn', {
      opacity: 0,
      y: 20,
      scale: 0.92,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.4)',
    }, '-=0.3')

    // Scroll indicator
    tl.from('.scroll-hint', {
      opacity: 0,
      duration: 0.8,
    }, '-=0.2')

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-full px-4 text-center">

      {/* ── Top badge ── */}
      <div className="hero-badge mb-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#D3FD50] animate-pulse" />
        <span className="text-white/50 text-[10px] uppercase tracking-[0.4em] font-light">
          Premium Travel Experiences · India
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#D3FD50] animate-pulse" />
      </div>

      {/* ── Hero lines ── */}
      <div className="font-[font1] uppercase leading-none">

        <div className="overflow-hidden">
          <div
            className="hero-line text-[13vw] lg:text-[9.5vw] leading-[0.9] tracking-tight"
          >
            For Those
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="hero-line flex items-center justify-center gap-[2vw] text-[13vw] lg:text-[9.5vw] leading-[0.9] tracking-tight"
          >
            <span>Who</span>
            {/* Video pill */}
            <div className="h-[7vw] w-[16vw] rounded-full overflow-hidden opacity-90 border border-white/20">
              <Video />
            </div>
            <span>Travel</span>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="hero-line text-[13vw] lg:text-[9.5vw] leading-[0.9] tracking-tight">
            Differently
          </div>
        </div>
      </div>

      {/* ── Subline ── */}
      <div className="overflow-hidden mt-6">
        <p className="hero-line text-white/40 text-sm lg:text-base font-light tracking-widest uppercase">
          Discover India's hidden gems — curated for the bold
        </p>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="flex items-center gap-4 mt-10">
        <button
          onClick={() => navigate('/projects')}
          className="hero-btn group relative overflow-hidden border border-white/30 text-white text-[11px] uppercase tracking-[0.3em] px-8 py-4 rounded-full hover:border-[#D3FD50] transition-colors duration-500"
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            Explore Places
          </span>
          <span className="absolute inset-0 bg-[#D3FD50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-full" />
        </button>

        <button
          onClick={() => navigate('/agence')}
          className="hero-btn group relative overflow-hidden bg-white/10 backdrop-blur-sm text-white text-[11px] uppercase tracking-[0.3em] px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-500 border border-white/10"
        >
          Our Story
        </button>
      </div>

      {/* ── Scroll hint ── */}
      <div className="scroll-hint absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/25 text-[8px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>

    </div>
  )
}

export default HomeHeroText