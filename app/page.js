'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { content } from '../content'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import createGlobe from 'cobe'
import { motion, useMotionValue, useMotionTemplate, animate, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Layers, Grid2X2, Lightbulb, Settings2, ChevronLeft, ChevronRight, Folder, FolderOpen, X } from 'lucide-react'
import useMeasure from 'react-use-measure'

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
const navLinks = [
  { label: 'Inicio',       href: '#hero' },
  { label: 'Perfil',       href: '#about' },
  { label: 'Roles',        href: '#ayudo' },
  { label: 'Herramientas', href: '#herramientas' },
  { label: 'Trabajos',     href: '#trabajo' },
  { label: 'Proceso',      href: '#process' },
  { label: 'Testimonios',  href: '#testimonios' },
  { label: 'Contacto',     href: '#contacto' },
]

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
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-center">
        <div className="flex items-center gap-6 font-condensed font-bold text-xs tracking-widest uppercase">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink/60 hover:text-blue transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
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

// ── GLOBE BARS ────────────────────────────────────────────────────
const GLOBE_MARKERS = [
  { id: 'bogota', location: [4.71, -74.07], size: 0.06 },
]

function GlobeBars({ className = '', speed = 0.003 }) {
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
    const onMove = (e) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi:   (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe = null
    let animationId
    let phi = 1.3

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 1.3, theta: 0.2,
        dark: 0, diffuse: 1.2,
        mapSamples: 16000, mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.08, 0.25, 1],
        glowColor: [0.9, 0.9, 0.9],
        markers: GLOBE_MARKERS.map((m) => ({ location: m.location, size: m.size })),
        arcs: [],
        opacity: 0.85,
      })

      function animate() {
        if (!isPausedRef.current) phi += speed
        globe.update({
          phi:   phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
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
    <section id="about" className="bg-[#EBEBEB] py-24 md:py-32 relative overflow-hidden">

      {/* ── Textura halftone — puntos tipo papel impreso ── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }} />

      {/* Degradados de profundidad */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(235,235,235,0.85) 30%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 40% 50% at 80% 20%, rgba(20,64,255,0.04) 0%, transparent 65%)' }} />

      {/* Palabra decorativa ABOUT en Bristol/azul */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span
          className="font-bristol text-blue uppercase leading-none"
          style={{ fontSize: 'clamp(180px, 40vw, 600px)', opacity: 0.06, letterSpacing: '-0.02em' }}
        >
          About
        </span>
      </div>

      <div ref={ref} className="fade-in relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Globe */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <p className="font-akshar font-bold text-sm tracking-widest uppercase text-ink">
              Bogotá, Colombia
            </p>
            <GlobeBars className="w-[300px]" />
          </div>

          {/* Right: About card */}
          <div className="relative">
            <div className="relative bg-white/80 backdrop-blur-sm border border-black/8 p-8 md:p-10 shadow-sm">
              <BinderClip />

              <p className="font-akshar font-bold text-sm tracking-widest uppercase text-ink mb-4">
                {content.about.headline}
              </p>

              <p className="font-bristol text-2xl text-blue tracking-tight mb-4 uppercase">
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

// ── ROLES QUE ASUMO ───────────────────────────────────────────────
function Ayudo() {
  const ref = useFadeIn()
  const [open, setOpen] = useState(null)

  return (
    <section id="ayudo" className="bg-ink py-24 md:py-36">
      <div ref={ref} className="fade-in max-w-2xl mx-auto px-6 md:px-10">

        {/* Título */}
        <div className="mb-12 text-center">
          <h2 className="font-bristol text-[13vw] md:text-[8vw] leading-none text-blue uppercase">
            ROLES
          </h2>
          <h2 className="font-akshar font-bold text-[13vw] md:text-[8vw] leading-[1] text-cream uppercase tracking-tight">
            QUE ASUMO
          </h2>
        </div>

        <div className="divide-y divide-cream/10">
          {content.ayudo.areas.map((area, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-akshar font-bold text-sm md:text-base text-cream uppercase tracking-wide group-hover:text-blue transition-colors duration-200">
                  {area.title}
                </span>
                <span className={`text-cream/30 text-xl transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="font-barlow text-sm text-cream/50 leading-relaxed pb-6">
                    {area.description}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── INFINITE SLIDER ───────────────────────────────────────────────
function InfiniteSlider({ children, gap = 16, duration = 25, durationOnHover, reverse = false, className }) {
  const [currentDuration, setCurrentDuration] = useState(duration)
  const [ref, { width }] = useMeasure()
  const translation = useMotionValue(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    let controls
    const contentSize = width + gap
    const from = reverse ? -contentSize / 2 : 0
    const to = reverse ? 0 : -contentSize / 2

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => { setIsTransitioning(false); setKey(k => k + 1) },
      })
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => { translation.set(from) },
      })
    }
    return controls?.stop
  }, [key, translation, currentDuration, width, gap, isTransitioning, reverse])

  const hoverProps = durationOnHover ? {
    onHoverStart: () => { setIsTransitioning(true); setCurrentDuration(durationOnHover) },
    onHoverEnd:   () => { setIsTransitioning(true); setCurrentDuration(duration) },
  } : {}

  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <motion.div
        className="flex w-max"
        style={{ x: translation, gap: `${gap}px` }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

// ── HERRAMIENTAS ──────────────────────────────────────────────────
const herramientas = [
  { name: "Notion",          src: "/icons/notion.svg" },
  { name: "Google Drive",    src: "/icons/googledrive.svg" },
  { name: "ClickUp",         src: "/icons/clickup.svg" },
  { name: "Adobe Photoshop", src: "/icons/photoshop.svg" },
  { name: "Figma",           src: "/icons/figma.svg" },
  { name: "Canva",           src: "/icons/canva.svg" },
  { name: "Pinterest",       src: "/icons/pinterest.svg" },
  { name: "Framer",          src: "/icons/framer.svg" },
  { name: "CapCut",          src: "/icons/capcut.svg" },
  { name: "Metricool",       src: "/icons/metricool.svg" },
  { name: "Meta Business",   src: "/icons/meta.svg" },
  { name: "Meta Ads",        src: "/icons/facebook.svg" },
  { name: "ChatGPT",         src: "/icons/chatgpt.svg" },
  { name: "Claude",          src: "/icons/anthropic.svg" },
  { name: "NotebookLM",      src: "/icons/notebooklm.svg" },
  { name: "Gemini",          src: "/icons/gemini.svg" },
  { name: "Vercel",          src: "/icons/vercel.svg" },
  { name: "GitHub",          src: "/icons/github.svg" },
]

function Herramientas() {
  const ref = useFadeIn()
  return (
    <section id="herramientas" className="bg-[#EBEBEB] py-24 md:py-32">
      <div ref={ref} className="fade-in">

        {/* Heading — centrado en la página, texto alineado igual que la referencia */}
        <div className="mb-10 px-6 flex justify-center">
          <div className="inline-block">
            <p className="font-bristol text-blue text-2xl md:text-3xl leading-none mb-0 uppercase">
              UTILIZO ESTAS
            </p>
            <h2 className="font-akshar font-bold text-[13vw] md:text-[9vw] leading-[0.88] text-ink tracking-tight uppercase">
              HERRAMIENTAS
            </h2>
            <p className="font-bristol text-blue text-2xl md:text-3xl leading-none mt-0 uppercase text-right">
              EN MI TRABAJO
            </p>
          </div>
        </div>

        {/* Divider + subline */}
        <div className="max-w-sm mx-auto h-px bg-ink/15 mb-6 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <p className="text-center font-barlow text-ink/50 text-sm mb-6">
          <span className="block">Trusting the experts.</span>
          <span className="block font-semibold text-ink">Utilizing leaders.</span>
        </p>

        {/* Infinite slider */}
        <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] overflow-hidden">
          <InfiniteSlider gap={40} duration={35} durationOnHover={70}>
            {herramientas.map((tool) => (
              <div
                key={tool.name}
                className="shrink-0 flex items-center gap-2 border border-ink/20 px-4 py-2 hover:border-ink transition-colors duration-200"
              >
                <img
                  src={tool.src}
                  alt={tool.name}
                  className="h-4 w-4 object-contain select-none pointer-events-none"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <span className="font-condensed font-bold text-sm tracking-widest uppercase whitespace-nowrap text-ink/70 hover:text-ink">
                  {tool.name}
                </span>
              </div>
            ))}
          </InfiniteSlider>
        </div>

        <div className="mt-8 h-px bg-ink/15 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>
    </section>
  )
}

// ── MI TRABAJO ────────────────────────────────────────────────────
const proyectos = [
  {
    id: 'biking-village',
    name: 'Biking Village',
    files: ['brief.md', 'identidad.fig', 'contenido.pdf', 'entrega.zip'],
    carruseles: [
      {
        cover: '/trabajo/biking-village/1/1.jpg',
        images: [
          '/trabajo/biking-village/1/1.jpg',
          '/trabajo/biking-village/1/2.jpg',
          '/trabajo/biking-village/1/3.jpg',
          '/trabajo/biking-village/1/4.jpg',
          '/trabajo/biking-village/1/5.jpg',
          '/trabajo/biking-village/1/6.jpg',
        ],
      },
      {
        cover: '/trabajo/biking-village/2/1.jpg',
        images: [
          '/trabajo/biking-village/2/1.jpg',
          '/trabajo/biking-village/2/2.jpg',
          '/trabajo/biking-village/2/3.jpg',
          '/trabajo/biking-village/2/4.jpg',
        ],
      },
      {
        cover: '/trabajo/biking-village/3/1.jpg',
        images: [
          '/trabajo/biking-village/3/1.jpg',
          '/trabajo/biking-village/3/2.jpg',
          '/trabajo/biking-village/3/3.jpg',
          '/trabajo/biking-village/3/4.jpg',
          '/trabajo/biking-village/3/5.jpg',
          '/trabajo/biking-village/3/7.jpg',
        ],
      },
      {
        cover: '/trabajo/biking-village/4/1.jpg',
        images: [
          '/trabajo/biking-village/4/1.jpg',
          '/trabajo/biking-village/4/2.jpg',
          '/trabajo/biking-village/4/3.jpg',
          '/trabajo/biking-village/4/4.jpg',
          '/trabajo/biking-village/4/5.jpg',
          '/trabajo/biking-village/4/6.jpg',
        ],
      },
      {
        cover: '/trabajo/biking-village/5/1.jpg',
        images: [
          '/trabajo/biking-village/5/1.jpg',
          '/trabajo/biking-village/5/2.jpg',
          '/trabajo/biking-village/5/3.jpg',
          '/trabajo/biking-village/5/4.jpg',
          '/trabajo/biking-village/5/5.jpg',
        ],
      },
    ],
  },
  {
    id: 'jicara',
    name: 'Jicara',
    files: ['brief.md', 'marca.ai', 'aplicaciones.fig', 'entrega.pdf'],
    carruseles: [
      { cover: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80', images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80', images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80', images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=900&q=80', images: ['https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=900&q=80'] },
    ],
  },
  {
    id: 'swear-art',
    name: 'Swear.art',
    files: ['brief.md', 'estrategia.pdf', 'contenido.fig', 'entrega.zip'],
    carruseles: [
      { cover: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80', images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80', images: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=900&q=80', images: ['https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80', images: ['https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80'] },
    ],
  },
  {
    id: 'valentina-ramirez',
    name: 'Valentina Ramírez',
    files: ['brief.md', 'identidad.fig', 'piezas.psd', 'entrega.pdf'],
    carruseles: [
      { cover: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80', images: ['https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&q=80', images: ['https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80', images: ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80'] },
    ],
  },
  {
    id: 'coopsominas',
    name: 'Coopsominas',
    files: ['brief.md', 'estrategia.pdf', 'tableros.xls', 'entrega.zip'],
    carruseles: [
      { cover: 'https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?w=900&q=80', images: ['https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=900&q=80', images: ['https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1510925758641-869d353cecc7?w=900&q=80', images: ['https://images.unsplash.com/photo-1510925758641-869d353cecc7?w=900&q=80'] },
      { cover: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80', images: ['https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80'] },
    ],
  },
]

// Animation variants matching original BentoGallery
const bentoContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const bentoItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

function ProyectoLightbox({ images, projectName, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const [direction, setDirection] = useState(0)

  const go = (dir) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + images.length) % images.length)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '8%' : '-8%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-8%' : '8%', opacity: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-10" onClick={(e) => e.stopPropagation()}>
        <span className="font-akshar font-bold text-[11px] text-white/50 uppercase tracking-widest">{projectName}</span>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative w-full flex items-center justify-center px-16"
        style={{ maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`${projectName} ${current + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); go(-1) }}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); go(1) }}
      >
        <ChevronRight size={28} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 right-6 z-10" onClick={(e) => e.stopPropagation()}>
        <span className="font-akshar text-[11px] text-white/30 tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" onClick={(e) => e.stopPropagation()}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className="transition-all duration-300"
            style={{
              width: i === current ? '20px' : '6px',
              height: '3px',
              borderRadius: '2px',
              background: i === current ? '#1440FF' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function ProyectoGallery({ proyecto }) {
  const [lightbox, setLightbox] = useState(null) // { startIndex }
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <motion.div
      key={proyecto.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col gap-2 h-full min-h-0"
    >
      {/* Expand on hover gallery — cada card es un carrusel */}
      <div className="flex w-full items-center gap-1 overflow-hidden rounded-xl flex-1 min-h-0">
        {proyecto.carruseles.map((c, idx) => {
          const isHovered = hoveredIdx === idx
          const flex = isHovered ? 4 : 1
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl cursor-pointer h-full"
              style={{
                flex,
                transition: 'flex 0.5s ease',
                minWidth: 0,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setLightbox({ images: c.images })}
            >
              <img
                src={c.cover}
                alt={`${proyecto.name} ${idx + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
                style={{ transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.04)' : 'scale(1)' }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.4s ease' }}
              />
              {/* Label */}
              <div
                className="absolute bottom-0 left-0 right-0 p-3 z-10"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <p className="font-akshar font-bold text-[11px] text-white uppercase tracking-widest">
                  {String(idx + 1).padStart(2, '0')} · {c.images.length} {c.images.length === 1 ? 'imagen' : 'imágenes'}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="font-barlow text-[10px] text-ink/30 uppercase tracking-widest">
        Hover para explorar · Click para ver galería
      </p>

      {/* Lightbox slideshow */}
      <AnimatePresence>
        {lightbox && (
          <ProyectoLightbox
            images={lightbox.images}
            projectName={proyecto.name}
            startIndex={0}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function WorkExplorer() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10" style={{ height: '420px' }}>

      {/* Explorer panel — modo oscuro */}
      <div className="w-full md:w-[280px] shrink-0 rounded-xl border border-cream/10 bg-cream/[0.05] overflow-y-auto select-none backdrop-blur-sm">
        {/* Barra título VS Code style */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-cream/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <span className="font-condensed font-bold text-[10px] tracking-widest uppercase text-cream/25 ml-2">explorer</span>
        </div>

        <div className="py-2">
          {/* Root */}
          <div className="flex items-center gap-1.5 px-4 py-1">
            <ChevronRight size={11} className="text-cream/20" />
            <span className="font-barlow font-semibold text-[11px] text-cream/25 uppercase tracking-widest">src</span>
          </div>

          {/* Carpetas / proyectos */}
          {proyectos.map((p) => {
            const isOpen = selected?.id === p.id
            return (
              <div key={p.id}>
                <button
                  onClick={() => setSelected(isOpen ? null : p)}
                  className={`w-full flex items-center gap-2 px-4 py-2 transition-all duration-200 group ${
                    isOpen ? 'bg-blue/20' : 'hover:bg-cream/5'
                  }`}
                >
                  <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight size={12} className={isOpen ? 'text-blue' : 'text-cream/30'} />
                  </motion.span>
                  {isOpen
                    ? <FolderOpen size={15} className="text-blue shrink-0" />
                    : <Folder size={15} className="text-cream/40 shrink-0 group-hover:text-cream/70" />
                  }
                  <span className={`font-barlow text-[13px] transition-colors ${isOpen ? 'text-blue font-semibold' : 'text-cream/50 group-hover:text-cream/80'}`}>
                    {p.name}
                  </span>
                </button>

                {/* Archivos hijos al abrir */}
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {p.files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 pl-10 pr-4 py-1">
                        <span className="w-[3px] h-[3px] rounded-full bg-cream/20" />
                        <span className="font-barlow text-[11px] text-cream/30">{f}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Panel derecho: galería o placeholder — modo oscuro */}
      <div className="flex-1 min-w-0 h-full">
        <AnimatePresence mode="wait">
          {selected ? (
            <ProyectoGallery key={selected.id} proyecto={selected} />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center gap-3 border border-dashed border-cream/10 rounded-xl"
            >
              <Folder size={32} className="text-cream/15" />
              <p className="font-akshar font-bold text-xs tracking-widest uppercase text-cream/20">
                Haz click en una carpeta
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Trabajo() {
  const ref = useFadeIn()

  return (
    <section id="trabajo" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#050508' }}>

      {/* Fondos CSS — coste cero */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 25% 50%, rgba(40,55,110,0.30) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 35% 45% at 80% 70%, rgba(30,45,90,0.20) 0%, transparent 60%)' }} />



      <div ref={ref} className="fade-in relative z-10 w-full flex flex-col items-center px-6 md:px-10">

        {/* Título */}
        <div className="mb-8 text-center w-full max-w-5xl">
          <h2 className="font-akshar font-bold text-[10vw] md:text-[7vw] leading-none tracking-tight">
            <span className="text-blue font-bristol uppercase">CONOCE </span>
            <span className="text-cream uppercase">MI TRABAJO</span>
          </h2>
        </div>

        <div className="w-full max-w-5xl">
          <WorkExplorer />
        </div>
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
    <div className="grid grid-cols-4 grid-rows-4 h-[380px] gap-1">
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
          <div className="relative h-[380px] overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm">
            <motion.div
              className="flex flex-col absolute w-full"
              animate={{ y: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, repeatType: 'loop', duration: 10, ease: 'linear' }}
            >
              {[...planeacionItems, ...planeacionItems].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
                  <div>
                    <p className="font-barlow font-semibold text-sm text-gray-900">{item.title}</p>
                    <p className="font-barlow text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
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


// ── CUSTOM CURSOR ─────────────────────────────────────────────────
function CustomCursor({ cursorType = 'arrow-pointer', color = '#EBEBEB', size = 20, glitchColorB = '#00feff', glitchColorR = '#ff4f71', sectionRef }) {
  const cursorRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const positionState = useRef({ distanceX: 0, distanceY: 0, distance: 0, pointerX: 0, pointerY: 0, previousPointerX: 0, previousPointerY: 0, angle: 0, previousAngle: 0, angleDisplace: 0, degrees: 57.296 })

  useEffect(() => {
    const section = sectionRef?.current
    if (!section) return

    const handleMouseMove = (e) => {
      const s = positionState.current
      s.previousPointerX = s.pointerX; s.previousPointerY = s.pointerY
      s.pointerX = e.pageX; s.pointerY = e.pageY
      s.distanceX = s.previousPointerX - s.pointerX; s.distanceY = s.previousPointerY - s.pointerY
      s.distance = Math.sqrt(s.distanceY ** 2 + s.distanceX ** 2)
      setPosition({ x: e.pageX, y: e.pageY })
      const t = e.target
      setIsHovering(t.tagName === 'A' || t.tagName === 'BUTTON' || t.onclick !== null || t.classList.contains('cursor-hover'))
      setIsVisible(true)
    }
    const handleEnter = () => { section.style.cursor = 'none' }
    const handleLeave = () => { section.style.cursor = ''; setIsVisible(false) }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseenter', handleEnter)
    section.addEventListener('mouseleave', handleLeave)
    return () => {
      section.style.cursor = ''
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseenter', handleEnter)
      section.removeEventListener('mouseleave', handleLeave)
    }
  }, [sectionRef])

  const calcRotation = () => {
    const s = positionState.current
    if (s.distance <= 1) return s.angleDisplace
    const ua = Math.atan(Math.abs(s.distanceY) / Math.abs(s.distanceX)) * s.degrees
    s.previousAngle = s.angle
    if (s.distanceX <= 0 && s.distanceY >= 0) s.angle = 90 - ua
    else if (s.distanceX < 0 && s.distanceY < 0) s.angle = ua + 90
    else if (s.distanceX >= 0 && s.distanceY <= 0) s.angle = 90 - ua + 180
    else s.angle = ua + 270
    if (isNaN(s.angle)) s.angle = s.previousAngle
    else {
      if (s.angle - s.previousAngle <= -270) s.angleDisplace += 360 + s.angle - s.previousAngle
      else if (s.angle - s.previousAngle >= 270) s.angleDisplace += s.angle - s.previousAngle - 360
      else s.angleDisplace += s.angle - s.previousAngle
    }
    return s.angleDisplace
  }

  const base = { position: 'fixed', top: 0, left: 0, zIndex: 2147483647, pointerEvents: 'none', userSelect: 'none', opacity: isVisible ? 1 : 0, transition: '250ms, transform 100ms' }

  const renderCursor = () => {
    const s = positionState.current
    if (cursorType === 'glitch-effect') {
      const dx = Math.min(Math.max(s.distanceX, -10), 10), dy = Math.min(Math.max(s.distanceY, -10), 10)
      const cs = isHovering ? 30 : 15
      return <div ref={cursorRef} style={{ ...base, width: cs, height: cs, backgroundColor: '#222', borderRadius: '50%', backdropFilter: 'invert(1)', boxShadow: `${dx}px ${dy}px 0 ${glitchColorB}, ${-dx}px ${-dy}px 0 ${glitchColorR}`, transform: `translate3d(${position.x - cs / 2}px, ${position.y - cs / 2}px, 0)` }} />
    }
    if (cursorType === 'motion-blur') {
      const dx = Math.min(Math.max(s.distanceX, -20), 20), dy = Math.min(Math.max(s.distanceY, -20), 20)
      const ua = Math.atan(Math.abs(dy) / Math.abs(dx)) * s.degrees
      let angle = 0, sd = '0,0'
      if (!isNaN(ua)) { if (ua <= 45) { angle = dx * dy >= 0 ? ua : -ua; sd = `${Math.abs(dx / 2)},0` } else { angle = dx * dy <= 0 ? 180 - ua : ua; sd = `${Math.abs(dy / 2)},0` } }
      return <svg ref={cursorRef} style={{ ...base, width: size, height: size, overflow: 'visible', transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0) rotate(${angle}deg)` }}><defs><filter id="mb" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur stdDeviation={sd} /></filter></defs><circle cx="50%" cy="50%" r="5" fill={color} filter="url(#mb)" /></svg>
    }
    if (cursorType === 'big-circle') {
      const cs = size * 2.5
      return <><div style={{ ...base, width: cs, height: cs, backgroundColor: 'transparent', borderRadius: '50%', backdropFilter: 'invert(0.85) grayscale(1)', transform: `translate3d(${position.x - cs / 2}px, ${position.y - cs / 2}px, 0) ${isHovering ? 'scale(2.5)' : 'scale(1)'}` }} /><div style={{ ...base, width: 6, height: 6, backgroundColor: 'transparent', borderRadius: '50%', backdropFilter: 'invert(1)', transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)` }} /></>
    }
    if (cursorType === 'ring-dot') {
      const hs = isHovering ? 40 : size
      return <div ref={cursorRef} style={{ ...base, display: 'flex', justifyContent: 'center', alignItems: 'center', width: hs, height: hs, borderRadius: '50%', boxShadow: `0 0 0 1.25px ${color}, 0 0 0 2.25px #edf370`, transform: `translate3d(${position.x - hs / 2}px, ${position.y - hs / 2}px, 0)` }}><div style={{ width: 4, height: 4, backgroundColor: color, borderRadius: '50%' }} /></div>
    }
    if (cursorType === 'circle-and-dot') {
      const rot = calcRotation()
      return <div ref={cursorRef} style={{ ...base, width: size, height: size, border: isHovering ? `10px solid ${color}` : `1.25px solid ${color}`, borderRadius: '50%', boxShadow: `0 ${-15 - s.distance}px 0 -8px ${color}`, transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0) rotate(${rot}deg)` }} />
    }
    // default: arrow-pointer
    const rot = calcRotation()
    return <div ref={cursorRef} style={{ ...base, width: size, height: size, transform: `translate3d(${position.x - size / 2}px, ${position.y}px, 0) rotate(${rot}deg)` }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ width: '100%', height: '100%' }}><path d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#F2F5F8"/><path d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill={color}/></svg></div>
  }

  return <>{renderCursor()}</>
}

// ── PROCESS ───────────────────────────────────────────────────────
const procesoPasos = [
  { num: '01', title: 'Leer el contexto',       body: 'Entender la marca, el momento y el punto real desde el que hay que construir.', cursor: 'arrow-pointer' },
  { num: '02', title: 'Encontrar el foco',      body: 'Detectar qué necesita dirección, qué necesita estructura y dónde está la oportunidad.', cursor: 'big-circle' },
  { num: '03', title: 'Definir la ruta',        body: 'Establecer una dirección visual, narrativa y estratégica antes de ejecutar.', cursor: 'ring-dot' },
  { num: '04', title: 'Construir el sistema',   body: 'Desarrollar piezas, lógica y estructura con coherencia e intención.', cursor: 'circle-and-dot' },
  { num: '05', title: 'Aterrizar la ejecución', body: 'Convertir la dirección en contenido, aplicaciones y entregables reales.', cursor: 'glitch-effect' },
  { num: '06', title: 'Afinar y sostener',      body: 'Revisar, ajustar y fortalecer el resultado para que tenga continuidad.', cursor: 'motion-blur' },
]

function GradientBlurBG({ sectionRef }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const circsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef?.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight }
    resize()
    let raf

    const draw = () => {
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      circsRef.current.push({
        x: mouseRef.current.x, y: mouseRef.current.y,
        alpha: 1,
        grd: ctx.createRadialGradient(mouseRef.current.x, mouseRef.current.y, 0, mouseRef.current.x, mouseRef.current.y, 120),
      })

      circsRef.current = circsRef.current.filter(c => c.alpha > 0)
      for (const c of circsRef.current) {
        c.grd.addColorStop(0,   `rgba(20,64,255,0.5)`)
        c.grd.addColorStop(0.4, `rgba(20,64,255,0.15)`)
        c.grd.addColorStop(1,   `rgba(20,64,255,0)`)
        ctx.beginPath()
        ctx.fillStyle = c.grd
        ctx.globalAlpha = c.alpha
        ctx.arc(c.x, c.y, 120, 0, Math.PI * 2)
        ctx.fill()
        c.alpha -= 0.018
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    // Escucha en la sección, no en el canvas
    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    section.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    draw()

    return () => { cancelAnimationFrame(raf); section.removeEventListener('mousemove', onMove); window.removeEventListener('resize', resize) }
  }, [sectionRef])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'transparent' }} />
}

function Process() {
  const ref = useFadeIn()
  const sectionRef = useRef(null)
  const [activeCursor, setActiveCursor] = useState('arrow-pointer')

  return (
    <section ref={sectionRef} id="process" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <CustomCursor cursorType={activeCursor} color="#EBEBEB" size={20} sectionRef={sectionRef} />
      <GradientBlurBG sectionRef={sectionRef} />

      <div ref={ref} className="fade-in relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <h2 className="font-akshar font-bold text-4xl md:text-6xl text-cream mb-12 leading-tight">
          MI PROCESO DE{' '}
          <span className="font-bristol text-blue">TRABAJO</span>
        </h2>

        {/* Grid de pasos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {procesoPasos.map((paso, i) => (
            <button
              key={i}
              onMouseEnter={() => setActiveCursor(paso.cursor)}
              onMouseLeave={() => setActiveCursor('arrow-pointer')}
              className="cursor-hover text-left border border-cream/10 rounded-xl p-6 hover:border-cream/30 hover:bg-cream/5 transition-all duration-300 group"
            >
              <span className="font-bristol text-4xl text-blue block mb-3">
                {paso.num}
              </span>
              <h3 className="font-akshar font-semibold text-lg text-cream tracking-wide mb-2 uppercase">
                {paso.title}
              </h3>
              <p className="font-barlow text-sm text-cream/50 leading-relaxed">
                {paso.body}
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── TESTIMONIOS ───────────────────────────────────────────────────
const col1Testimonials = [
  {
    text: "Lo que más valoro de trabajar con Bryan es que no se queda solo en hacer algo visualmente bonito. Tiene una forma de ordenar las ideas que ayuda mucho a entender mejor la dirección del proyecto y a tomar decisiones con más claridad.",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    name: "María Gómez",
    role: "Directora Creativa",
  },
  {
    text: "Desde el principio se notó que no iba a entregar cosas por cumplir. Se tomó el tiempo de entender el proyecto, de proponer con intención y de darle una estructura que nos ayudó bastante a ver todo con más sentido.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Andrés Castro",
    role: "Emprendedor",
  },
  {
    text: "En mi caso, que manejo marca personal, necesitaba alguien que no solo diseñara sino que entendiera cómo posicionar lo que hago. Bryan me ayudó a ordenar el mensaje, el contenido y la forma en la que me presento. Todo empezó a tener más sentido.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sofía Ramírez",
    role: "Creadora de Contenido",
  },
]

const col2Testimonials = [
  {
    text: "Antes de trabajar con Bryan teníamos contenido, pero no una dirección clara. Nos ayudó a organizar todo, definir mejor la identidad y empezar a ejecutar de forma más coherente. Se notó bastante en cómo empezó a percibirse la marca.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Daniel Torres",
    role: "Director de Marca",
  },
  {
    text: "Lo que hizo Bryan fue bajar todo a tierra. Teníamos ideas, pero no una estructura clara para ejecutarlas. Nos ayudó a organizar campañas, contenido y piezas de forma que realmente pudiéramos movernos y no quedarnos en lo conceptual.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Alejandro Vargas",
    role: "Fundador",
  },
  {
    text: "Bryan tiene algo que no es tan común, y es que entiende muy bien la parte visual, pero también sabe aterrizar las ideas para que realmente funcionen. Trabajar con él se sintió claro, ordenado y muy bien llevado.",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    name: "Laura Martínez",
    role: "Gerente de Marca",
  },
]

const col3Testimonials = [
  {
    text: "Lo que marcó la diferencia fue que no se quedó en lo creativo. Bryan entendió el punto en el que estábamos, propuso una dirección clara y nos ayudó a estructurar cómo llevar eso a contenido y acciones concretas. Se sintió mucho más ordenado y enfocado.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Sergio López",
    role: "CEO",
  },
  {
    text: "Lo que más me gustó fue su criterio. Tiene sensibilidad creativa, pero también sabe poner orden y pensar en cómo se ejecutan las cosas de verdad. Eso hizo que el proceso se sintiera mucho más sólido.",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
    name: "Paula Herrera",
    role: "Consultora",
  },
  {
    text: "Trabajar con Bryan fue muy positivo porque no solo aporta ideas, también aporta dirección. Tiene una forma muy clara de leer lo que necesita un proyecto y convertirlo en algo coherente, útil y bien resuelto.",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    name: "Javier Moreno",
    role: "Director de Proyectos",
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
            {testimonials.map(({ text, name }, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-ink/10 shadow-sm bg-white max-w-xs w-full"
              >
                <p className="font-barlow text-sm leading-relaxed text-ink/70 italic mb-6">
                  "{text}"
                </p>
                <p className="font-condensed font-bold text-sm text-ink tracking-wide border-t border-ink/8 pt-4">
                  {name}
                </p>
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
          <h2 className="font-akshar font-bold text-[7vw] md:text-[5vw] leading-[1] text-ink">
            QUE PIENSAN DE MI
          </h2>
          <h2 className="font-bristol text-[7vw] md:text-[5vw] leading-[1.2] text-blue uppercase">
            DE MI TRABAJO
          </h2>
        </motion.div>

        {/* Columnas — 3 clientes distintos por columna, sin cruzarse */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={col1Testimonials} duration={18} />
          <TestimonialsColumn testimonials={col2Testimonials} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={col3Testimonials} className="hidden lg:block" duration={20} />
        </div>

      </div>
    </section>
  )
}

// ── TEXT SCRAMBLE ─────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

function TextScramble({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef(null)
  const frameRef = useRef(0)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    const duration = text.length * 3
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      frameRef.current++
      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * text.length)
      const newText = text.split('').map((char, i) => {
        if (char === ' ') return ' '
        if (i < revealedLength) return text[i]
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }).join('')
      setDisplayText(newText)
      if (frameRef.current >= duration) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }, [text])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  return (
    <span className={className} onMouseEnter={scramble}>
      {displayText.split('').map((char, i) => (
        <span key={i} className={`inline-block transition-all duration-150 ${isScrambling && char !== text[i] ? 'text-blue' : ''}`}>
          {char}
        </span>
      ))}
    </span>
  )
}

// ── CONTACTO ──────────────────────────────────────────────────────
function GridPattern({ offsetX, offsetY }) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="contact-grid"
          width="40" height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX} y={offsetY}
        >
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-cream" />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#contact-grid)" />
    </svg>
  )
}

function Contacto() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  useEffect(() => {
    let id
    const step = () => {
      gridOffsetX.set((gridOffsetX.get() + 0.5) % 40)
      gridOffsetY.set((gridOffsetY.get() + 0.5) % 40)
      id = requestAnimationFrame(step)
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      id="contacto"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#EBEBEB] overflow-hidden flex flex-col"
    >
      {/* Grid base tenue */}
      <div className="absolute inset-0 z-0 opacity-[0.08] text-ink">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Grid revelado con máscara de mouse */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40 text-ink"
        style={{ maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`, WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)` }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-24 md:py-36">
        <p className="font-bristol font-bold text-blue text-2xl md:text-3xl mb-4 uppercase">
          ¿Tienes un proyecto?
        </p>

        <h2 className="font-bebas font-bold text-[16vw] md:text-[11vw] leading-[0.85] text-ink tracking-tight mb-8">
          HABLEMOS.
        </h2>

        <p className="font-barlow text-sm leading-relaxed text-ink/60 max-w-lg mb-12">
          Si necesitas estrategia creativa, identidad, contenido o estructura — este es el lugar para abrir conversación.
        </p>

        <a
          href="https://wa.me/573104047075?text=Hola%20Bryan!%20Vi%20tu%20portafolio%2C%20me%20interesa%20tu%20trabajo.%20Me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n%20contigo!"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 font-akshar font-bold text-sm tracking-widest uppercase hover:bg-blue transition-all duration-300"
        >
          <TextScramble text="CONTÁCTAME" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-ink/10 px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div className="flex gap-6 flex-wrap">
          {Object.entries(content.social).map(([platform, url]) => (
            <a key={platform} href={url} target="_blank" rel="noreferrer"
              className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/30 hover:text-blue transition-colors duration-200">
              {platform}
            </a>
          ))}
        </div>
        <p className="font-condensed text-xs text-ink/30 tracking-widest uppercase">
          © {new Date().getFullYear()} {content.name} — Todos los derechos reservados
        </p>
      </div>
    </section>
  )
}

// ── GOOEY TEXT ────────────────────────────────────────────────────
function GooeyText({ texts, morphTime = 1, cooldownTime = 0.25, className = '' }) {
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  const indexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(null)

  useEffect(() => {
    let animId
    let lastTime = performance.now()

    const setMorph = (fraction) => {
      if (!text1Ref.current || !text2Ref.current) return
      const f = fraction
      const blurOut = Math.min(8 / (1 - f + 0.001) - 8, 40)
      const blurIn  = Math.min(8 / (f + 0.001) - 8, 40)
      text1Ref.current.style.filter  = `blur(${blurOut}px)`
      text1Ref.current.style.opacity = `${Math.pow(1 - f, 0.4)}`
      text2Ref.current.style.filter  = `blur(${blurIn}px)`
      text2Ref.current.style.opacity = `${Math.pow(f, 0.4)}`
      text1Ref.current.textContent   = texts[indexRef.current % texts.length]
      text2Ref.current.textContent   = texts[(indexRef.current + 1) % texts.length]
    }

    const doCooldown = () => {
      if (!text1Ref.current || !text2Ref.current) return
      morphRef.current = 0
      // texto entrante: completamente visible y nítido
      text2Ref.current.style.filter  = 'none'
      text2Ref.current.style.opacity = '1'
      // texto saliente: invisible
      text1Ref.current.style.filter  = 'none'
      text1Ref.current.style.opacity = '0'
    }

    const animate = (now) => {
      animId = requestAnimationFrame(animate)
      const dt = (now - lastTime) / 1000
      lastTime = now

      cooldownRef.current -= dt
      if (cooldownRef.current <= 0) {
        morphRef.current += dt
        if (morphRef.current >= morphTime) {
          cooldownRef.current = cooldownTime
          morphRef.current = 0
          indexRef.current++
          doCooldown()
        } else {
          setMorph(morphRef.current / morphTime)
        }
      }
    }

    // init
    if (text1Ref.current) text1Ref.current.textContent = texts[0]
    if (text2Ref.current) text2Ref.current.textContent = texts[1]
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [texts, morphTime, cooldownTime])

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey-morph">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span ref={text1Ref} className={className} style={{ position: 'absolute', whiteSpace: 'nowrap' }} />
        <span ref={text2Ref} className={className} style={{ position: 'absolute', whiteSpace: 'nowrap' }} />
        {/* Spacer invisible para dar altura al contenedor */}
        <span className={className} style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>
          {texts.reduce((a, b) => a.length > b.length ? a : b, '')}
        </span>
      </div>
    </>
  )
}

function GooeySection() {
  return (
    <section className="bg-ink py-4 md:py-5 flex items-center justify-center overflow-hidden">
      <div className="flex items-center justify-center h-12 md:h-14 w-full">
        <GooeyText
          texts={["ESTRATEGIA", "PLANIFICACIÓN", "EJECUCIÓN"]}
          morphTime={1.5}
          cooldownTime={2.5}
          className="font-akshar font-bold text-[5vw] md:text-[3.5vw] text-cream leading-none"
        />
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
      <Herramientas />
      <Trabajo />
      <Planeacion />
      <Process />
      <Testimonios />
      <Contacto />
      <GooeySection />
    </main>
  )
}
