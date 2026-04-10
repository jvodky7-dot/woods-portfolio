'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { content } from '../content'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import createGlobe from 'cobe'
import { motion, useMotionValue, animate } from 'framer-motion'
import { Layers, Grid2X2, Lightbulb, Settings2 } from 'lucide-react'
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
  { name: "Notion",             src: "https://svgl.app/library/notion-wordmark-light.svg" },
  { name: "Google Drive",       src: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_(2020).svg" },
  { name: "ClickUp",            src: "https://svgl.app/library/clickup.svg" },
  { name: "Adobe Photoshop",    src: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Figma",              src: "https://svgl.app/library/figma.svg" },
  { name: "Canva",              src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg" },
  { name: "Pinterest",          src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" },
  { name: "Framer",             src: "https://svgl.app/library/framer.svg" },
  { name: "CapCut",             src: "https://upload.wikimedia.org/wikipedia/commons/7/75/CapCut_logo.png" },
  { name: "Metricool",          src: "https://upload.wikimedia.org/wikipedia/commons/8/82/Metricool_Logo.png" },
  { name: "Meta Business",      src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Meta Ads",           src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" },
  { name: "OpenAI",             src: "https://svgl.app/library/openai_wordmark_light.svg" },
  { name: "Claude",             src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg" },
  { name: "NotebookLM",         src: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notebooklm_logo.png" },
  { name: "Gemini",             src: "https://svgl.app/library/gemini-wordmark.svg" },
  { name: "Vercel",             src: "https://svgl.app/library/vercel_wordmark.svg" },
  { name: "GitHub",             src: "https://svgl.app/library/github_wordmark_light.svg" },
]

function Herramientas() {
  const ref = useFadeIn()
  return (
    <section id="herramientas" className="bg-[#EBEBEB] py-24 md:py-32">
      <div ref={ref} className="fade-in">

        {/* Heading — centrado en la página, texto alineado igual que la referencia */}
        <div className="mb-10 px-6 flex justify-center">
          <div className="inline-block">
            <p className="font-marker text-blue text-2xl md:text-3xl leading-none mb-0 uppercase">
              Utilizo estas
            </p>
            <h2 className="font-akshar font-bold text-[13vw] md:text-[9vw] leading-[0.88] text-ink tracking-tight uppercase">
              HERRAMIENTAS
            </h2>
            <p className="font-marker text-blue text-2xl md:text-3xl leading-none mt-0 uppercase text-right">
              EN MI TRABAJO
            </p>
          </div>
        </div>

        {/* Divider + subline */}
        <div className="max-w-sm mx-auto h-px bg-ink/15 mb-6 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <p className="text-center font-barlow text-ink/50 text-sm mb-6">
          <span className="block">Trusted by experts.</span>
          <span className="block font-semibold text-ink">Used by the leaders.</span>
        </p>

        {/* Infinite slider — solo texto, sin imágenes externas rotas */}
        <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] overflow-hidden">
          <InfiniteSlider gap={32} duration={35} durationOnHover={70}>
            {herramientas.map((tool) => (
              <span
                key={tool.name}
                className="shrink-0 font-condensed font-bold text-sm tracking-widest uppercase whitespace-nowrap border border-ink/20 px-4 py-2 text-ink/70 hover:border-ink hover:text-ink transition-colors duration-200"
              >
                {tool.name}
              </span>
            ))}
          </InfiniteSlider>
        </div>

        <div className="mt-8 h-px bg-ink/15 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
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
      <Herramientas />
      <Trabajo />
      <Planeacion />
      <Identidad />
      <Process />
      <Testimonios />
      <Contacto />
    </main>
  )
}
