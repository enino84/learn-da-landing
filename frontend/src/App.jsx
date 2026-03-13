import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COURSE_URL = 'https://enino84.github.io/courses/intro_data_assimilation/'
const PYTEDA_URL = 'http://www.learn-da.com:8000/'
const PIP_PKG    = 'pyteda'

/* ── tiny hook ── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── reusable image placeholder ── */
function ImgPlaceholder({ hint, height = 180, accent = 'rgba(201,168,76,.28)', bg = 'rgba(201,168,76,.04)' }) {
  return (
    <div style={{
      borderRadius: 10,
      border: `1px dashed ${accent}`,
      background: bg,
      height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      color: accent,
      fontFamily: 'var(--ff-mono)',
      fontSize: 9,
      letterSpacing: '.12em',
      textAlign: 'center',
      padding: '0 20px',
    }}>
      <div style={{ fontSize: 22 }}>🖼</div>
      <div style={{ fontWeight: 600 }}>IMAGE PLACEHOLDER</div>
      {hint && <div style={{ fontSize: 8, opacity: .8, lineHeight: 1.55, maxWidth: 320 }}>{hint}</div>}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   FOUNDER MODAL
══════════════════════════════════════════════════ */
function FounderModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="founder-overlay open"
          onClick={e => e.target === e.currentTarget && onClose()}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="founder-modal"
            initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
            <div className="founder-modal-header">
              <span className="founder-modal-title">A message from the founder</span>
              <button className="founder-close" onClick={onClose}>✕</button>
            </div>
            <div className="founder-modal-body">
              <p>Learn-DA was born from a clear vision: <b>the scientific tools behind modern weather and climate forecasting are extraordinarily powerful — and every researcher, student, and team should be able to use them, regardless of their institution's infrastructure.</b></p>
              <p>During my Ph.D. and throughout my academic career, I saw brilliant researchers and students spending enormous effort just trying to <b>set up, configure, and run</b> atmospheric models — before they could even reach the science they were passionate about. That gap between curiosity and capability inspired everything we built.</p>
              <p>Learn-DA exists to close that gap. Whether you are a <b>PhD student discovering data assimilation for the first time</b>, a <b>university professor</b> building reproducible simulation workflows for your courses, or a team ready to run <b>regional or global climate experiments</b> — the platform delivers the same scientific rigor, without the infrastructure overhead.</p>
              <p>The mission is simple: make ensemble data assimilation and atmospheric modeling <b>transparent, accessible, and genuinely useful</b> — for science, for education, and for the real-world decisions that depend on accurate atmospheric knowledge.</p>
              <div className="modal-sig">
                — Elías D. Niño-Ruiz, Ph.D.</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════ */
function Nav({ onFounder }) {
  const sections = ['who-we-serve', 'energy', 'platform', 'simulate', 'learn', 'contact']
  const labels   = ['Who We Serve', 'Energy', 'Platform', 'Simulate', 'Learn', 'Contact']
  return (
    <nav>
      <div className="wrap nav-inner">
        <a href="#" className="nav-logo-link">
          <img src="/logo.png" alt="Learn-DA" className="nav-logo-img" />
        </a>
        <ul className="nav-links">
          {sections.map((s, i) => (
            <li key={s}>
              <a href={`#${s}`} onClick={e => {
                e.preventDefault()
                document.getElementById(s)?.scrollIntoView({ behavior: 'smooth' })
              }}>{labels[i]}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={onFounder}>From the founder</button>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero">
      <div className="wrap">

        <motion.div className="hero-logo-wrap"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <img src="/logo.png" alt="Learn-DA" className="hero-logo" />
        </motion.div>

        <motion.div className="hero-kicker"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05, duration: .6 }}>
          <span className="kicker-dot" />
          Scientific Forecasting &amp; Learning Platform
          <span className="kicker-dot" />
        </motion.div>

        <motion.h1 className="hero-h1"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .7 }}>
          Where data assimilation<br />
          <em>meets the real atmosphere</em>
        </motion.h1>

        <motion.p className="hero-sub"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7 }}>
          Physics-based climate &amp; meteorological simulations for energy companies,
          solar &amp; wind farm operators, and academic researchers — from product assessment
          to PhD-grade data assimilation experiments.
        </motion.p>

        <motion.div className="pill-row"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3, duration: .6 }}>
          {['Ensemble Data Assimilation','Regional Climate Models','Global Atmospheric Models','Wind & Solar','Colombia · Caribbean'].map((t, i) => (
            <span key={i} className={`pill ${['pill-gold','pill-sky','pill-teal','pill-sky','pill-gold'][i]}`}>{t}</span>
          ))}
        </motion.div>

        <motion.div className="hero-btns"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .38, duration: .6 }}>
          <button className="btn-gold" onClick={() => document.getElementById('who-we-serve')?.scrollIntoView({ behavior: 'smooth' })}>
            See Who We Help
          </button>
          <button className="btn-outline" onClick={() => document.getElementById('simulate')?.scrollIntoView({ behavior: 'smooth' })}>
            Run a Simulation
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .7 }}
          style={{ marginTop: 52 }}>
          <img
            src="/hero-bg.jpg"
            alt="Atmospheric simulation over Colombia and the Caribbean"
            style={{
              width: '100%',
              borderRadius: 16,
              display: 'block',
              objectFit: 'cover',
              height: 260,
              border: '1px solid rgba(201,168,76,.15)',
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   WHO WE SERVE
══════════════════════════════════════════════════ */
function WhoWeServe() {
  const audiences = [
    {
      icon: '🏭',
      tag: 'Manufacturers',
      color: '#c9a84c',
      colorAlpha: 'rgba(201,168,76,.10)',
      colorBorder: 'rgba(201,168,76,.22)',
      title: 'Solar & Wind Product Makers',
      subtitle: 'You build the hardware. We quantify its energy potential.',
      desc: 'Companies designing solar panels, wind turbines, or hybrid systems can commission physics-based simulations to estimate real-world energy yield before deployment — by region, season, and atmospheric condition.',
      items: ['Energy yield forecasting by geography', 'Performance benchmarking under real atmospheres', 'Climate suitability reports for new products'],
      img: '/who-manufacturers.jpg',
    },
    {
      icon: '⚡',
      tag: 'Energy Operators',
      color: '#4faedc',
      colorAlpha: 'rgba(79,174,220,.10)',
      colorBorder: 'rgba(79,174,220,.22)',
      title: 'Existing Solar Farms & Wind Parks',
      subtitle: 'Already generating? We can optimize and validate.',
      desc: 'If you operate solar farms, wind parks, or hybrid energy installations, our regional and global climate simulations and data assimilation pipelines can assess output potential, identify inefficiencies, and improve forecasting accuracy.',
      items: ['Site-specific regional atmospheric modeling', 'Solar irradiance & wind profile analysis', 'Forecast-vs-actual comparison & correction'],
      img: '/who-operators.jpg',
    },
    {
      icon: '🎓',
      tag: 'Academia',
      color: '#7ec8a0',
      colorAlpha: 'rgba(126,200,160,.10)',
      colorBorder: 'rgba(126,200,160,.22)',
      title: 'Researchers & PhD Students',
      subtitle: 'Scientific-grade tools, open to the academic community.',
      desc: 'University professors and doctoral researchers can access our regional and global climate simulation infrastructure, ensemble data assimilation frameworks, and interactive tooling for reproducible experiments and publications.',
      items: ['Run regional & global atmospheric model experiments', 'Ensemble data assimilation: EnKF / LETKF support', 'Publish-ready outputs & reproducible workflows'],
      img: '/who-academia.jpg',
    },
  ]

  return (
    <section id="who-we-serve" style={{ padding: '88px 0 72px' }}>
      <div className="wrap">
        <div className="section-eyebrow reveal" style={{ marginBottom: 12 }}>Who We Serve</div>
        <h2 className="section-h2 reveal" style={{ marginBottom: 14 }}>
          One platform,<br />
          <span className="text-gold">three kinds of impact</span>
        </h2>
        <p className="section-body reveal" style={{ maxWidth: 600, marginBottom: 56 }}>
          Whether you manufacture energy hardware, operate renewable installations,
          or push the frontier of atmospheric science — Learn-DA has the tools and expertise to support you.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {audiences.map((a, i) => (
            <div
              key={a.tag}
              className="reveal"
              style={{
                animationDelay: `${i * .1}s`,
                background: a.colorAlpha,
                border: `1px solid ${a.colorBorder}`,
                borderRadius: 16,
                padding: '0 0 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${a.color}, transparent)`, zIndex: 1 }} />

              {/* Image — no white bg needed, these are real photos */}
              <div style={{
                width: '100%',
                height: 160,
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img
                  src={a.img}
                  alt={a.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Card body */}
              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div style={{
                    fontSize: 26,
                    width: 48, height: 48,
                    borderRadius: 12,
                    background: a.colorAlpha,
                    border: `1px solid ${a.colorBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {a.icon}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--ff-mono)',
                      fontSize: 9,
                      letterSpacing: '.18em',
                      textTransform: 'uppercase',
                      color: a.color,
                      marginBottom: 3,
                    }}>{a.tag}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text1)', lineHeight: 1.3 }}>{a.title}</div>
                  </div>
                </div>

                <div style={{
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: a.color,
                  marginBottom: 14,
                  paddingBottom: 14,
                  borderBottom: `1px solid ${a.colorBorder}`,
                  lineHeight: 1.5,
                }}>{a.subtitle}</div>

                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 20 }}>{a.desc}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                  {a.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                      <span style={{ color: a.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="reveal" style={{
          marginTop: 44,
          padding: '22px 32px',
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text1)', marginBottom: 4 }}>Not sure which category fits you?</div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>Most of our projects combine elements from all three. Let's talk about your specific situation.</div>
          </div>
          <a href="mailto:elias@learn-da.com" className="btn-gold" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Talk to us →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   ENERGY
══════════════════════════════════════════════════ */
function Energy() {
  return (
    <section id="energy">
      <div className="wrap">
        <div className="section-eyebrow reveal">Renewable Energy</div>
        <h2 className="section-h2 reveal">
          We help companies estimate<br />
          <span className="text-gold">their renewable energy potential</span>
        </h2>
        <p className="section-body reveal" style={{ maxWidth: 660, marginBottom: 56 }}>
          Using regional and global atmospheric models continuously improved with observational data,
          we produce physics-based assessments of wind and solar resources — the kind of rigorous analysis
          that turns investment decisions into confident ones.
        </p>

        <div className="energy-grid">
          <div className="ecard reveal" style={{ '--ec': '#c9a84c' }}>
            <div className="ecard-top">
              <div className="ecard-icon">☀️</div>
              <div className="ecard-badge">Solar</div>
            </div>
            <h3>Solar Irradiance Studies</h3>
            <p>Full GHI, DNI, and DHI forecasts derived from high-resolution atmospheric model outputs. We quantify the energetic potential of your site with hourly to seasonal resolution, accounting for cloud cover, aerosols, and terrain effects.</p>
            <div style={{ margin: '16px 0', borderRadius: 10, overflow: 'hidden', height: 140 }}>
              <img src="/energy-solar.jpg" alt="Solar irradiance visualization" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <ul className="ecard-list">
              {['Global Horizontal Irradiance (GHI)','Direct Normal Irradiance (DNI)','Diffuse Horizontal Irradiance (DHI)','PV performance estimation','Seasonal variability analysis'].map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="ecard-tag">Regional Models · Colombia · Caribbean</div>
          </div>

          <div className="ecard reveal" style={{ '--ec': '#4faedc', animationDelay: '.1s' }}>
            <div className="ecard-top">
              <div className="ecard-icon">💨</div>
              <div className="ecard-badge" style={{ background: 'rgba(79,174,220,.12)', borderColor: 'rgba(79,174,220,.3)', color: '#a0d8f0' }}>Wind</div>
            </div>
            <h3>Wind Resource Assessment</h3>
            <p>Multi-level wind speed and direction profiles derived from high-resolution regional atmospheric model runs. Hub-height extrapolation, turbulence intensity, and capacity factor estimates — the full picture for wind project development.</p>
            <div style={{ margin: '16px 0', borderRadius: 10, overflow: 'hidden', height: 140 }}>
              <img src="/energy-wind.jpg" alt="Wind resource assessment visualization" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <ul className="ecard-list">
              {['Hub-height wind profiles (50–150 m)','Turbulence intensity & shear exponent','Capacity factor estimation','Extreme event frequency analysis','Grid integration studies'].map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="ecard-tag">Regional Models · Hub-height · Colombia · Caribbean</div>
          </div>
        </div>

        <div className="method-strip reveal">
          <div className="method-label">How we compute it</div>
          <div className="method-steps">
            {[
              ['01','Model Setup','Domain configuration, boundary conditions, and physics parameterizations for your region'],
              ['02','Global Forcing','Planetary-scale atmospheric simulation providing large-scale forcing for regional nesting'],
              ['03','DA Update','Ensemble Kalman Filter assimilation of observations to correct systematic model biases'],
              ['04','Delivery','Energy indices, reports, data pipelines, or dashboard integration'],
            ].map(([n, t, d]) => (
              <div className="mstep" key={n}>
                <div className="mstep-n">{n}</div>
                <div className="mstep-t">{t}</div>
                <div className="mstep-d">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   PLATFORM CARDS
══════════════════════════════════════════════════ */
function CopyButton() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(`pip install ${PIP_PKG}`).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div>
      <div className="code-box">
        <code>pip install {PIP_PKG}</code>
        <button className="copy-btn" onClick={copy}>{copied ? '✓' : 'Copy'}</button>
      </div>
      {copied && <div id="copyStatus">✓ Copied!</div>}
    </div>
  )
}

function Platform() {
  const cards = [
    {
      href: COURSE_URL,
      img: '/course.jpg',
      pills: [['pill-sky','Theory'],['pill-teal','EnKF']],
      title: 'DA Course',
      desc: 'Structured learning path covering the fundamentals of data assimilation — from intuition and theory to ensemble methods and diagnostics.',
      cta: 'Go to course →'
    },
    {
      href: PYTEDA_URL,
      img: '/pyteda.png',
      pills: [['pill-teal','Interactive Lab'],['pill-sky','LETKF']],
      title: 'PyTEDA',
      desc: 'Run atmospheric data assimilation experiments directly in the browser. Compare EnKF and LETKF behavior visually on chaotic toy models.',
      cta: 'Open PyTEDA →'
    },
  ]
  const soon = [
    { title: 'Colombian Weather Forecast', desc: 'Operational-style regional atmospheric experiments and verification dashboards for Colombia.', tag: 'Regional Model' },
    { title: 'North Caribbean Forecast', desc: 'Regional climate forecasts and learning modules for the North Caribbean domain.', tag: 'Regional Model' },
    { title: 'Barranquilla Forecast', desc: 'City-scale forecast with arroyo flash-flood awareness and precipitation risk context.', tag: 'Regional Model' },
  ]
  return (
    <section id="platform">
      <div className="wrap">
        <div className="section-eyebrow reveal">Platform</div>
        <h2 className="section-h2 reveal">Tools, courses <span className="text-soft">and forecasts</span></h2>
        <p className="section-body reveal" style={{ maxWidth: 620, marginBottom: 52 }}>
          From hands-on interactive labs with toy models to operational regional atmospheric forecasting pipelines for Colombia and the Caribbean.
        </p>
        <div className="cards-grid">
          {cards.map(c => (
            <a href={c.href} target="_blank" rel="noopener" style={{ display: 'block', textDecoration: 'none' }} key={c.title}>
              <div className="pcard reveal">
                {/* White background so logos render cleanly without dark border artifact */}
                <div style={{ background: '#ffffff', borderRadius: 8, overflow: 'hidden', marginBottom: 12, lineHeight: 0 }}>
                  <img className="pcard-img" src={c.img} alt={c.title} style={{ display: 'block', width: '100%' }} />
                </div>
                <div className="pcard-pills">{c.pills.map(([cls, lbl]) => <span key={lbl} className={`pill ${cls}`} style={{ fontSize: 9 }}>{lbl}</span>)}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="pcard-cta">{c.cta}</div>
              </div>
            </a>
          ))}

          <div className="pcard reveal" style={{ animationDelay: '.1s' }}>
            <div style={{ background: '#ffffff', borderRadius: 8, overflow: 'hidden', marginBottom: 12, lineHeight: 0 }}>
              <img className="pcard-img" src="/pyteda.png" alt="Install PyTEDA" style={{ display: 'block', width: '100%' }} />
            </div>
            <div className="pcard-pills">
              <span className="pill pill-gold" style={{ fontSize: 9 }}>pip</span>
              <span className="pill pill-teal" style={{ fontSize: 9 }}>Python</span>
            </div>
            <h3>Install PyTEDA</h3>
            <p>Install locally for Jupyter notebooks, teaching demos, and reproducible research workflows.</p>
            <CopyButton />
          </div>

          {soon.map((s, i) => (
            <div className="pcard pcard-soon reveal" key={s.title} style={{ animationDelay: `${.15 + i * .05}s` }}>
              <img className="pcard-img pcard-img-cover" src="/coming-soon.png" alt={s.title} />
              <div className="coming-soon-badge">Coming Soon</div>
              <div className="pcard-pills"><span className="pill pill-amber" style={{ fontSize: 9 }}>{s.tag}</span></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   ON-DEMAND SIMULATION
══════════════════════════════════════════════════ */
function Simulate() {
  const models = [
    {
      name: 'Lorenz-96',
      desc: 'Classic chaotic toy model — the canonical testbed for ensemble data assimilation. Run EnKF and LETKF experiments and compare them side-by-side in real time.',
      pills: [['pill-teal','Live'],['pill-sky','EnKF · LETKF']],
      href: PYTEDA_URL,
      ready: true
    },
    {
      name: 'QG Model',
      desc: 'Quasi-geostrophic model for mid-latitude atmospheric dynamics. Ideal for studying baroclinic instability and large-scale flow patterns with data assimilation.',
      pills: [['pill-amber','Coming Soon']],
      ready: false
    },
    {
      name: 'Regional Climate Model',
      label: 'WRF',
      desc: 'High-resolution mesoscale atmospheric simulation over Colombia and the Caribbean — for weather forecasting and renewable energy applications.',
      pills: [['pill-amber','Coming Soon'],['pill-sky','WRF · Mesoscale']],
      ready: false
    },
    {
      name: 'Global Atmospheric Model',
      label: 'SPEEDY AT-GCM',
      desc: 'Planetary-scale general circulation model — simulate large-scale atmospheric dynamics and use it as boundary forcing for regional experiments.',
      pills: [['pill-amber','Coming Soon'],['pill-gold','SPEEDY · AT-GCM']],
      ready: false
    },
  ]
  return (
    <section id="simulate">
      <div className="wrap">
        <div className="section-eyebrow reveal">On-Demand Models</div>
        <h2 className="section-h2 reveal">Run models <span className="text-gold">in your browser</span></h2>
        <p className="section-body reveal" style={{ maxWidth: 660, marginBottom: 52 }}>
          No installation. No configuration. Select a model, set your parameters,
          and watch results stream live — powered by the same ensemble data assimilation engine behind Learn-DA.
        </p>

        <div className="sim-grid">
          {models.map((m, i) => (
            <div
              key={m.name}
              className={`sim-card reveal ${!m.ready ? 'sim-soon' : ''}`}
              style={{ animationDelay: `${i * .07}s` }}
              onClick={() => m.ready && m.href && window.open(m.href, '_blank')}
            >
              {!m.ready && <div className="sim-soon-tag">Coming Soon</div>}
              <div className="sim-name">{m.name}</div>
              {m.label && <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--sky)', letterSpacing: '.12em', marginBottom: 6, marginTop: -2 }}>{m.label}</div>}
              <div className="sim-desc">{m.desc}</div>
              <div className="sim-pills">
                {m.pills.map(([cls, lbl]) => <span key={lbl} className={`pill ${cls}`} style={{ fontSize: 9 }}>{lbl}</span>)}
              </div>
              {m.ready && <div className="sim-run-btn">Launch simulation →</div>}
            </div>
          ))}
        </div>
        <div className="coming-soon-note reveal" style={{ maxWidth: '100%' }}>
          <span>🔬</span>
          <span>Regional and global model on-demand runs are under active development — register your interest via the contact form below.</span>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   DA METHODS + PYTEDA ARCHITECTURE PANEL
══════════════════════════════════════════════════ */
function DAMethodsPanel() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [hoveredArch, setHoveredArch] = useState(null)
  const [dotPos, setDotPos] = useState({ left: 0, width: 0 })
  const chipRefs = useRef([])

  const methods = [
    { id: 'enkf',                     label: 'EnKF',           color: '#4faedc', desc: 'Ensemble Kalman Filter — stochastic, full covariance update using perturbed observations.', ref: 'Evensen (2009)' },
    { id: 'enkf-b-loc',               label: 'EnKF-B-Loc',     color: '#4faedc', desc: 'EnKF with B-localization: applies localization to the background covariance matrix (radius r).', ref: 'Greybush et al. (2011)' },
    { id: 'enkf-cholesky',            label: 'EnKF-Cholesky',  color: '#4faedc', desc: 'EnKF using a Cholesky solve in ensemble space — numerically stable and efficient.', ref: 'Mandel (2006)' },
    { id: 'enkf-modified-cholesky',   label: 'EnKF-Mod-Chol',  color: '#e07b5a', desc: 'EnKF with precision matrix estimation via Modified Cholesky decomposition (radius r / neighborhood).', ref: 'Niño-Ruiz, Sandu & Deng (2018)' },
    { id: 'enkf-naive',               label: 'EnKF-Naive',     color: '#a78bfa', desc: 'Efficient EnKF reducing cost via iterative Sherman–Morrison formula — designed for large systems.', ref: 'Niño-Ruiz, Sandu & Anderson (2015)' },
    { id: 'enkf-shrinkage-precision', label: 'EnKF-Shrinkage', color: '#f472b6', desc: 'EnKF using shrinkage-based precision matrix estimation (radius r / neighborhood).', ref: 'Niño-Ruiz & Sandu (2015)' },
    { id: 'ensrf',                    label: 'EnSRF',           color: '#7ec8a0', desc: 'Ensemble Square Root Filter — deterministic update that avoids perturbed observations entirely.', ref: 'Tippett et al. (2003)' },
    { id: 'etkf',                     label: 'ETKF',            color: '#7ec8a0', desc: 'Ensemble Transform Kalman Filter — deterministic transform performed entirely in ensemble space.', ref: 'Bishop, Etherton & Majumdar (2001)' },
    { id: 'lenkf',                    label: 'LEnKF',           color: '#c9a84c', desc: 'Local EnKF: EnKF with spatial localization controlled by a localization radius r.', ref: 'Ott et al. (2004)' },
    { id: 'letkf',                    label: 'LETKF',           color: '#c9a84c', desc: 'Local ETKF — state-of-the-art operational DA. ETKF performed locally with localization radius r.', ref: 'Hunt, Kostelich & Szunyogh (2007)' },
  ]

  const arch = [
    { layer: 'Browser',              icon: '🌐', color: '#4faedc', items: ['ConfigCard → method selection & parameter tuning', 'RunCard → live streaming charts via SSE', 'Plots: Analysis Error · Ensemble Spread · RMSE Violin · Radar · Pareto'] },
    { layer: 'FastAPI Backend',      icon: '⚙️', color: '#c9a84c', items: ['GET  /api/methods  →  method list + schemas', 'POST /api/runs   →  create run, return run_id', 'GET  /api/runs/{id}/stream  →  SSE real-time results', 'GET  /api/runs/{id}/csv     →  download results'] },
    { layer: 'TEDA Python Library',  icon: '🧮', color: '#7ec8a0', items: ['EnKF variants · LETKF · Lorenz-96 · RK4 integrator', 'run_service.py  →  orchestrates experiment lifecycle'] },
    { layer: 'PostgreSQL',           icon: '🗄️', color: '#a78bfa', items: ['Tables: runs · method_instances · results'] },
  ]

  const active = methods[activeIdx]

  // Move the indicator dot when activeIdx changes
  useEffect(() => {
    const el = chipRefs.current[activeIdx]
    if (el) {
      const rect = el.getBoundingClientRect()
      const parent = el.parentElement.getBoundingClientRect()
      setDotPos({ left: rect.left - parent.left + rect.width / 2, width: rect.width })
    }
  }, [activeIdx])

  return (
    <div className="reveal" style={{ marginTop: 56 }}>

      {/* ── Section divider header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(79,174,220,.3))' }} />
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--sky)', whiteSpace: 'nowrap' }}>
          PyTEDA · Methods &amp; Architecture
        </div>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(79,174,220,.3), transparent)' }} />
      </div>

      {/* ── OUTER CARD ── */}
      <div style={{
        background: 'rgba(10,18,32,.7)',
        border: '1px solid rgba(79,174,220,.18)',
        borderRadius: 20,
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
      }}>

        {/* ── TOP: Methods ── */}
        <div style={{ padding: '32px 36px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4faedc', boxShadow: '0 0 8px #4faedc' }} />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#4faedc' }}>
              Available DA Methods — click to explore
            </span>
          </div>

          {/* Chips + sliding dot indicator */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {methods.map((m, i) => (
                <button
                  key={m.id}
                  ref={el => chipRefs.current[i] = el}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    background: activeIdx === i ? m.color + '20' : 'rgba(255,255,255,.04)',
                    border: `1px solid ${activeIdx === i ? m.color : 'rgba(255,255,255,.1)'}`,
                    borderRadius: 8,
                    padding: '6px 14px',
                    fontFamily: 'var(--ff-mono)',
                    fontSize: 11,
                    color: activeIdx === i ? m.color : 'rgba(200,220,240,.55)',
                    cursor: 'pointer',
                    transition: 'background .2s, border-color .2s, color .2s',
                    letterSpacing: '.04em',
                    boxShadow: activeIdx === i ? `0 0 14px ${m.color}33` : 'none',
                    outline: 'none',
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fixed-height detail area */}
          <div style={{
            marginTop: 18,
            height: 110,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Animated left bar */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              borderRadius: 4,
              background: active.color,
              boxShadow: `0 0 12px ${active.color}88`,
              transition: 'background .3s, box-shadow .3s',
            }} />

            <div style={{
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}>
              {/* Animated dot traveling across top */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {methods.map((m, i) => (
                  <div
                    key={m.id}
                    style={{
                      width: activeIdx === i ? 18 : 5,
                      height: 5,
                      borderRadius: 3,
                      background: activeIdx === i ? m.color : 'rgba(255,255,255,.1)',
                      boxShadow: activeIdx === i ? `0 0 8px ${m.color}` : 'none',
                      transition: 'all .3s cubic-bezier(.4,0,.2,1)',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>

              <div style={{
                fontWeight: 700,
                color: active.color,
                fontSize: 14,
                fontFamily: 'var(--ff-mono)',
                marginBottom: 6,
                transition: 'color .3s',
                letterSpacing: '.04em',
              }}>
                {active.label}
              </div>

              <div style={{
                fontSize: 13,
                color: 'rgba(200,220,240,.7)',
                lineHeight: 1.6,
                marginBottom: 6,
                maxWidth: 700,
              }}>
                {active.desc}
              </div>

              <div style={{
                fontFamily: 'var(--ff-mono)',
                fontSize: 9,
                color: 'rgba(200,220,240,.28)',
                letterSpacing: '.1em',
              }}>
                REFERENCE: {active.ref}
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(79,174,220,.2) 20%, rgba(201,168,76,.2) 80%, transparent)' }} />

        {/* ── BOTTOM: Architecture ── */}
        <div style={{ padding: '28px 36px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', boxShadow: '0 0 8px #c9a84c' }} />
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#c9a84c' }}>
              PyTEDA System Architecture
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
            {arch.map((a, i) => (
              <div
                key={a.layer}
                onMouseEnter={() => setHoveredArch(i)}
                onMouseLeave={() => setHoveredArch(null)}
                style={{
                  position: 'relative',
                  padding: '0 8px',
                  transition: 'transform .2s',
                  transform: hoveredArch === i ? 'translateY(-3px)' : 'none',
                }}
              >
                {i < arch.length - 1 && (
                  <div style={{
                    position: 'absolute', right: -4, top: '50%',
                    transform: 'translateY(-50%)', zIndex: 2,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  }}>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 8, color: 'rgba(200,220,240,.2)', lineHeight: 1 }}>HTTP</div>
                    <div style={{ color: 'rgba(200,220,240,.25)', fontSize: 14 }}>›</div>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 8, color: 'rgba(200,220,240,.2)', lineHeight: 1 }}>SSE</div>
                  </div>
                )}
                <div style={{
                  background: hoveredArch === i ? a.color + '12' : a.color + '07',
                  border: `1px solid ${hoveredArch === i ? a.color + '55' : a.color + '22'}`,
                  borderRadius: 14,
                  padding: '18px 16px',
                  height: '100%',
                  transition: 'all .2s',
                  boxShadow: hoveredArch === i ? `0 0 24px ${a.color}22, inset 0 0 24px ${a.color}08` : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: a.color + '1a', border: `1px solid ${a.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, flexShrink: 0,
                    }}>{a.icon}</div>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: a.color, fontWeight: 700, letterSpacing: '.05em', lineHeight: 1.3 }}>{a.layer}</div>
                  </div>
                  {a.items.map(item => (
                    <div key={item} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 4 }}>
                      <span style={{ color: a.color, opacity: .5, fontSize: 8, flexShrink: 0, marginTop: 4 }}>▸</span>
                      <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'rgba(200,220,240,.5)', lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '.15em', color: 'rgba(200,220,240,.18)', textTransform: 'uppercase' }}>
              Browser ←→ FastAPI ←→ TEDA Library ←→ PostgreSQL
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   LEARN / THEORY + EDUCATION KIT
══════════════════════════════════════════════════ */
function Learn() {
  return (
    <section id="learn">
      <div className="wrap">
        <div className="section-eyebrow reveal">Education Kit</div>
        <h2 className="section-h2 reveal">The science <span className="text-soft">behind the platform</span></h2>

        {/* Single full-width card */}
        <div className="reveal" style={{
          background: 'rgba(255,255,255,.03)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 20,
          padding: '40px 48px',
          marginBottom: 48,
        }}>
          <p className="section-body" style={{ marginBottom: 32, fontSize: 16, lineHeight: 1.8 }}>
            Data assimilation (DA) is the mathematical framework for combining a dynamical model with real-world observations
            to produce the best estimate of a system's true state — while explicitly tracking uncertainty.
            It is the backbone of modern numerical weather prediction, climate reanalysis, and ensemble forecasting.
          </p>

          {/* DA Cycle */}
          <div className="da-cycle" style={{ marginBottom: 36 }}>
            {['Forecast','Observe','Update','Repeat'].map((w, i) => (
              <>
                <div className="da-step" key={w}><div className="da-step-n">0{i+1}</div><div className="da-step-w">{w}</div></div>
                {i < 3 && <div className="da-arrow" key={`a${i}`}>→</div>}
              </>
            ))}
          </div>

          <p className="section-body" style={{ marginBottom: 14, fontSize: 15 }}>
            In the classic linear-Gaussian setting, the <strong style={{color:'var(--text1)'}}>analysis update</strong> and <strong style={{color:'var(--text1)'}}>Kalman gain</strong> are:
          </p>
          <div className="eq-box" style={{ marginBottom: 20 }} dangerouslySetInnerHTML={{ __html:
            `\\[ x_a = x_b + K\\,(y - Hx_b), \\qquad K = P_b H^\\top \\left(H P_b H^\\top + R\\right)^{-1}. \\]`
          }} />
          <div className="var-grid" style={{ marginBottom: 36 }}>
            {[
              ['\\(x_b\\)', 'Background state — model forecast prior to update'],
              ['\\(x_a\\)', 'Analysis state — corrected estimate after assimilation'],
              ['\\(y\\)',   'Observations from sensors, satellites, or stations'],
              ['\\(H\\)',   'Observation operator mapping model state to obs space'],
              ['\\(K\\)',   'Kalman gain — optimal weight balancing model vs obs'],
              ['\\(R\\)',   'Observation error covariance (measurement uncertainty)'],
            ].map(([sym, desc]) => (
              <div className="var-item" key={sym}>
                <div className="var-sym" dangerouslySetInnerHTML={{ __html: sym }} />
                <div className="var-desc">{desc}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,.06)', marginBottom: 32 }} />

          <p className="section-body" style={{ marginBottom: 20, fontSize: 15, color: 'var(--text2)' }}>
            Key ideas behind ensemble data assimilation:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🎯', title: 'Why DA?', body: 'Neither the model nor the observations alone give a complete picture. DA optimally combines both, weighing each by its uncertainty. The result — the analysis — is more accurate than either source on its own.' },
              { icon: '🌊', title: 'Ensemble Methods', body: 'Instead of tracking a single state, ensemble DA propagates a population of model runs (the ensemble) to represent uncertainty. The spread encodes the background error covariance P_b implicitly — no explicit matrix storage required.' },
              { icon: '📡', title: 'Observation Assimilation', body: 'Observations can be satellite radiances, surface stations, radiosondes, radar, or any sensor. The observation operator H maps the model state into observation space for direct comparison with the data.' },
              { icon: '🔬', title: 'Localization & Inflation', body: 'In high-dimensional systems, spurious long-range correlations degrade the analysis. Localization (radius r) cuts these off spatially. Inflation counteracts ensemble collapse by widening the spread before the update.' },
            ].map(c => (
              <div key={c.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text1)', marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width DA Methods + Architecture panel */}
        <DAMethodsPanel />

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="section-eyebrow reveal">Work With Us</div>
        <h2 className="section-h2 reveal">Ready to collaborate <span className="text-soft">on your project?</span></h2>
        <p className="section-body reveal" style={{ maxWidth: 620, marginBottom: 48 }}>
          We work with energy companies, environmental agencies, research institutions, and universities
          to deliver custom atmospheric simulation and data assimilation solutions.
        </p>
        <div className="contact-cards">
          {[
            {
              icon: '⚡',
              title: 'Energy & Industry',
              desc: 'Wind resource estimation, solar irradiance forecasting, grid integration studies. Custom atmospheric forecast data pipelines tailored to your site, region, and temporal resolution.'
            },
            {
              icon: '🌿',
              title: 'Environmental & Research',
              desc: 'Atmospheric monitoring, regional and global climate simulations, ensemble DA experiments. High-resolution numerical outputs for reproducible, publishable research.'
            },
          ].map(c => (
            <div className="pcard reveal" key={c.title}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p style={{ marginTop: 8 }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="contact-box reveal">
          <div className="contact-inner">
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--sky)', marginBottom: 8 }}>Get in touch</div>
              <div className="contact-tagline">Let's talk about your use case</div>
              <div className="contact-sub">We're open to collaborations with energy companies, government agencies, universities, and research labs.</div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <a href="mailto:elias@learn-da.com" className="contact-btn">✉ Contact Us</a>
              <div className="contact-email">elias@learn-da.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <img src="/logo.png" alt="Learn-DA" className="footer-logo" />
        <div className="footer-sub">FastAPI · React · PyTEDA · Regional & Global Climate Models</div>
        <div className="footer-sub" style={{ color: 'rgba(232,238,248,.18)' }}>
          © 2025 Learn-DA · Elías D. Niño-Ruiz, Ph.D.
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════ */
export default function App() {
  const [founderOpen, setFounderOpen] = useState(false)
  useReveal()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
    script.async = true
    script.onload = () => window.MathJax?.typesetPromise?.()
    document.head.appendChild(script)
    window.MathJax = {
      tex: { inlineMath: [['\\(','\\)']], displayMath: [['\\[','\\]']] },
      options: { skipHtmlTags: ['script','noscript','style','textarea'] }
    }
    return () => document.head.removeChild(script)
  }, [])

  return (
    <>
      <div className="bg-scene">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-orb bg-orb-4" />
        <div className="bg-grid" />
        <div className="bg-grain" />
      </div>

      <FounderModal open={founderOpen} onClose={() => setFounderOpen(false)} />
      <Nav onFounder={() => setFounderOpen(true)} />

      <Hero />
      <div className="section-divider" />
      <WhoWeServe />
      <div className="section-divider" />
      <Energy />
      <div className="section-divider" />
      <Platform />
      <div className="section-divider" />
      <Simulate />
      <div className="section-divider" />
      <Learn />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </>
  )
}
