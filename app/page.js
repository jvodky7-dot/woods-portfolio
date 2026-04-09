'use client'
import { useEffect, useRef, useState } from 'react'
import { content } from '../content'

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

// ── PAPERCLIP SVG ────────────────────────────────────────────────
function Paperclip({ color = '#1440FF' }) {
  return (
    <svg width="18" height="48" viewBox="0 0 18 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4 C4 4 2 8 2 12 L2 38 C2 43 5 46 9 46 C13 46 16 43 16 38 L16 14 C16 10 13.5 8 11 8 C8.5 8 6 10 6 14 L6 36 C6 38.5 7.5 40 9 40 C10.5 40 12 38.5 12 36 L12 16"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ── NAV ──────────────────────────────────────────────────────────
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
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="#hero" className="font-bebas text-xl tracking-widest text-ink">
          {content.name}
        </a>
        <div className="hidden md:flex gap-8 font-condensed font-bold text-xs tracking-widest uppercase">
          {['Sobre mí', 'Rol', 'Trabajo', 'Contacto'].map((label, i) => (
            <a key={i} href={`#${['about', 'role', 'work', 'contact'][i]}`}
              className="text-ink hover:text-blue transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ── HERO ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#EBEBEB]">
      {/* Large BG name watermark */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
        <span className="font-bebas text-[28vw] leading-none text-black/[0.04] whitespace-nowrap translate-y-4">
          {content.name.toUpperCase()}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: Text */}
          <div>
            {/* Handwritten blue label */}
            <p className="font-marker text-blue text-xl mb-3 rotate-[-1deg] inline-block">
              Portafolio 2025
            </p>

            {/* Main name */}
            <h1 className="font-bebas text-[22vw] md:text-[12vw] leading-[0.85] text-ink tracking-tight">
              {content.name.toUpperCase()}
            </h1>

            {/* Blue layered subtitle */}
            <div className="mt-2 mb-6">
              <span className="font-bebas text-[7vw] md:text-[4vw] text-blue leading-none block tracking-tight">
                {content.title}
              </span>
              <div className="flex gap-4 mt-2 font-condensed font-700 text-sm tracking-widest uppercase text-ink/60">
                <span>{content.subtitleLine1}</span>
                <span>·</span>
                <span>{content.subtitleLine2}</span>
                <span>·</span>
                <span>{content.location}</span>
              </div>
            </div>

            {/* Role tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {content.rolTags.slice(0, 4).map((tag) => (
                <span key={tag} className="skill-badge">{tag}</span>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="mt-12 flex items-center gap-3 font-condensed text-xs tracking-widest uppercase text-ink/40">
              <div className="w-8 h-px bg-ink/30" />
              <span>Scroll</span>
            </div>
          </div>

          {/* Right: Halftone portrait placeholder */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative">
              {/* Main portrait box */}
              <div className="halftone-placeholder w-[280px] h-[360px] md:w-[360px] md:h-[460px] bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-sm overflow-hidden">
                {/* Placeholder silhouette */}
                <div className="absolute inset-0 flex items-end justify-center pb-0">
                  <svg viewBox="0 0 200 300" className="w-full h-full opacity-30" fill="none">
                    <circle cx="100" cy="75" r="42" fill="#1a1a1a" />
                    <path d="M20 300 C20 210 180 210 180 300" fill="#1a1a1a" />
                  </svg>
                </div>
                {/* Halftone texture done via CSS ::before in globals.css */}
              </div>

              {/* Floating handle tag */}
              <div className="absolute -bottom-5 -left-6 bg-ink text-cream px-4 py-2 font-condensed font-bold text-sm tracking-widest uppercase rotate-[-2deg]">
                {content.handle}
              </div>

              {/* Gold accent line */}
              <div className="absolute -right-3 top-8 w-1 h-24 bg-gold" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink/10" />
    </section>
  )
}

// ── ABOUT ────────────────────────────────────────────────────────
function About() {
  const ref = useFadeIn()
  return (
    <section id="about" className="bg-[#EBEBEB] py-24 md:py-32">
      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Halftone portrait (smaller) */}
          <div className="relative hidden md:block">
            <div className="halftone-placeholder w-[280px] h-[380px] bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-sm" />
            {/* Blue line accent */}
            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-blue/30" />
          </div>

          {/* Right: About card */}
          <div className="relative">
            {/* Paper card */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-black/8 p-8 md:p-10 shadow-sm">
              <BinderClip />

              <h2 className="font-bebas text-5xl md:text-6xl tracking-tight mb-1 text-ink">
                ABOUT ME.
              </h2>

              <div className="w-12 h-0.5 bg-blue mb-6" />

              <div className="flex items-start gap-4 mb-6">
                {/* Polaroid mini */}
                <div className="polaroid flex-shrink-0 w-[80px]">
                  <div className="w-full h-[80px] bg-gradient-to-br from-zinc-200 to-zinc-400" />
                </div>
                <div>
                  <p className="font-condensed font-900 text-2xl text-ink tracking-tight">{content.name}</p>
                  <p className="font-marker text-blue text-sm mt-0.5">{content.location}</p>
                </div>
              </div>

              <p className="font-barlow text-sm leading-relaxed text-ink/80 mb-4">
                {content.bio}
              </p>

              <div className="flex items-center gap-2 mt-6 border-t border-black/8 pt-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink/50">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                <span className="font-condensed font-bold text-sm text-ink/60 tracking-wide">{content.handle}</span>
              </div>
            </div>

            {/* Blue paperclip */}
            <div className="absolute -top-3 right-12">
              <Paperclip color="#1440FF" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── ROLE ─────────────────────────────────────────────────────────
function Role() {
  const ref = useFadeIn()
  return (
    <section id="role" className="bg-ink py-24 md:py-36 overflow-hidden relative">
      {/* Gold horizontal line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gold/20 pointer-events-none" />

      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">

        <p className="font-marker text-gold text-lg mb-4">¿Qué hago?</p>

        <h2 className="font-bebas text-[8vw] md:text-[6vw] leading-[1] text-cream tracking-tight max-w-4xl">
          {content.rolHeadline}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-10">
          {content.rolTags.map((tag) => (
            <span key={tag}
              className="border border-cream/20 px-4 py-2 font-condensed font-bold text-xs tracking-widest uppercase text-cream/60 hover:border-blue hover:text-blue transition-colors duration-200 cursor-default">
              {tag}
            </span>
          ))}
        </div>

        {/* Big blue word decoration */}
        <div className="mt-16 overflow-hidden">
          <p className="font-bebas text-[20vw] leading-none text-blue/10 select-none pointer-events-none -mb-4">
            STRATEGY
          </p>
        </div>
      </div>
    </section>
  )
}

// ── SKILLS ───────────────────────────────────────────────────────
function Skills() {
  const ref = useFadeIn()
  return (
    <section id="skills" className="bg-[#EBEBEB] py-24 md:py-32">
      <div ref={ref} className="fade-in max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div>
            <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40 mb-2">Especialidad</p>
            <h2 className="font-bebas text-5xl md:text-7xl leading-[0.9] text-ink mb-2">
              {content.specialtyLabel}
            </h2>
            <p className="font-marker text-blue text-2xl mt-2">{content.specialtyValue}</p>

            <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40 mt-8 mb-3">
              My Toolkits
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Ai', 'Ps', 'Ae', 'Pr'].map((tool) => (
                <span key={tool} className="font-condensed font-900 text-sm border-2 border-ink px-3 py-1 tracking-widest">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/40 mb-4">Skills</p>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill) => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── WORK ─────────────────────────────────────────────────────────
// Placeholder color blocks for image slots
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
          {/* Placeholder label */}
          <div className="absolute bottom-2 left-3 font-condensed font-bold text-xs text-white/50 uppercase tracking-widest">
            {label} {String(i + 1).padStart(2, '0')}
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionHeader({ title, subtitle, dark = false }) {
  const ref = useFadeIn()
  return (
    <div ref={ref} className={`fade-in py-20 md:py-28 overflow-hidden relative ${dark ? 'bg-ink' : 'bg-[#EBEBEB]'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* BG watermark */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
          <span className={`font-bebas text-[22vw] leading-none whitespace-nowrap ${dark ? 'text-white/[0.04]' : 'text-black/[0.04]'}`}>
            {title.toUpperCase()}
          </span>
        </div>

        <div className="relative z-10">
          <span className={`font-condensed font-bold text-xs tracking-widest uppercase ${dark ? 'text-cream/30' : 'text-ink/30'} block mb-2`}>
            Mi trabajo
          </span>
          {/* Two-font title like the reference */}
          <div className="relative inline-block">
            <h2 className={`font-bebas text-[10vw] md:text-[7vw] leading-none ${dark ? 'text-cream/80' : 'text-ink/80'} tracking-tight`}>
              {title.toUpperCase()}
            </h2>
            <span className="font-marker text-blue text-[5vw] md:text-[3vw] absolute -top-2 right-0 translate-x-1/4 rotate-[-3deg] leading-none">
              {subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Work() {
  return (
    <div id="work">

      {/* ── BRANDING ── */}
      <SectionHeader title="Branding" subtitle="Identidad" dark={true} />
      <section className="bg-ink pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="font-barlow text-cream/50 text-sm max-w-md mb-2">
            {content.workCategories[0].description}
          </p>
          <p className="font-condensed font-bold text-xs tracking-widest uppercase text-cream/20 mb-6">
            Clothes · Food · Places · Fitness · Lifestyle
          </p>
          <WorkGrid count={6} label="Brand" />
        </div>
      </section>

      {/* ── SOCIAL MEDIA ── */}
      <section id="social-section" className="bg-[#EBEBEB] py-0">
        {/* Torn paper edge on top */}
        <div className="relative h-8 bg-[#EBEBEB] torn-top overflow-visible" style={{ background: '#EBEBEB' }} />

        <div className="bg-[#EBEBEB] pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">

            <div className="mb-8">
              <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/30 mb-1">Social Media</p>
              {/* Layered title like reference */}
              <div className="relative inline-block">
                <h2 className="font-bebas text-[10vw] md:text-[7vw] text-ink/80 leading-none">
                  SOCIALMEDIA
                </h2>
                <span className="font-marker text-gold text-[5vw] md:text-[3vw] absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  contenido
                </span>
              </div>
              <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/30 mt-2">
                Post · Reels · Carrousel · Stories
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`work-card aspect-square bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]}`}>
                  <div className="work-overlay"><span>Ver</span></div>
                  <div className="absolute bottom-2 left-2 font-condensed font-bold text-[10px] text-white/40 uppercase tracking-widest">
                    SM {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
              {/* Phone mockup */}
              <div className="hidden md:flex col-span-1 row-span-3 items-center justify-center">
                <div className="w-[140px] h-[260px] bg-ink rounded-[20px] border-4 border-zinc-700 flex flex-col overflow-hidden shadow-xl">
                  <div className="h-4 flex items-center justify-center">
                    <div className="w-10 h-1 bg-zinc-600 rounded-full mt-1" />
                  </div>
                  <div className="flex-1 bg-[#EBEBEB] grid grid-cols-3 gap-px p-px">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={`bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-right">
              <p className="font-condensed font-bold text-xs tracking-widest uppercase text-ink/30">
                Food · Clothes · Medicine · Carwash · Drinks · Furniture · Jewelry & More…
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTOGRAPHY ── */}
      <SectionHeader title="Photography" subtitle="Visual" dark={false} />
      <section className="bg-[#EBEBEB] pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-6 mb-6 font-condensed font-bold text-xs tracking-widest uppercase text-ink/40">
            {['Comercial', 'Editorial', 'Producto', 'Social', 'Moda'].map((cat) => (
              <span key={cat}>{cat}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`work-card ${i === 2 || i === 5 ? 'row-span-2' : ''} ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'} bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]}`}>
                <div className="work-overlay"><span>{['Social', 'Moda', 'Producto', 'Comercial', 'Editorial', 'Social', 'Moda', 'Producto'][i]}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

// ── CONTACT ──────────────────────────────────────────────────────
function Contact() {
  const ref = useFadeIn()
  return (
    <section id="contact" className="bg-ink py-24 md:py-32 relative overflow-hidden">
      {/* Big watermark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <p className="font-bebas text-[20vw] leading-none text-white/[0.03] whitespace-nowrap">
          LET'S WORK
        </p>
      </div>

      <div ref={ref} className="fade-in relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-marker text-gold text-xl mb-4">¿Hablamos?</p>
        <h2 className="font-bebas text-[10vw] md:text-[6vw] leading-[0.9] text-cream tracking-tight mb-10">
          GRACIAS POR LLEGAR HASTA ACÁ.
        </h2>

        {/* Email CTA */}
        <a href={`mailto:${content.email}`}
          className="inline-flex items-center gap-3 border border-cream/20 px-8 py-4 font-condensed font-bold text-sm tracking-widest uppercase text-cream hover:bg-blue hover:border-blue transition-all duration-300 mb-12">
          {content.email}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Social links */}
        <div className="flex gap-6 mb-16 flex-wrap">
          {Object.entries(content.social).map(([platform, url]) => (
            <a key={platform} href={url} target="_blank" rel="noreferrer"
              className="font-condensed font-bold text-xs tracking-widest uppercase text-cream/30 hover:text-blue transition-colors duration-200">
              {platform}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="font-bebas text-2xl text-cream/20 tracking-widest">{content.name}</p>
          <p className="font-condensed text-xs text-cream/20 tracking-widest uppercase">
            © {new Date().getFullYear()} — Todos los derechos reservados
          </p>
        </div>
      </div>
    </section>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Role />
      <Skills />
      <Work />
      <Contact />
    </main>
  )
}
