'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { content } from '../content'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import createGlobe from 'cobe'
import { motion } from 'framer-motion'
import { Layers, Grid2X2, Lightbulb, Settings2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── FADE IN ON SCROLL ─────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── BINDER CLIP SVG ───────────────────────────────────────────────
function BinderClip({ color = '#1a1a1a' }) {
  return (
    <svg className="binder-clip" viewBox="0 0 40 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="24" height="30" rx="2" fill={color} />
      <rect x="13" y="22" width="14" height="26" rx="1" fill="#444" />
      <path d="M14 20 C14 8 26 8 26 20" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M18 20 C18 12 22 12 22 20" stroke="#666" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ── PAPERCLIP SVG ─────────────────────────────────────────────────
function Paperclip({ color = '#1440FF' }) {
  return (
    <svg width="18" height="48" viewBox="0 0 18 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4 C4 4 2 8 2 12 L2 38 C2 43 5 46 9 46 C13 46 16 43 16 38 L16 14 C16 10 13.5 8 11 8 C8.5 8 6 10 6 14 L6 36 C6 38.5 7.5 40 9 40 C10.5 40 12 38.5 12 36 L12 16"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ── INTRO ─────────────────────────────────────────────────────────
function IntroMarqueeRow() {
  return (
    <span className="flex items-center gap-10 px-6">
      <span>Look at my</span>
      <span style={{ color: 'rgba(20,64,255,0.35)' }}>✦</span>
      <span>Look at my</span>
      <span style={{ color: 'rgba(212,160,23,0.35)' }}>✦</span>
      <span>Look at my</span>
      <span style={{ color: 'rgba(20,64,255,0.35)' }}>✦</span>
    </span>
  )
}

function Intro() {
  const wrapperRef = useRef(null)
  const giantTextRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: '10vh', scale: 0.8, opacity: 0 },
        {
          y: '0vh', scale: 1, opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 40%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative h-screen w-full"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed inset-0 flex flex-col justify-between overflow-hidden bg-[#EBEBEB]">

        {/* Subtle aurora — light mode */}
        <div
          className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(20,64,255,0.05) 0%, rgba(212,160,23,0.03) 40%, transparent 70%)' }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundSize: '60px 60px',
            backgroundImage: 'linear-gradient(to right, rgba(13,13,13,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,13,13,0.04) 1px, transparent 1px)',
            maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
          }}
        />

        {/* Giant background text */}
        <div
          ref={giantTextRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-bebas"
          style={{
            fontSize: '26vw',
            lineHeight: 0.75,
            fontWeight: 900,
            letterSpacing: '-0.05em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(13,13,13,0.06)',
            background: 'linear-gradient(180deg, rgba(13,13,13,0.08) 0%, transparent 60%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          CREATIVE
        </div>

        {/* Marquee */}
        <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-ink/10 bg-[#EBEBEB]/80 backdrop-blur-md py-4 z-10 -rotate-2 scale-110">
          <div
            className="flex w-max font-condensed font-bold text-xs tracking-[0.3em] uppercase text-ink/25"
            style={{ animation: 'intro-marquee 30s linear infinite' }}
          >
            <IntroMarqueeRow /><IntroMarqueeRow />
            <IntroMarqueeRow /><IntroMarqueeRow />
          </div>
        </div>

        {/* Center heading */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-12 mt-20">
          <h1
            ref={headingRef}
            className="font-bristol text-[14vw] md:text-[10vw] leading-[1.3] tracking-tight text-center py-2"
            style={{
              background: 'linear-gradient(0deg, #2346d1 0%, rgba(35,70,209,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0px 0px 20px rgba(35,70,209,0.15))',
            }}
          >
            PORTAFOLIO
          </h1>
          <div className="w-16 h-px bg-blue mx-auto mt-6" />
        </div>

        {/* Bottom: scroll hint */}
        <div className="relative z-20 w-full pb-10 flex items-center justify-center">
          <p className="font-condensed font-bold text-xs tracking-widest text-ink/40">
            TE INVITO A QUE ME CONOZCAS ;)
          </p>
        </div>

      </div>
    </div>
  )
}

// ── NAV ───────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${
      scrolled ? 'bg-[#EBEBEB]/90 backdrop-blur-sm border-b border-black/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-end">
        <div className="flex font-condensed font-bold text-xs tracking-widest uppercase">
          <a href="#contacto" className="text-ink hover:text-blue transition-colors duration-200">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  )
}

// ── HERO ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#EBEBEB]">
      {/* Large BG name watermark */}
      {/* BG watermark — CREATIVE en Akshar */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
        <span className="font-akshar font-bold text-[28vw] leading-none text-black/[0.05] whitespace-nowrap translate-y-4">
          CREATIVE
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 pb-16">
        <div>
          {/* Name — Akshar Bold */}
          <h1 className="font-akshar font-bold text-[15vw] md:text-[11vw] leading-[1] text-ink tracking-tight whitespace-nowrap">
            {content.name.toUpperCase()}
          </h1>

          {/* Creative Strategist + badge en la misma fila */}
          <div className="flex items-center gap-4 mt-2 mb-6 flex-wrap">
            <span className="font-bristol text-[7vw] md:text-[4vw] text-blue leading-none tracking-tight uppercase">
              {content.hero.role}
            </span>
            <a
              href={content.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="bg-ink text-cream px-4 py-2 font-condensed font-bold text-sm tracking-widest uppercase rotate-[-2deg] inline-flex items-center gap-2 hover:bg-blue transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              {content.handle}
            </a>
          </div>

          {/* Tags — sin Content */}
          <div className="flex flex-wrap gap-2 mt-4">
            {content.hero.tags.filter(t => t !== 'Content').map((tag) => (
              <span key={tag} className="skill-badge">{tag}</span>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-3 font-condensed text-xs tracking-widest uppercase text-ink/40">
            <div className="w-8 h-px bg-ink/30" />
            <span>Scroll</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink/10" />
    </section>
  )
}

// ── GLOBE PULSE ───────────────────────────────────────────────────
const BOGOTA_MARKER = [{ id: 'bogota', location: [4.71, -74.07], delay: 0 }]

function GlobePulse({ className = '', speed = 0.003 }) {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe = null
    let animationId
    // Start phi at ~1.3 rad to show South America (Bogotá at lon -74°)
    let phi = 1.3

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 1.3, theta: 0.15,
        dark: 1, diffuse: 1.5,
        mapSamples: 16000, mapBrightness: 10,
        baseColor: [0.05, 0.05, 0.05],
        markerColor: [0.2, 0.8, 0.9],
        glowColor: [0.05, 0.05, 0.05],
        markers: BOGOTA_MARKER.map((m) => ({ location: m.location, size: 0.06 })),
        arcs: [],
        opacity: 0.7,
      })

      function animate() {
        if (!isPausedRef.current) phi += speed
        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.15 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = '1'))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init() }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: '100%', height: '100%', cursor: 'grab', opacity: 0,
          transition: 'opacity 1.2s ease', borderRadius: '50%', touchAction: 'none',
        }}
      />
    </div>
  )
}

// ── ABOUT ─────────────────────────────────────────────────────────
function About() {
  const ref = useFadeIn()
  return (
    <section id="about" className="bg-[#EBEBEB] py-24 md:py-32">
      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Globe */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40">
              Bogotá, Colombia
            </p>
            <GlobePulse className="w-[300px]" />
          </div>

          {/* Right: About card */}
          <div className="relative">
            <div className="relative bg-white/80 backdrop-blur-sm border border-black/8 p-8 md:p-10 shadow-sm">
              <BinderClip />

              <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/30 mb-4">
                {content.about.headline}
              </p>

              <p className="font-condensed font-bold text-2xl text-ink tracking-tight mb-4">
                {content.hero.role}
              </p>

              <div className="w-12 h-0.5 bg-blue mb-6" />

              {content.about.body.map((paragraph, i) => (
                <p key={i} className="font-barlow text-sm leading-relaxed text-ink/80 mb-3">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="absolute -top-3 right-12">
              <Paperclip color="#1440FF" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── EN QUÉ AYUDO ──────────────────────────────────────────────────
function Ayudo() {
  const ref = useFadeIn()
  return (
    <section id="ayudo" className="bg-ink py-24 md:py-36 overflow-hidden relative">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gold/20 pointer-events-none" />

      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">

        <p className="font-marker text-gold text-lg mb-4">{content.ayudo.headline}</p>

        <p className="font-condensed font-bold text-sm tracking-widest uppercase text-cream/40 mb-8 max-w-xl">
          {content.ayudo.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-4">
          {content.ayudo.areas.map((area, i) => (
            <div key={i} className="border-t border-cream/10 md:border-t-0 md:border-l first:border-l-0 border-cream/10 pt-8 md:pt-0 md:pl-8 first:pl-0 pb-8 md:pb-0">
              <span className="font-bebas text-[4rem] leading-none text-blue/30 block mb-3">
                {area.number}
              </span>
              <h3 className="font-bebas text-2xl md:text-3xl text-cream tracking-tight mb-3">
                {area.title.toUpperCase()}
              </h3>
              <p className="font-barlow text-sm text-cream/50 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <p className="font-bebas text-[20vw] leading-none text-blue/10 select-none pointer-events-none -mb-4">
            STRATEGY
          </p>
        </div>
      </div>
    </section>
  )
}

// ── CAPACIDADES ───────────────────────────────────────────────────
function Capacidades() {
  const ref = useFadeIn()
  return (
    <section id="capacidades" className="bg-[#EBEBEB] py-24 md:py-32">
      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div>
            <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40 mb-2">
              {content.capacidades.eyebrow}
            </p>
            <h2 className="font-bebas text-5xl md:text-7xl leading-[0.9] text-ink mb-6">
              {content.capacidades.headline.toUpperCase()}
            </h2>

            <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40 mt-8 mb-3">
              Herramientas
            </p>
            <div className="flex gap-2 flex-wrap">
              {content.capacidades.tools.map((tool) => (
                <span key={tool} className="font-condensed font-900 text-sm border-2 border-ink px-3 py-1 tracking-widest">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="divide-y divide-ink/10">
              {content.capacidades.items.map((item, i) => (
                <div key={i} className="py-4 flex items-start justify-between gap-4 group">
                  <div>
                    <p className="font-condensed font-bold text-base tracking-wide text-ink group-hover:text-blue transition-colors duration-200">
                      {item.area}
                    </p>
                    <p className="font-barlow text-xs text-ink/50 mt-0.5">{item.detail}</p>
                  </div>
                  <span className="font-condensed font-bold text-xs text-ink/20 tracking-widest mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── MI TRABAJO ────────────────────────────────────────────────────
const placeholderColors = [
  'from-zinc-300 to-zinc-500',
  'from-blue/20 to-blue/60',
  'from-gold/20 to-gold/60',
  'from-zinc-400 to-zinc-700',
  'from-blue/10 to-zinc-400',
  'from-gold/10 to-zinc-500',
]

function WorkGrid({ count = 6, label = '' }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`work-card aspect-square bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]}`}>
          <div className="work-overlay">
            <span>{label || 'Ver proyecto'}</span>
          </div>
          <div className="absolute bottom-2 left-3 font-condensed font-bold text-xs text-white/50 uppercase tracking-widest">
            {label} {String(i + 1).padStart(2, '0')}
          </div>
        </div>
      ))}
    </div>
  )
}

function Trabajo() {
  const ref = useFadeIn()
  const [activeTab, setActiveTab] = useState(content.trabajo.tabs[0].id)
  const currentTab = content.trabajo.tabs.find(t => t.id === activeTab)

  return (
    <section id="trabajo" className="bg-ink py-24 md:py-32 overflow-hidden relative">
      {/* BG watermark */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <span className="font-bebas text-[22vw] leading-none whitespace-nowrap text-white/[0.03]">
          {content.trabajo.headline.toUpperCase()}
        </span>
      </div>

      <div ref={ref} className="fade-in relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        <span className="font-condensed font-bold text-xs tracking-widest uppercase text-cream/30 block mb-2">
          {content.trabajo.eyebrow}
        </span>
        <div className="relative inline-block mb-10">
          <h2 className="font-bebas text-[10vw] md:text-[7vw] leading-none text-cream/80 tracking-tight">
            {content.trabajo.headline.toUpperCase()}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-cream/10 mb-8">
          {content.trabajo.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-condensed font-bold text-xs tracking-widest uppercase px-6 py-3 transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-blue border-blue'
                  : 'text-cream/30 border-transparent hover:text-cream/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active tab description */}
        <p className="font-barlow text-cream/50 text-sm max-w-md mb-2">
          {currentTab.description}
        </p>

        <WorkGrid count={currentTab.count} label={currentTab.label} />
      </div>
    </section>
  )
}

// ── SHUFFLE GRID ──────────────────────────────────────────────────
const squareData = [
  { id: 1,  src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&q=80" },
  { id: 2,  src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?w=400&q=80" },
  { id: 3,  src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?w=400&q=80" },
  { id: 4,  src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?w=400&q=80" },
  { id: 5,  src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?w=400&q=80" },
  { id: 6,  src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400&q=80" },
  { id: 7,  src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=400&q=80" },
  { id: 8,  src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?w=400&q=80" },
  { id: 9,  src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80" },
  { id: 10, src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?w=400&q=80" },
  { id: 11, src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=400&q=80" },
  { id: 12, src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=400&q=80" },
  { id: 13, src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&q=80" },
  { id: 14, src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80" },
  { id: 15, src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?w=400&q=80" },
  { id: 16, src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" },
]

const shuffleArr = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const generateSquares = () =>
  shuffleArr(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className="w-full h-full rounded-sm overflow-hidden"
      style={{ backgroundImage: `url(${sq.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    />
  ))

function ShuffleGrid() {
  const timeoutRef = useRef(null)
  const [squares, setSquares] = useState(generateSquares)

  useEffect(() => {
    const run = () => {
      setSquares(generateSquares())
      timeoutRef.current = setTimeout(run, 3000)
    }
    timeoutRef.current = setTimeout(run, 3000)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[420px] gap-1">
      {squares}
    </div>
  )
}

// ── PLANIFICACIÓN ─────────────────────────────────────────────────
const planeacionItems = [
  { title: 'Tableros Creativos',       subtitle: 'Organización visual de ideas',       icon: <Layers size={16} className="text-ink/40" /> },
  { title: 'Sistemas de Organización', subtitle: 'Estructura que sostiene el proceso', icon: <Grid2X2 size={16} className="text-ink/40" /> },
  { title: 'Conceptualización',        subtitle: 'De la idea al sistema',              icon: <Lightbulb size={16} className="text-ink/40" /> },
  { title: 'Estructuras Operativas',   subtitle: 'Flujo claro de ejecución',           icon: <Settings2 size={16} className="text-ink/40" /> },
]

function Planeacion() {
  const ref = useFadeIn()
  return (
    <section id="planeacion" className="bg-[#EBEBEB] py-24 md:py-32 overflow-hidden">
      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">

        {/* Título centrado */}
        <div className="text-center mb-16">
          <h2 className="font-akshar font-bold text-[7vw] md:text-[5vw] leading-[1] text-ink">
            EXISTE UNA
          </h2>
          <h2 className="font-bristol text-[7vw] md:text-[5vw] leading-[1.2] text-blue uppercase">
            PLANIFICACIÓN
          </h2>
          <h2 className="font-akshar font-bold text-[7vw] md:text-[5vw] leading-[1] text-ink">
            PARA TODO
          </h2>
        </div>

        {/* 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Izquierda: lista animada */}
          <div className="relative h-[320px] overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm">
            <motion.div
              className="flex flex-col absolute w-full"
              animate={{ y: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, repeatType: 'loop', duration: 10, ease: 'linear' }}
            >
              {[...planeacionItems, ...planeacionItems].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 w-10 h-10 rounded-xl shadow-sm shrink-0" />
                    <div>
                      <p className="font-barlow font-semibold text-sm text-gray-900">{item.title}</p>
                      <p className="font-barlow text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  {item.icon}
                </div>
              ))}
            </motion.div>
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          </div>

          {/* Derecha: shuffle grid */}
          <ShuffleGrid />

        </div>
      </div>
    </section>
  )
}

// ── IDENTIDAD ─────────────────────────────────────────────────────
function Identidad() {
  const ref = useFadeIn()
  return (
    <section id="identidad" className="bg-ink py-24 md:py-32 overflow-hidden relative">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gold/10 pointer-events-none" />

      <div ref={ref} className="fade-in relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: case info */}
          <div>
            <p className="font-condensed font-bold text-xs tracking-widest uppercase text-cream/30 mb-2">
              {content.identidad.eyebrow}
            </p>
            <h2 className="font-bebas text-5xl md:text-7xl leading-[0.9] text-cream tracking-tight mb-2">
              {content.identidad.headline.toUpperCase()}
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-6" />

            <div className="mb-6">
              <p className="font-bebas text-3xl text-blue tracking-tight">{content.identidad.caseName}</p>
              <span className="font-condensed font-bold text-xs tracking-widest uppercase text-cream/30">
                {content.identidad.caseTag}
              </span>
            </div>

            <p className="font-barlow text-sm leading-relaxed text-cream/60 mb-6 max-w-sm">
              {content.identidad.description}
            </p>

            <div className="space-y-3">
              {content.identidad.puntos.map((punto, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                  <p className="font-barlow text-sm text-cream/60 leading-relaxed">{punto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image grid */}
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: content.identidad.imageCount }).map((_, i) => (
              <div key={i} className={`${i === 0 ? 'col-span-2' : ''} aspect-square bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} rounded-sm work-card`}>
                <div className="work-overlay"><span>Ver</span></div>
                <div className="absolute bottom-2 left-2 font-condensed font-bold text-[10px] text-white/40 uppercase tracking-widest">
                  {content.identidad.caseName} {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ── PROCESS ───────────────────────────────────────────────────────
function Process() {
  const ref = useFadeIn()
  return (
    <section id="process" className="bg-[#EBEBEB] py-24 md:py-32">
      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">

        <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40 mb-2">
          {content.process.eyebrow}
        </p>
        <h2 className="font-bebas text-5xl md:text-7xl leading-[0.9] text-ink mb-12">
          {content.process.headline.toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {content.process.steps.map((step, i) => (
            <div key={i} className="border-t border-ink/10 pt-8 pb-8 pr-0 md:pr-8 group">
              <span className="font-bebas text-[3rem] leading-none text-blue/20 block mb-3 group-hover:text-blue/40 transition-colors duration-300">
                {step.num}
              </span>
              <h3 className="font-bebas text-2xl text-ink tracking-tight mb-2">
                {step.title.toUpperCase()}
              </h3>
              <p className="font-barlow text-sm text-ink/60 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── TESTIMONIOS ───────────────────────────────────────────────────
const testimonialsData = [
  {
    text: "Antes de trabajar con Bryan teníamos contenido, pero no una dirección clara. Nos ayudó a organizar todo, definir mejor la identidad y empezar a ejecutar de forma más coherente. Se notó bastante en cómo empezó a percibirse la marca.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Daniel Torres",
    role: "Director de Marca",
  },
  {
    text: "En mi caso, que manejo marca personal, necesitaba alguien que no solo diseñara sino que entendiera cómo posicionar lo que hago. Bryan me ayudó a ordenar el mensaje, el contenido y la forma en la que me presento. Todo empezó a tener más sentido.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sofía Ramírez",
    role: "Creadora de Contenido",
  },
  {
    text: "Lo que hizo Bryan fue bajar todo a tierra. Teníamos ideas, pero no una estructura clara para ejecutarlas. Nos ayudó a organizar campañas, contenido y piezas de forma que realmente pudiéramos movernos y no quedarnos en lo conceptual.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Alejandro Vargas",
    role: "Fundador",
  },
]

function TestimonialsColumn({ testimonials, className = '', duration = 10 }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-ink/10 shadow-sm bg-white max-w-xs w-full"
              >
                <p className="font-marker text-blue text-2xl leading-none mb-4">"</p>
                <p className="font-barlow text-sm leading-relaxed text-ink/70 italic mb-6">
                  {text}
                </p>
                <div className="flex items-center gap-3 border-t border-ink/8 pt-4">
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-condensed font-bold text-sm text-ink tracking-wide">{name}</p>
                    <p className="font-barlow text-xs text-ink/40">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

function Testimonios() {
  return (
    <section id="testimonios" className="bg-[#EBEBEB] py-24 md:py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40 mb-3">
            {content.testimonios.eyebrow}
          </p>
          <h2 className="font-bebas text-5xl md:text-7xl leading-[0.9] text-ink tracking-tight">
            {content.testimonios.headline.toUpperCase()}
          </h2>
        </motion.div>

        {/* Columnas */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={testimonialsData} duration={15} />
          <TestimonialsColumn testimonials={[...testimonialsData].reverse()} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={testimonialsData} className="hidden lg:block" duration={17} />
        </div>

      </div>
    </section>
  )
}

// ── CONTACTO ──────────────────────────────────────────────────────
function Contacto() {
  const ref = useFadeIn()
  return (
    <section id="contacto" className="bg-[#EBEBEB] py-24 md:py-32 relative overflow-hidden">
      {/* Big watermark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <p className="font-bebas text-[20vw] leading-none text-black/[0.03] whitespace-nowrap">
          LET'S WORK
        </p>
      </div>

      <div ref={ref} className="fade-in relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-marker text-blue text-xl mb-4">{content.contacto.eyebrow}</p>
        <h2 className="font-bebas text-[10vw] md:text-[6vw] leading-[0.9] text-ink tracking-tight mb-6">
          {content.contacto.headline.toUpperCase()}
        </h2>

        <p className="font-barlow text-sm leading-relaxed text-ink/60 max-w-lg mb-10">
          {content.contacto.body}
        </p>

        <a href={`mailto:${content.email}`}
          className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 font-condensed font-bold text-sm tracking-widest uppercase hover:bg-blue transition-all duration-300 mb-12">
          {content.contacto.cta}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <div className="flex gap-6 mb-16 flex-wrap">
          {Object.entries(content.social).map(([platform, url]) => (
            <a key={platform} href={url} target="_blank" rel="noreferrer"
              className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/30 hover:text-blue transition-colors duration-200">
              {platform}
            </a>
          ))}
        </div>

        <div className="border-t border-ink/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="font-bebas text-2xl text-ink/20 tracking-widest">{content.name}</p>
          <p className="font-condensed text-xs text-ink/30 tracking-widest uppercase">
            © {new Date().getFullYear()} — Todos los derechos reservados
          </p>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main>
      <Intro />
      <Nav />
      <Hero />
      <About />
      <Ayudo />
      <Capacidades />
      <Trabajo />
      <Planeacion />
      <Identidad />
      <Process />
      <Testimonios />
      <Contacto />
    </main>
  )
}
