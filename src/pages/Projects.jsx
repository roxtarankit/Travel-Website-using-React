import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '../components/projects/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

// Only 6 images: image1.jpg to image6.jpg
// import.meta.url gives correct Vite-resolved paths
import img1 from '../assets/image1.jpg'
import img2 from '../assets/image2.jpg'
import img3 from '../assets/image3.jpg'
import img4 from '../assets/image4.jpg'
import img5 from '../assets/image5.jpg'
import img6 from '../assets/image6.jpg'

const projects = [
  {
    slogan: { top: 'Not all who wander', bottom: 'are lost' },
    images: [
      { src: img1, title: 'Chakrata', tag: 'Uttarakhand' },
      { src: img2, title: 'Mussoorie', tag: 'Hill Station' },
      { src: img3, title: 'Dhanaulti', tag: 'Himalayas' },
    ],
  },
  {
    slogan: { top: 'The world is a book —', bottom: 'read every page' },
    images: [
      { src: img4, title: 'Rishikesh', tag: 'Adventure' },
      { src: img5, title: 'Auli', tag: 'Skiing' },
      { src: img6, title: 'Kedarnath', tag: 'Pilgrimage' },
    ],
  },
]

const WORDS = ['Mountains', '✦', 'Forests', '✦', 'Valleys', '✦', 'Rivers', '✦', 'Peaks', '✦', 'Trails', '✦', 'Glaciers', '✦', 'Lakes', '✦']

const Projects = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)

  useGSAP(() => {
    // Letter-by-letter title reveal
    const el = titleRef.current
    if (el) {
      el.innerHTML = el.textContent
        .split('')
        .map(ch => `<span style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`)
        .join('')

      gsap.from(el.querySelectorAll('span'), {
        yPercent: 120,
        opacity: 0,
        stagger: 0.04,
        duration: 0.9,
        ease: 'power3.out',
      })
    }

    // Infinite marquee
    gsap.to('.marquee-track', {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: 'none',
    })

    // Per-row scroll animations
    gsap.utils.toArray('.proj-row').forEach(row => {
      const cards = row.querySelectorAll('.card-item')
      const slogan = row.querySelector('.row-slogan')

      gsap.from(cards, {
        y: 70,
        opacity: 0,
        scale: 0.94,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 87%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(slogan, {
        x: -24,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 87%',
          toggleActions: 'play none none reverse',
        },
      })

      // Image parallax per card
      cards.forEach(card => {
        const img = card.querySelector('img')
        if (!img) return
        gsap.to(img, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    })

    // CTA
    gsap.from('.cta-wrap', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-wrap',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="bg-[#080808] min-h-screen text-white">

      {/* Hero */}
      <div className="px-5 lg:px-12 pt-[28vh] pb-8">
        <p className="text-white/30 uppercase tracking-[0.35em] text-[10px] mb-5">
          Curated Escapes · India
        </p>
        <div className="overflow-hidden">
          <h1
            ref={titleRef}
            className="font-[font2] text-[18vw] sm:text-[14vw] lg:text-[11vw] uppercase leading-none tracking-tight"
          >
            Places
          </h1>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/30 text-[9px] tracking-[0.35em] uppercase">Scroll to explore</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/[0.07] py-3 mb-14">
        <div className="marquee-track flex gap-10 w-max whitespace-nowrap">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="text-white/20 text-[9px] uppercase tracking-[0.35em] font-light">{w}</span>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="px-5 lg:px-12 space-y-10 lg:space-y-16">
        {projects.map((proj, ri) => (
          <div key={ri} className="proj-row">
            <div className={`row-slogan mb-6 flex ${ri % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div>
                <p className="text-white/20 text-[9px] uppercase tracking-widest mb-1">
                  — {String(ri + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </p>
                <p className="font-[font2] text-white/50 text-xl lg:text-2xl leading-snug">
                  {proj.slogan.top}<br />
                  <span className="text-white">{proj.slogan.bottom}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {proj.images.map((img, ci) => (
                <div key={ci} className="card-item">
                  <ProjectCard src={img.src} title={img.title} tag={img.tag} index={ci} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta-wrap mt-28 mb-16 px-5 text-center">
        <p className="text-white/20 uppercase tracking-[0.4em] text-[9px] mb-4">Ready?</p>
        <h2 className="font-[font2] text-[10vw] lg:text-[6vw] uppercase leading-none mb-10">
          Your next <span className="text-white/20">adventure</span> awaits
        </h2>
        <button className="relative overflow-hidden group border border-white/20 text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:border-white/50 transition-colors duration-500">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">Plan your trip</span>
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>

    </div>
  )
}

export default Projects