import { useRef } from 'react'
import gsap from 'gsap'

const ProjectCard = ({ src, title, tag, index }) => {
  const cardRef    = useRef(null)
  const imgRef     = useRef(null)
  const glowRef    = useRef(null)
  const tagRef     = useRef(null)
  const titleRef   = useRef(null)
  const arrowRef   = useRef(null)
  const borderTRef = useRef(null)
  const borderBRef = useRef(null)
  const shimmerRef = useRef(null)
  const bounds     = useRef({})

  // Unique vivid accent per card
  const accents = ['#a78bfa', '#34d399', '#fb923c', '#60a5fa', '#f472b6', '#facc15']
  const accent  = accents[index % accents.length]

  const onEnter = () => {
    bounds.current = cardRef.current.getBoundingClientRect()

    // ── Image: zoom IN + go brighter + more saturated
    if (imgRef.current) {
  gsap.to(imgRef.current,  {
      scale: 1.13,
      filter: 'brightness(1.35) saturate(1.6) contrast(1.08)',
      duration: 0.9,
      ease: 'power3.out',
    })}

    // ── Glow burst from center (accent colour, not black)
    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.15,
      duration: 0.6,
      ease: 'power2.out',
    })

    // ── Shimmer sweep
    gsap.fromTo(shimmerRef.current,
      { x: '-115%' },
      { x: '115%', duration: 0.7, ease: 'power2.inOut' }
    )

    // ── Border lines grow from left
    gsap.fromTo([borderTRef.current, borderBRef.current],
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.06 }
    )

    // ── Tag lifts + accent tint
    gsap.to(tagRef.current, {
      y: -3,
      scale: 1.05,
      duration: 0.35,
      ease: 'power2.out',
    })

    // ── Title slides up + brightens
    gsap.to(titleRef.current, {
      y: -10,
      color: accent,
      duration: 0.4,
      ease: 'power3.out',
    })

    // ── Arrow pops in
    gsap.fromTo(arrowRef.current,
      { scale: 0.4, opacity: 0, rotate: -90 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.45, ease: 'back.out(2)' }
    )
  }

  const onLeave = () => {
    // ── Image back to normal
    gsap.to(imgRef.current, {
      scale: 1,
      filter: 'brightness(1) saturate(1) contrast(1)',
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.to(glowRef.current, {
      opacity: 0,
      scale: 1,
      duration: 0.55,
      ease: 'power2.in',
    })

    gsap.to([borderTRef.current, borderBRef.current], {
      scaleX: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    })

    gsap.to(tagRef.current, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    })

    gsap.to(titleRef.current, {
      y: 0,
      color: '#ffffff',
      duration: 0.4,
      ease: 'power3.out',
    })

    gsap.to(arrowRef.current, {
      scale: 0.4,
      opacity: 0,
      rotate: 90,
      duration: 0.3,
      ease: 'power2.in',
    })

    // ── Reset 3D tilt
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  const onMove = (e) => {
    const { left, top, width, height } = bounds.current
    const rx = (((e.clientY - top)  / height) - 0.5) * -12
    const ry = (((e.clientX - left) / width)  - 0.5) *  12
    gsap.to(cardRef.current, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 900,
    })
  }

  return (
    <div
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-2xl cursor-pointer"
      style={{
        height: '36vw',
        minHeight: '260px',
        maxHeight: '480px',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* ── IMAGE — gets brighter + bigger on hover ── */}
      <img
        ref={imgRef}
        src={src}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'transform, filter', transformOrigin: 'center center' }}
        loading="lazy"
      />

      {/* ── ACCENT GLOW — radiates accent colour upward ── */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          opacity: 0,
          background: `radial-gradient(ellipse at 50% 100%, ${accent}55 0%, ${accent}22 40%, transparent 70%)`,
          willChange: 'opacity, transform',
        }}
      />

      {/* ── Shimmer ── */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
          transform: 'translateX(-115%)',
        }}
      />

      {/* ── Permanent soft bottom gradient (lighter than before) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)',
        }}
      />

      {/* ── Animated border lines ── */}
      <div
        ref={borderTRef}
        className="absolute top-0 left-0 right-0 h-[2px] z-30 origin-left"
        style={{
          background: `linear-gradient(90deg, ${accent}, ${accent}00)`,
          transform: 'scaleX(0)',
          opacity: 0,
          boxShadow: `0 0 12px 2px ${accent}99`,
        }}
      />
      <div
        ref={borderBRef}
        className="absolute bottom-0 left-0 right-0 h-[2px] z-30 origin-left"
        style={{
          background: `linear-gradient(90deg, ${accent}00, ${accent}, ${accent}00)`,
          transform: 'scaleX(0)',
          opacity: 0,
          boxShadow: `0 0 10px 2px ${accent}66`,
        }}
      />

      {/* ── TAG — top left ── */}
      <div ref={tagRef} className="absolute top-4 left-4 z-40" style={{ willChange: 'transform' }}>
        <span
          className="text-white text-[9px] tracking-[0.28em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md font-light"
          style={{
            background: `${accent}28`,
            border: `1px solid ${accent}66`,
            color: accent,
            textShadow: `0 0 10px ${accent}`,
          }}
        >
          {tag}
        </span>
      </div>

      {/* ── ARROW — top right, pops in on hover ── */}
      <div
        ref={arrowRef}
        className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          opacity: 0,
          background: `${accent}20`,
          border: `1.5px solid ${accent}`,
          boxShadow: `0 0 14px ${accent}66`,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2 11L11 2M11 2H5M11 2V8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── BOTTOM CONTENT ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-40">
        {/* Glowing accent rule */}
        <div
          className="mb-3 h-[2px] w-10 rounded-full"
          style={{
            background: accent,
            boxShadow: `0 0 10px 2px ${accent}99`,
          }}
        />

        <div ref={titleRef} style={{ willChange: 'transform, color', color: '#ffffff' }}>
          <h3
            className="font-[font2] uppercase leading-none tracking-tight"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h3>
          <p className="text-white/40 text-[9px] tracking-[0.35em] uppercase mt-2 font-light">
            Explore now →
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard