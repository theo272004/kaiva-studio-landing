import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const PROJECTS_PAGE_HREF = './proyectos/';
const HOME_PAGE_HREF_FROM_PROJECTS = '../';
const isProjectsPath = () => {
  if (typeof window === 'undefined') return false;
  return /\/proyectos(?:\/|$|\/index\.html$)/.test(window.location.pathname);
};
const scrollToSection = (event, id) => {
  if (typeof window === 'undefined') return;
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
};

const slides = [
  {
    id: 1,
    number: '01',
    label: 'Inteligencia de Negocios',
    vibe: 'Analítico · Predictivo',
    brand: 'KAIVA INSIGHTS',
    description: 'Transformamos datos complejos en dashboards intuitivos que impulsan decisiones estratégicas.',
      accent: '#8242f5',
    mockup: 'dashboard',
  },
  {
    id: 2,
    number: '02',
    label: 'E-Commerce de Lujo',
    vibe: 'Exclusivo · Conversión',
    brand: 'KAIVA COMMERCE',
    description: 'Experiencias de compra premium donde la estética eleva el valor percibido de cada producto.',
      accent: '#8242f5',
    mockup: 'ecommerce',
  },
  {
    id: 3,
    number: '03',
    label: 'Infraestructura SaaS',
    vibe: 'Sólido · Escalable',
    brand: 'KAIVA CORE',
    description: 'Plataformas tecnológicas diseñadas para el rendimiento extremo y la claridad operativa.',
      accent: '#8242f5',
    mockup: 'tech',
  },
  {
    id: 4,
    number: '04',
    label: 'Editorial Creativo',
    vibe: 'Sofisticado · Narrativo',
    brand: 'KAIVA STUDIO',
    description: 'Storytelling visual para marcas que buscan destacar en un ecosistema digital saturado.',
      accent: '#8242f5',
    mockup: 'creative',
  },
];

const services = [
  {
    title: 'Desarrollo web',
    description: 'Creamos páginas web estratégicas diseñadas para transmitir confianza y generar oportunidades reales.',
  },
  {
    title: 'Diseño UI/UX + Marca',
    description: 'Diseñamos experiencias claras y enfocadas en conversión, alineadas con tu identidad de marca.',
  },
  {
    title: 'Automatización y sistemas',
    description: 'Implementamos herramientas y sistemas (como bots de WhatsApp y flujos automatizados) para responder, organizar y vender sin fricción.',
  },
];

const processSteps = ['Diagnóstico', 'Estructura', 'Diseño', 'Desarrollo', 'Entrega'];

const pricingPlans = [
  {
    name: 'Plan Inicial',
    audience: 'Ideal para marcas personales y negocios nuevos.',
    price: 'From $320 USD',
    description: 'Solución clara, profesional y lista para presentar tu negocio con seriedad desde el primer contacto.',
    points: ['Landing page profesional', 'Responsive design', 'Entrega rápida', 'Soporte inicial'],
    cta: 'Comenzar',
  },
  {
    name: 'Plan Negocio',
    audience: 'Para empresas establecidas que necesitan crecer.',
    price: 'From $700 USD',
    description: 'Una solución con más estructura, mejor narrativa y una ejecución visual pensada para elevar percepción y conversión.',
    points: ['Hasta 5 páginas', 'SEO base', 'Copy estratégico', 'Diseño premium', '30 días soporte'],
    cta: 'Elegir plan',
    featured: true,
    badge: 'Más elegido',
  },
  {
    name: 'Plan Pro',
    audience: 'Para marcas serias que necesitan presencia premium.',
    price: 'From $1,200 USD',
    description: 'Pensado para marcas que necesitan una presencia más robusta, con sistema, orden y una ejecución a la altura.',
    points: ['Hasta 10 páginas', 'Automatizaciones básicas', 'Arquitectura completa', 'Soporte extendido'],
    cta: 'Escalar ahora',
  },
];

const ecommercePlan = {
  label: 'PLAN ADICIONAL',
  name: 'Plan E-Commerce',
  price: 'Desde $1,300 USD',
  description:
    'Para negocios que quieren vender online, con catálogo, carrito, checkout, pagos en Colombia e integración con envíos.',
  cta: 'Solicitar ecommerce',
};

const trustPoints = [
  'Claridad',
  'Calidad',
  'Velocidad',
  'Responsabilidad',
  'Resultados',
];

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: 'easeOut' },
};

const gradientAccentStyle = {
  background: 'linear-gradient(135deg, #21b2c6 0%, #8242f5 58%, #d96cff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const accentButtonStyle = {
  background: 'linear-gradient(135deg, #21b2c6 0%, #8242f5 58%, #d96cff 100%)',
  boxShadow: '0 16px 34px -18px rgba(130,66,245,0.55)',
};

const premiumEase = [0.22, 1, 0.36, 1];

const createGlassPanelStyle = () => ({
  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(24px) saturate(120%)',
  WebkitBackdropFilter: 'blur(24px) saturate(120%)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  boxShadow: '0 32px 64px rgba(0, 0, 0, 0.12)',
  isolation: 'isolate',
});

const GlassPanelLayers = () => (
  <>
    {/* Strong 3D inner bevel */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        borderRadius: 'inherit',
        boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.9), inset -2px -2px 6px rgba(0,0,0,0.1)',
      }}
    />
    {/* Diagonal light reflection (gloss) */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        borderRadius: 'inherit',
        background: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 30%, transparent 40%)',
        mixBlendMode: 'overlay',
      }}
    />
  </>
);

const MockupRenderer = ({ type }) => {
  const mockups = {
    dashboard: asset('kaiva_dashboard_mockup.webp'),
    ecommerce: asset('kaiva_ecommerce_mockup.webp'),
    tech: asset('kaiva_tech_mockup.webp'),
    creative: asset('kaiva_creative_mockup.webp'),
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f8f8fa]">
      <img
        src={mockups[type]}
        alt={type}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-3 opacity-90 transition-opacity duration-700 hover:opacity-100 sm:object-cover sm:p-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
      <div className="absolute left-4 top-4 flex gap-2">
        <div className="h-2 w-2 rounded-full bg-white/20" />
        <div className="h-2 w-2 rounded-full bg-white/20" />
        <div className="h-2 w-2 rounded-full bg-white/20" />
      </div>
    </div>
  );
};

const FloatingRobot = ({ src, style, className = '', delay = 0, duration = 6, amplitude = 20, rotation = 8 }) => (
  <motion.div
    className={`pointer-events-none absolute ${className}`}
    style={{ ...style, zIndex: 15 }}
    animate={{
      y: [0, -amplitude, amplitude * 0.5, -amplitude * 0.7, 0],
      x: [0, amplitude * 0.4, -amplitude * 0.3, amplitude * 0.2, 0],
      rotate: [0, rotation, -rotation * 0.5, rotation * 0.3, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  >
    <div className="h-full w-full">
      <img src={src} alt="Kaiva Character" loading="lazy" decoding="async" className="h-full w-full object-contain" />
    </div>
  </motion.div>
);

const SectionsAuroraBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 aurora-base" />
    <div className="aurora-blob aurora-blob-a absolute -left-[20vw] -top-[18vh] h-[58vh] w-[56vw] rounded-full" />
    <div className="aurora-blob aurora-blob-b absolute right-[-14vw] top-[8vh] h-[52vh] w-[52vw] rounded-full" />
    <div className="aurora-blob aurora-blob-c absolute left-[28vw] bottom-[-22vh] h-[62vh] w-[58vw] rounded-full" />
    <div className="absolute inset-0 aurora-blur-overlay" />
    <div className="absolute inset-0 aurora-noise" />
  </div>
);

const TiltSlide = ({ slide, isActive, position, onClick }) => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(mouseX * 8);
    rotateX.set(-mouseY * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const absOffset = Math.abs(position);
  const scale = isActive ? 1 : 1 - absOffset * 0.12;
  const translateX = position * 55;
  const translateZ = isActive ? 0 : -absOffset * 180;
  const opacity = absOffset > 2 ? 0 : isActive ? 1 : 0.5 - absOffset * 0.12;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        width: 'clamp(220px, 72vw, 620px)',
        aspectRatio: '4/3',
        x: '-50%',
        y: '-50%',
        rotateX: isActive ? springX : 0,
        rotateY: isActive ? springY : 0,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        x: `calc(-50% + ${translateX}%)`,
        scale,
        z: translateZ,
        opacity,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl"
        style={{
          boxShadow: isActive
            ? `0 32px 70px -24px rgba(32,29,26,0.22), 0 0 80px -28px ${slide.accent}26, inset 0 1px 0 rgba(255,255,255,0.7)`
            : '0 24px 50px -28px rgba(32,29,26,0.18)',
          border: '1px solid rgba(32,29,26,0.08)',
        }}
      >
        <MockupRenderer type={slide.mockup} />
        {isActive && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.24) 50%, transparent 70%)',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const ContactRevealSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'end end'],
  });
  const footerY = useTransform(scrollYProgress, [0.12, 0.72], ['24%', '0%']);
  const footerOpacity = useTransform(scrollYProgress, [0.08, 0.35], [0.15, 1]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    updateMobile();
    mediaQuery.addEventListener('change', updateMobile);
    return () => mediaQuery.removeEventListener('change', updateMobile);
  }, []);

  const textGroup = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0.04 : 0.08,
        delayChildren: 0.12,
      },
    },
  };

  const textItem = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: isMobile ? 18 : 32, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.24 : 1.1,
        ease: premiumEase,
      },
    },
  };

  const formItem = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: isMobile ? 18 : 28, scale: isMobile ? 1 : 0.985, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.24 : 1.02,
        delay: prefersReducedMotion ? 0 : 0.28,
        ease: premiumEase,
      },
    },
  };

  const fieldGroup = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0.02 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.34,
      },
    },
  };

  const fieldItem = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 18, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.18 : 0.68,
        ease: premiumEase,
      },
    },
  };

  return (
    <section id="contacto" ref={sectionRef} className="relative w-full overflow-x-clip bg-transparent">
      <div
        className="mx-auto flex w-full max-w-[1320px] items-center px-6 md:px-12 lg:px-16"
        style={{
          paddingTop: 'clamp(72px, 10vw, 172px)',
          paddingBottom: 'clamp(52px, 8vw, 124px)',
        }}
      >
        <div
          className="grid w-full lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
          style={{ columnGap: 'clamp(56px, 9vw, 132px)' }}
        >
            <motion.div
              variants={textGroup}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.38 }}
              className="relative z-10 max-w-[560px]"
            >
              <motion.div variants={textItem} className="font-manrope text-[16px] font-medium tracking-normal text-[#080808]/68">
                Contacto
              </motion.div>
              <motion.h2 className="mt-6 font-epilogue text-[clamp(40px,7vw,112px)] font-extrabold leading-[0.92] tracking-[-0.04em] text-[#080808] md:tracking-[-0.035em] lg:tracking-[-0.04em]">
                <motion.span variants={textItem} className="block">Ready to</motion.span>
                <motion.span variants={textItem} className="block">start?</motion.span>
              </motion.h2>
              <AnimatedText 
                text="Cuéntanos qué estás construyendo y te responderemos con una propuesta clara, directa y bien estructurada."
                className="mt-7 max-w-[40ch] text-[clamp(18px,1.4vw,22px)] leading-[1.55] text-[#080808]/62"
              />
            </motion.div>

            <motion.form
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={formItem}
              whileHover={prefersReducedMotion || isMobile ? undefined : { y: -2 }}
              transition={{ duration: 0.32, ease: premiumEase }}
              className="contact-premium-card relative z-30 rounded-[34px] p-5 md:p-6"
              style={isMobile ? undefined : { transformPerspective: 1600, transformStyle: 'preserve-3d' }}
            >
              <motion.div variants={fieldGroup} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.label variants={fieldItem} className="block">
                    <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.18em] text-[#080808]/46">
                      Nombre
                    </span>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="contact-input mt-3 w-full rounded-[20px] px-4 py-3.5 text-[15px] text-[#080808] outline-none"
                    />
                  </motion.label>
                  <motion.label variants={fieldItem} className="block">
                    <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.18em] text-[#080808]/46">
                      Correo electrónico
                    </span>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      className="contact-input mt-3 w-full rounded-[20px] px-4 py-3.5 text-[15px] text-[#080808] outline-none"
                    />
                  </motion.label>
                </div>
                <motion.label variants={fieldItem} className="block">
                  <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.18em] text-[#080808]/46">
                    Cuéntanos sobre tu proyecto
                  </span>
                  <textarea
                    rows="4"
                    placeholder="Contexto, objetivos, tiempos y lo que necesitas construir."
                    className="contact-input mt-3 w-full rounded-[22px] px-4 py-3.5 text-[15px] text-[#080808] outline-none"
                  />
                </motion.label>
              </motion.div>

              <motion.div variants={fieldItem} className="mt-5 flex items-center justify-between gap-4">
                <p className="max-w-[28ch] text-[13px] leading-6 text-[#080808]/46">
                  Proyectos selectos, respuestas claras y ejecución con criterio.
                </p>
                <button
                  type="submit"
                  className="contact-accent-button inline-flex min-h-[48px] items-center justify-center rounded-full px-7 py-3 font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                  style={accentButtonStyle}
                >
                  Enviar
                </button>
              </motion.div>
            </motion.form>
          </div>
        </div>

      <motion.div
        className="w-full bg-[#111111] pb-[max(env(safe-area-inset-bottom),0px)]"
        style={prefersReducedMotion ? undefined : { y: footerY, opacity: footerOpacity }}
        initial={prefersReducedMotion ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.06 }}
        transition={{ duration: 0.7, ease: premiumEase }}
      >
        <div className="mx-auto flex min-h-[34vh] w-full max-w-[1320px] flex-col items-center justify-center px-6 py-10 text-center md:min-h-[40vh] md:px-12 md:py-12 lg:px-16">
          <a
            href="mailto:hello@kaivastudio.com"
            className="font-epilogue text-[clamp(28px,4vw,60px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-white transition-opacity duration-300 hover:opacity-80"
          >
            hello@kaivastudio.com
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-manrope text-[11px] font-bold uppercase tracking-[0.22em] text-white/52">
            <a href="#" className="transition-colors duration-300 hover:text-white">Instagram</a>
            <a href="#" className="transition-colors duration-300 hover:text-white">Dribbble</a>
            <a href="#" className="transition-colors duration-300 hover:text-white">LinkedIn</a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const SectionHeader = ({ eyebrow, title, description, align = 'left', inverse = false }) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow ? (
      <div
        className={`mb-4 inline-block w-fit text-[11px] font-manrope font-bold uppercase tracking-[0.26em] ${inverse ? 'text-white/64' : ''}`}
        style={inverse ? undefined : gradientAccentStyle}
      >
        {eyebrow}
      </div>
    ) : null}
    <h2 className={`text-[clamp(34px,5vw,78px)] font-epilogue font-extrabold leading-[1.02] tracking-[-0.04em] ${inverse ? 'text-white' : 'text-[#080808]'}`}>
      {title}
    </h2>
    {description ? (
      <p className={`mt-6 max-w-2xl text-[15px] leading-8 md:text-[17px] ${inverse ? 'text-white/70' : 'text-[#080808]/66'}`}>
        {description}
      </p>
    ) : null}
  </div>
);

const SectionShell = ({ id, tone = 'light', className = '', children }) => {
  const toneClass = 'bg-transparent text-[var(--color-secondary)]';

  return (
    <section id={id} data-nav-theme="light" className={`${toneClass} ${className}`}>
      <div className="mx-auto w-full max-w-[1320px] px-6 py-14 md:px-12 md:py-36 lg:px-16">{children}</div>
    </section>
  );
};

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <section id="servicios" data-nav-theme="light" className="bg-transparent text-[var(--color-secondary)]">
        <div className="mx-auto w-full max-w-[1480px] px-6 pb-10 pt-24 md:px-12 md:pb-12 md:pt-28 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
              <h2 className="font-inter text-[clamp(38px,6vw,84px)] font-bold leading-[0.98] tracking-[-0.045em] text-[#080808]">
                Nuestros servicios
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-transparent text-[#080808]">
        <div className="mx-auto w-full max-w-[1480px] px-6 pb-20 md:px-12 md:pb-24 lg:px-16 lg:pb-28">
          <motion.div
            className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            onMouseLeave={() => setActiveService(null)}
          >
            {services.map((service, index) => {
              const isActive = activeService === index;
              const isQuiet = activeService !== null && !isActive;

              return (
                <motion.article
                  key={service.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="group relative flex min-h-[340px] overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_18px_48px_-34px_rgba(80,74,168,0.28)] outline-none transition-[opacity,transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#8242f5]/30 hover:shadow-[0_28px_74px_-44px_rgba(130,66,245,0.4)] md:min-h-[380px] xl:min-h-[420px]"
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  tabIndex={0}
                  onMouseEnter={() => setActiveService(index)}
                >
                  {/* Glowing Effect Blobs (Bottom Half) */}
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[30px]">
                    <div className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[70%] translate-x-1/4 translate-y-1/4 rounded-full bg-[#d96cff] opacity-0 blur-[60px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-[0.35]" />
                    <div className="absolute -bottom-[20%] left-[15%] h-[70%] w-[70%] translate-y-1/4 rounded-full bg-[#8242f5] opacity-0 blur-[60px] transition-all duration-700 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-[0.25]" />
                    <div className="absolute -bottom-[20%] -left-[10%] h-[70%] w-[70%] -translate-x-1/4 translate-y-1/4 rounded-full bg-[#21b2c6] opacity-0 blur-[60px] transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-[0.35]" />
                  </div>

                  <div className="relative z-10 flex min-h-full w-full flex-col px-6 py-8 md:px-8 md:py-10 lg:px-9 lg:py-11 xl:px-10">
                    <motion.div
                      className="font-epilogue text-[48px] font-extrabold leading-none tracking-[-0.04em] md:text-[60px] xl:text-[72px]"
                      style={gradientAccentStyle}
                      animate={{
                        x: isActive ? 5 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      0{index + 1}
                    </motion.div>

                    <motion.div
                      className="mt-8 h-px w-full origin-center"
                      animate={{
                        backgroundColor: isActive ? 'rgba(8,8,8,0.18)' : 'rgba(8,8,8,0.12)',
                        scaleX: isActive ? 0.985 : 1,
                      }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <div className="mt-10 flex flex-1 flex-col justify-between gap-10 md:mt-12 md:gap-12">
                      <div className="max-w-[17rem]">
                        <motion.h3
                          className="font-epilogue text-[26px] font-extrabold leading-[1.08] tracking-[-0.03em] md:text-[30px] xl:text-[34px]"
                          animate={{
                            color: '#080808',
                            x: isActive ? 5 : 0,
                          }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {service.title}
                        </motion.h3>
                      </div>

                      <div className="max-w-[20rem]">
                        <motion.p
                          className="text-[14px] leading-7 md:text-[15px] md:leading-8"
                          animate={{
                            color: isActive ? 'rgba(8,8,8,0.82)' : 'rgba(8,8,8,0.66)',
                            x: isActive ? 5 : 0,
                          }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {service.description}
                        </motion.p>
                      </div>

                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

const PortfolioSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovering]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') setActiveIndex((p) => (p + 1) % slides.length);
      if (e.key === 'ArrowLeft') setActiveIndex((p) => (p - 1 + slides.length) % slides.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 30) setActiveIndex((p) => Math.min(p + 1, slides.length - 1));
      if (e.deltaX < -30) setActiveIndex((p) => Math.max(p - 1, 0));
    }
  };

  const active = slides[activeIndex];

  return (
    <div
      id="proyectos"
      data-nav-theme="light"
      className="relative min-h-screen overflow-hidden bg-white text-[#080808]"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="relative z-30 px-6 pt-6 md:px-16 md:pt-8" aria-hidden="true" />

      <div className="relative z-20 mt-10 px-6 md:mt-20 md:px-16">
        <div className="flex justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="font-['Inter Tight'] text-[clamp(40px,5.8vw,88px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#080808]">
              Nuestras webs
            </h1>
          </div>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative z-10 mt-6 h-[320px] sm:h-[400px] md:mt-12 md:h-[clamp(440px,58vh,680px)]"
        style={{
          perspective: '2000px',
        }}
        onWheel={handleWheel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <FloatingRobot
          src={asset('KaivaTheo.webp')}
          className="hidden sm:block"
          style={{ top: '1%', left: '2%', width: 'clamp(72px, 11vw, 210px)', height: 'clamp(72px, 11vw, 210px)' }}
          delay={0}
          duration={10}
          amplitude={6}
          rotation={2}
        />
        <FloatingRobot
          src={asset('KaivaSara.webp')}
          className="hidden sm:block"
          style={{ bottom: '18%', right: '2%', width: 'clamp(72px, 11vw, 210px)', height: 'clamp(72px, 11vw, 210px)' }}
          delay={2.2}
          duration={10.5}
          amplitude={6}
          rotation={2}
        />

        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {slides.map((slide, i) => (
            <TiltSlide
              key={slide.id}
              slide={slide}
              isActive={i === activeIndex}
              position={i - activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute bottom-4 left-6 z-20 hidden md:block md:bottom-[-54px] md:left-16"
          >
            <div className="flex items-end gap-4">
              <div className="font-epilogue text-[clamp(48px,7vw,92px)] font-extrabold italic leading-none tracking-[-0.03em] opacity-90" style={gradientAccentStyle}>
                {active.number}
              </div>
              <div className="pb-2">
                <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.24em] text-[#080808]/42">Servicio</div>
                <div className="font-epilogue text-xl font-semibold italic leading-[1.2] tracking-[-0.02em] md:text-2xl">{active.label}</div>
                <div className="mt-1 font-manrope text-[11px] tracking-wider text-[#080808]/56">{active.vibe}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active.id}-desc`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pointer-events-none absolute bottom-6 right-6 z-20 hidden max-w-[240px] text-right md:block md:bottom-[-44px] md:right-16"
          >
            <div className="mb-2 font-manrope text-[11px] font-bold uppercase tracking-wider" style={gradientAccentStyle}>- {active.brand}</div>
            <div className="font-manrope text-[13px] italic leading-relaxed text-[#080808]/64">{active.description}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 px-4 sm:px-6 md:hidden">
        <div className="rounded-[20px] border border-[#080808]/10 bg-[var(--color-surface)] p-4 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.12)]">
          <div className="flex items-end gap-3">
            <div className="font-epilogue text-[42px] font-extrabold italic leading-none tracking-[-0.03em] opacity-90" style={gradientAccentStyle}>
              {active.number}
            </div>
            <div className="pb-1">
              <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.24em] text-[#080808]/42">Servicio</div>
              <div className="font-epilogue text-[22px] font-semibold italic leading-[1.2] tracking-[-0.02em] text-[#080808]">{active.label}</div>
              <div className="mt-1 font-manrope text-[11px] tracking-wider text-[#080808]/56">{active.vibe}</div>
            </div>
          </div>
          <div className="mt-4 border-t border-[#080808]/10 pt-4">
            <div className="mb-2 font-manrope text-[11px] font-bold uppercase tracking-wider" style={gradientAccentStyle}>- {active.brand}</div>
            <div className="font-manrope text-[13px] italic leading-relaxed text-[#080808]/68">{active.description}</div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-8 px-6 pb-12 md:mt-32 md:px-16">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setActiveIndex((p) => (p - 1 + slides.length) % slides.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 text-[#080808]"
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06), inset 1px 1px 2px rgba(255,255,255,1)',
            }}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex flex-1 gap-1.5">
            {slides.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveIndex(i)}
                  className="group relative h-[2px] flex-1 cursor-pointer overflow-hidden bg-[#080808]/12"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left"
                    style={{ background: 'linear-gradient(135deg, #21b2c6 0%, #8242f5 58%, #d96cff 100%)' }}
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: i < activeIndex ? 1 : isActive ? (isHovering ? 0 : 1) : 0,
                    }}
                    transition={isActive && !isHovering ? { duration: 5.5, ease: 'linear' } : { duration: 0.4 }}
                  />
                  <div className="absolute -top-5 left-0 font-mono text-[#080808] opacity-0 transition-opacity group-hover:opacity-60">
                    {s.number}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="font-manrope text-[11px] font-bold tracking-wider tabular-nums" style={gradientAccentStyle}>
            {String(activeIndex + 1).padStart(2, '0')} <span className="opacity-40">/ {String(slides.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={() => setActiveIndex((p) => (p + 1) % slides.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 text-[#080808]"
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06), inset 1px 1px 2px rgba(255,255,255,1)',
            }}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

const stepLabels = ['Primer paso', 'Segundo paso', 'Tercer paso', 'Cuarto paso', 'Quinto paso'];

const ProcessStepCard = ({ step, index, activeProgress }) => {
  const distance = useTransform(activeProgress, (value) => {
    return index - value;
  });
  const y = useTransform(distance, (value) => value * 160);
  const scale = useTransform(distance, (value) => Math.max(0.85, 1 - Math.abs(value) * 0.12));
  const opacity = useTransform(distance, (value) => {
    const absolute = Math.abs(value);
    if (absolute > 2) return 0;
    return Math.max(0, 1 - absolute * 0.5);
  });
  const blur = useTransform(distance, (value) => `blur(${Math.min(Math.abs(value) * 3, 6)}px)`);
  const zIndex = useTransform(distance, (value) => Math.round(20 - Math.abs(value) * 10));
  const backgroundColor = useTransform(distance, (value) => (
    Math.abs(value) < 0.4 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)"
  ));
  const boxShadow = useTransform(distance, (value) => (
    Math.abs(value) < 0.4
      ? "0 30px 90px rgba(130,66,245,0.12), inset 0 1px 0 rgba(255,255,255,1)"
      : "0 10px 30px rgba(0,0,0,0.02)"
  ));
  const borderColor = useTransform(distance, (value) => (
    Math.abs(value) < 0.4 ? "rgba(130,66,245,0.2)" : "rgba(0,0,0,0.05)"
  ));

  return (
    <motion.div
      style={{ y, scale, opacity, filter: blur, zIndex, backgroundColor, boxShadow, borderColor }}
      className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 items-center gap-4 rounded-[24px] border p-4 backdrop-blur-xl sm:p-5 md:gap-6 md:rounded-[30px] md:p-7"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#080808]/6 bg-white font-epilogue text-[15px] font-bold text-[#080808]/45 shadow-sm md:h-14 md:w-14 md:text-[16px]">
        0{index + 1}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-epilogue text-[24px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#080808] md:text-[36px]">
          {step.title}
        </h3>
        <p className="max-w-[420px] text-[13px] leading-relaxed text-[#080808]/56 md:text-[15px]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

const ProcessRedesignSection = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const stepsContent = [
    { title: 'Diagnóstico', description: 'Analizamos objetivos, contexto y necesidades del negocio antes de construir.' },
    { title: 'Estructura', description: 'Organizamos la estructura para que la presencia digital tenga un propósito claro y medible.' },
    { title: 'Diseño', description: 'Diseñamos una experiencia visual atractiva, profesional y alineada a la marca.' },
    { title: 'Desarrollo', description: 'Integramos tecnología, herramientas y configuración técnica completa en un solo servicio.' },
    { title: 'Entrega', description: 'Publicamos una solución lista para operar desde el primer día, con soporte posterior según el plan.' },
  ];

  const activeProgressRaw = useTransform(scrollYProgress, [0, 1], [0, stepsContent.length - 1]);
  const activeProgress = useSpring(activeProgressRaw, { stiffness: 90, damping: 24, mass: 0.4 });

  useMotionValueEvent(activeProgressRaw, 'change', (latest) => {
    const nextStep = Math.min(stepsContent.length - 1, Math.max(0, Math.round(latest)));
    setActiveStep(nextStep);
  });

  return (
    <section ref={sectionRef} id="proceso" className="relative w-full bg-[#fbfbfd] py-0">
      <div className="relative h-[450vh] w-full">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_0%,rgba(255,255,255,1)_0%,rgba(251,251,253,0.8)_48%,rgba(244,247,255,0.9)_100%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[800px] items-center justify-center gap-6">

            <div className="relative h-[430px] w-full overflow-visible md:h-[540px]">
              <div className="relative mx-auto h-full w-full max-w-[660px]">
                {stepsContent.map((step, i) => (
                  <ProcessStepCard 
                    key={i}
                    step={step} 
                    index={i} 
                    activeProgress={activeProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExpandedAgencySections = () => (
  <>
    <ProcessRedesignSection />
    <section
      id="planes"
      data-nav-theme="light"
      className="relative m-0 overflow-hidden bg-transparent px-4 pb-12 pt-0 md:px-8 md:pb-16"
    >
      <motion.img
        src={asset('KaivaMora1.webp')}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute right-0 top-[6%] z-50 hidden w-[200px] opacity-90 sm:block md:right-[-2%] md:top-[4%] md:w-[320px] lg:right-[-3%] lg:w-[460px] pointer-events-none"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 2, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div {...sectionReveal} className="mx-auto w-full max-w-[1180px]">
          <div className="max-w-3xl">
            <div className="inline-block w-fit font-manrope text-[11px] font-bold uppercase tracking-[0.26em]" style={gradientAccentStyle}>Pricing</div>
            <h2 className="mt-3 font-epilogue text-[clamp(44px,7vw,92px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#080808]">
              Planes
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#080808]/72 md:text-[17px]">
              Elige la solución ideal para tu negocio.
              <br />
              Diseño premium, estructura estratégica y ejecución real.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`group relative flex min-h-[340px] flex-col rounded-[32px] border ${plan.featured ? 'border-[#a482ff]/50' : 'border-[#e8e5ff]/70'} bg-white shadow-[0_18px_48px_-24px_rgba(32,29,26,0.10)] outline-none transition-[transform,shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-black/5 hover:shadow-[0_28px_74px_-34px_rgba(32,29,26,0.16)] md:min-h-[380px] xl:min-h-[420px]`}
                >
                  <div className="relative flex flex-1 flex-col p-8 md:p-10">
                    {plan.badge && (
                      <div className="absolute -top-[14px] right-6 z-10 rounded-full px-4 py-[6px] font-manrope text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-md shadow-[#a482ff]/20" style={{ background: 'linear-gradient(135deg, #b891ff 0%, #a482ff 100%)' }}>
                        {plan.badge}
                      </div>
                    )}
                    <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#080808]/50">
                      {plan.name}
                    </div>
                    <h3 className="mt-3 font-epilogue text-[36px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#080808] md:text-[42px]">
                      {plan.price}
                    </h3>
                    <p className="mt-4 text-[13px] leading-tight text-[#080808]/60">
                      {plan.audience}
                    </p>
                    <p className="mt-5 text-[13px] leading-relaxed text-[#080808]/70">
                      {plan.description}
                    </p>
                    <ul className="mt-8 flex-1 space-y-3.5">
                      {plan.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13px] leading-snug text-[#080808]/80">
                          <svg className="h-4 w-4 shrink-0 text-[#b891ff]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contacto" onClick={(event) => scrollToSection(event, 'contacto')} className="mt-10 inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-3 font-manrope text-[11px] font-bold uppercase tracking-widest text-[#080808] shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-[#080808]/5 transition-[shadow,transform] duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[1px]">
                      {plan.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-6 w-full max-w-[1180px]">
              <article className="group relative flex flex-col items-center justify-between gap-6 rounded-[32px] border border-[#e8e5ff]/70 bg-white p-6 shadow-[0_18px_48px_-24px_rgba(32,29,26,0.10)] outline-none transition-[transform,shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_74px_-34px_rgba(32,29,26,0.16)] md:flex-row md:p-8 lg:px-12">
                <div className="flex flex-col items-center text-center md:items-start md:text-left md:max-w-[280px]">
                  <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#a482ff]">
                    {ecommercePlan.label}
                  </div>
                  <h3 className="mt-1 font-epilogue text-[24px] font-extrabold leading-none tracking-[-0.03em] md:text-[28px]">
                    {ecommercePlan.name}
                  </h3>
                  <div className="mt-2 text-[14px] font-bold text-[#080808]">
                    {ecommercePlan.price}
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center gap-6 md:flex-row md:justify-between md:pl-10 text-center md:text-left">
                  <p className="max-w-[500px] text-[14px] leading-relaxed text-[#080808]/70">
                    {ecommercePlan.description}
                  </p>
                  <a href="#contacto" onClick={(event) => scrollToSection(event, 'contacto')} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-[0_8px_20px_-6px_rgba(164,130,255,0.5)] transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #d49fff 0%, #a482ff 100%)' }}>
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
        </motion.div>
    </section>
  </>
);

const AliadosSection = () => {
  return (
    <section className="relative w-full bg-transparent text-[#080808] px-6 py-16 md:py-24 lg:px-16 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 max-w-[460px]">
          <div className="mb-4 inline-block font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#a482ff]">
            ALIADOS ESTRATÉGICOS
          </div>
          <h2 className="font-epilogue text-[clamp(32px,6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#080808]">
            Trabajamos con los mejores en SEO
          </h2>
          <p className="mt-6 text-[15px] md:text-[16px] leading-[1.6] text-[#080808]/70">
            Para garantizar que tu web no solo se vea bien sino que también sea encontrada, trabajamos de la mano con especialistas en posicionamiento orgánico.
          </p>
        </div>
        
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-[500px] rounded-[28px] border border-[#080808]/5 bg-white p-6 md:p-8 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#080808]/40 mb-2">
                SEO
              </div>
              <h3 className="font-epilogue text-[22px] md:text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#080808]">
                SEO for Startups
              </h3>
              <p className="mt-3 text-[13px] md:text-[14px] leading-relaxed text-[#080808]/60">
                Posicionamiento orgánico para negocios que quieren crecer con criterio.
              </p>
            </div>
            <a href="https://seoforstartups.co" target="_blank" rel="noopener noreferrer" className="flex shrink-0 h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#f4f2ff] text-[#a482ff] hover:bg-[#eae6ff] transition-colors">
              <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const AnimatedText = ({ text, className }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 16, stiffness: 80 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 16, stiffness: 80 },
    },
  };

  return (
    <motion.div style={{ overflow: "visible", display: "flex", flexWrap: "wrap", gap: "0.26em" }} variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((word, index) => (
        <motion.span variants={child} style={{ display: "inline-block" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ScrollRevealHeadline = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = text.split(" ");
  
  return (
    <h2 ref={containerRef} className="font-epilogue text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-center max-w-[900px] mt-4 flex flex-wrap justify-center">
      {words.map((word, i) => {
        return <RevealWord key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />;
      })}
    </h2>
  );
};

const RevealWord = ({ word, index, total, progress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(progress, [start, end], ["#d1d1d1", "#080808"]);
  const opacity = useTransform(progress, [start, end], [0.3, 1]);
  
  return (
    <motion.span 
      style={{ color, opacity }}
      className="inline-block mr-[0.25em]"
    >
      {word}
    </motion.span>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hoveredNode, setHoveredNode] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const smoothXSm = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const smoothYSm = useSpring(cursorY, { damping: 25, stiffness: 400 });
  const smoothXLg = useSpring(cursorX, { damping: 40, stiffness: 150 });
  const smoothYLg = useSpring(cursorY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouch(false);
    }
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target;
      if (target.closest('a') || target.closest('button')) {
        setHoveredNode(true);
      } else {
        setHoveredNode(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full drop-shadow-md mix-blend-difference"
        style={{
          x: smoothXSm,
          y: smoothYSm,
          width: 14,
          height: 14,
          translateX: "-50%",
          translateY: "-50%",
          scale: hoveredNode ? 3.5 : 1,
          backgroundColor: "#ffffff",
        }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full mix-blend-difference"
        style={{
          x: smoothXLg,
          y: smoothYLg,
          width: 32,
          height: 32,
          translateX: "-50%",
          translateY: "-50%",
          scale: hoveredNode ? 1.5 : 1,
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      />
    </>
  );
};

const FixedNavbar = ({ projectsActive = false }) => (
  <>
    <a
      href={projectsActive ? HOME_PAGE_HREF_FROM_PROJECTS : '#inicio'}
      onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'inicio')}
      className="fixed left-6 top-5 z-40 w-fit text-left text-[16px] leading-[0.95] text-[#080808] transition-colors duration-200 md:left-[80px] md:top-[40px] md:text-[20px]"
    >
      <span className="block font-semibold tracking-[-0.02em]">Kaiva</span>
      <span className="block font-normal">
        Studio<span style={gradientAccentStyle}>.</span>
      </span>
    </a>

    <nav className="fixed right-[32px] top-[32px] z-40 hidden items-center gap-10 text-[16px] text-[#080808]/68 transition-colors duration-200 md:flex md:right-[80px] md:top-[45px]">
      <a href={projectsActive ? HOME_PAGE_HREF_FROM_PROJECTS : '#inicio'} onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'inicio')} className="font-medium" style={projectsActive ? undefined : gradientAccentStyle}>
        Inicio
      </a>
      <a href={projectsActive ? `${HOME_PAGE_HREF_FROM_PROJECTS}#kaiva` : '#kaiva'} onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'kaiva')} className="transition-colors hover:text-[#080808]">Nosotros</a>
      <a href={projectsActive ? './' : PROJECTS_PAGE_HREF} className="transition-colors hover:text-[#080808]" style={projectsActive ? gradientAccentStyle : undefined}>Proyectos</a>
      <a href={projectsActive ? `${HOME_PAGE_HREF_FROM_PROJECTS}#contacto` : '#contacto'} onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'contacto')} className="transition-colors hover:text-[#080808]">Contacto</a>
      <a
        href={projectsActive ? `${HOME_PAGE_HREF_FROM_PROJECTS}#planes` : '#planes'}
        onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'planes')}
        className="inline-flex h-[44px] items-center justify-center self-center rounded-full border border-[#080808]/12 bg-white/72 px-6 font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#080808] shadow-[0_12px_28px_-20px_rgba(8,8,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        Paquetes
      </a>
    </nav>

    <div className="fixed right-6 top-5 z-40 flex items-center gap-3 md:hidden">
      <a
        href={projectsActive ? `${HOME_PAGE_HREF_FROM_PROJECTS}#planes` : '#planes'}
        onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'planes')}
        className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-[#080808]/12 bg-white px-5 font-manrope text-[10px] font-bold uppercase tracking-[0.16em] text-[#080808] transition-colors hover:bg-[#f7f7f7]"
      >
        Paquetes
      </a>
    </div>
  </>
);

const ProjectsPage = () => {
  return (
    <>
      <FixedNavbar projectsActive />
      <PortfolioSection />
      <ServicesSection />
    </>
  );
};

const App = () => {
  const showProjectsPage = isProjectsPath();

  useEffect(() => {
    if (!showProjectsPage) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.slice(1);
        const timer = setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
            window.history.replaceState(null, '', window.location.pathname);
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <div className="relative z-10 w-full bg-white">
      {showProjectsPage ? (
        <ProjectsPage />
      ) : (
        <>
          <HeroSection />
          <ProblemSection />
          <div className="relative">
            <SectionsAuroraBackdrop />
            <div className="relative z-10">
              <ExpandedAgencySections />
              <AliadosSection />
              <ContactRevealSection />
            </div>
          </div>
        </>
      )}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/open-sauce-one');
        :root {
          --color-dominant: #ffffff;
          --color-secondary: #080808;
          --color-surface: #ffffff;
          --color-accent: #8242f5;
        }
        html { scroll-behavior: smooth; }
        html { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; font-kerning: normal; }
        body { background-color: var(--color-dominant); font-family: 'Inter Tight', 'Inter', sans-serif; letter-spacing: -0.01em; color: var(--color-secondary); }
        .aurora-base {
          background:
            radial-gradient(120% 130% at 0% 0%, rgba(126, 209, 255, 0.36) 0%, rgba(126, 209, 255, 0) 54%),
            radial-gradient(120% 120% at 100% 0%, rgba(155, 134, 255, 0.34) 0%, rgba(155, 134, 255, 0) 56%),
            radial-gradient(140% 150% at 100% 100%, rgba(255, 164, 214, 0.30) 0%, rgba(255, 164, 214, 0) 54%),
            radial-gradient(120% 120% at 0% 100%, rgba(107, 229, 229, 0.28) 0%, rgba(107, 229, 229, 0) 55%),
            linear-gradient(180deg, #ffffff 0%, #fcfcff 100%);
        }
        .aurora-blob {
          opacity: 1;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .aurora-blob-a {
          background: radial-gradient(circle at 30% 40%, rgba(107, 229, 229, 0.38) 0%, rgba(107, 229, 229, 0.10) 50%, rgba(107, 229, 229, 0) 80%);
          animation: floatBlobOne 24s ease-in-out infinite;
        }
        .aurora-blob-b {
          background: radial-gradient(circle at 70% 35%, rgba(155, 134, 255, 0.34) 0%, rgba(155, 134, 255, 0.08) 52%, rgba(155, 134, 255, 0) 80%);
          animation: floatBlobTwo 27s ease-in-out infinite;
        }
        .aurora-blob-c {
          background: radial-gradient(circle at 50% 62%, rgba(255, 164, 214, 0.32) 0%, rgba(255, 164, 214, 0.08) 50%, rgba(255, 164, 214, 0) 80%);
          animation: floatBlobThree 30s ease-in-out infinite;
        }
        .aurora-blur-overlay {
          background: linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.28) 100%);
        }
        .aurora-noise {
          opacity: 0.17;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(0,0,0,0.12) 0.6px, transparent 0.7px),
            radial-gradient(circle at 80% 60%, rgba(0,0,0,0.1) 0.5px, transparent 0.6px);
          background-size: 3px 3px, 4px 4px;
          mix-blend-mode: soft-light;
        }
        
        @keyframes floatBlobOne {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(4vw, -3vh, 0) scale(1.06); }
          100% { transform: translate3d(-2vw, 2.5vh, 0) scale(0.98); }
        }
        @keyframes floatBlobTwo {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-3.8vw, 2.8vh, 0) scale(1.05); }
          100% { transform: translate3d(2.4vw, -2.2vh, 0) scale(0.97); }
        }
        @keyframes floatBlobThree {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(2.6vw, -2.6vh, 0) scale(1.04); }
          100% { transform: translate3d(-3vw, 2vh, 0) scale(0.98); }
        }
        @media (max-width: 1200px) {
          .hero-copy-wrap { top: 136px !important; max-width: 640px !important; }
          .hero-visual-wrap { top: 250px !important; width: 116vw !important; max-width: 920px !important; }
        }
        @media (max-width: 768px) {
          .hero-copy-wrap { top: 108px !important; max-width: calc(100vw - 48px) !important; }
          .hero-visual-wrap { top: 275px !important; width: 114vw !important; max-width: 520px !important; }
        }
        @media (max-width: 400px) {
          .hero-copy-wrap { top: 96px !important; }
          .hero-visual-wrap { top: 255px !important; width: 108vw !important; max-width: 420px !important; }
        }
        @media (max-height: 700px) and (max-width: 768px) {
          .hero-copy-wrap { top: 86px !important; }
          .hero-visual-wrap { top: 220px !important; }
        }
          .contact-premium-card {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.09);
            box-shadow: 0 32px 80px -20px rgba(0, 0, 0, 0.10), 0 0 0 1px rgba(0,0,0,0.03);
          }
          .contact-input {
            background: #ffffff;
            border: 1.5px solid rgba(0, 0, 0, 0.06);
            transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.01);
          }
          .contact-input:focus {
            background: #ffffff;
            border-color: #8242f5;
            box-shadow: 0 0 0 4px rgba(130, 66, 245, 0.12), 0 4px 12px rgba(130, 66, 245, 0.06);
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .aurora-base,
            .aurora-blob,
            .aurora-hover-layer {
              animation: none;
            }
            .contact-premium-card,
            .contact-input,
            .contact-accent-button {
              transition: none;
            }
            .contact-premium-card {
              backdrop-filter: none;
              -webkit-backdrop-filter: none;
            }
          }
      `}</style>
    </div>
  );
}

const CountUpAnimation = ({ endValue, suffix = "", prefix = "", decimal = false }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 60 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        motionValue.set(endValue);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(decimal ? latest.toFixed(1) : Math.round(latest).toString());
    });
  }, [springValue, decimal]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

const ProblemSection = () => {
  return (
    <section id="problema" className="relative w-full bg-transparent text-[#080808] px-6 py-14 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1240px] relative z-10 flex flex-col items-center">
        
        <ScrollRevealHeadline text="El 91% de las empresas en Colombia son pymes. La mayoría no existe en internet." />
        
        <p className="mt-8 text-[16px] md:text-[18px] leading-[1.6] text-center max-w-[650px] text-[#080808]/70">
          Cada día, miles de colombianos buscan productos y servicios en Google. Si tu
          negocio no aparece, ese cliente se va a la competencia. Así de simple.
        </p>

        <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col items-center text-center sm:items-start sm:text-left gap-3">
            <div className="font-epilogue text-[42px] sm:text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={75} suffix="%" />
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de los colombianos busca productos y servicios en internet antes de comprar
            </p>
          </div>
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col items-center text-center sm:items-start sm:text-left gap-3">
            <div className="font-epilogue text-[42px] sm:text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={83} suffix="%" />
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de los emprendedores colombianos planea invertir más en presencia digital este año
            </p>
          </div>
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col items-center text-center sm:items-start sm:text-left gap-3">
            <div className="font-epilogue text-[42px] sm:text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={1.7} prefix="+" suffix="M" decimal={true} />
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de empresas registradas en Colombia. La mayoría sin presencia digital real
            </p>
          </div>
        </div>

        <div className="w-full mt-14 md:mt-20">
          <h3 className="mb-6 text-center font-manrope text-[clamp(24px,3.6vw,42px)] font-extrabold uppercase tracking-[0.04em] text-[#080808] md:mb-10">
            POR QUÉ MUCHOS NEGOCIOS SIGUEN SIN WEB
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            {/* Card 1 */}
            <div className="relative overflow-hidden bg-white rounded-[32px] p-8 md:p-10 text-[#080808] min-h-[320px] md:min-h-[360px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-[#080808]/5">
              <div className="relative z-10 w-[90%] md:w-[55%]">
                <h4 className="font-epilogue text-[32px] md:text-[40px] font-extrabold leading-[1.05] tracking-tight mb-4">
                  Es muy caro.
                </h4>
                <p className="font-manrope text-[14px] md:text-[15px] leading-[1.6] opacity-90 mb-8">
                  Muchos negocios creen que tener una web profesional está fuera de su presupuesto. No tiene por qué serlo.
                </p>
              </div>
                <button 
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-black/[0.04] py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:bg-black/[0.08]"
                  style={{
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.16), inset -2px -2px 6px rgba(255,255,255,0.35)'
                  }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#111111]/80">
                    SABER MÁS
                  </span>
                </button>
              <img
                src={asset('card-es-muy-caro.webp')}
                alt="Es muy caro"
                loading="lazy"
                className="absolute right-[-2%] bottom-[-5%] w-[200px] md:w-[280px] drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:-rotate-2 pointer-events-none z-0"
              />
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden bg-white rounded-[32px] p-8 md:p-10 text-[#080808] min-h-[320px] md:min-h-[360px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-[#080808]/5">
              <div className="relative z-10 w-[90%] md:w-[55%]">
                <h4 className="font-epilogue text-[32px] md:text-[40px] font-extrabold leading-[1.05] tracking-tight mb-4">
                  <span className="inline-block mr-2 text-[32px] md:text-[40px]">🤷‍♂️</span>
                  No sé cómo funciona.
                </h4>
                <p className="font-manrope text-[14px] md:text-[15px] leading-[1.6] opacity-90 mb-8">
                  Dominios, hosting, SEO, diseño... el lenguaje técnico aleja a dueños de negocio que simplemente quieren más clientes.
                </p>
              </div>
                <button 
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-black/[0.04] py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:bg-black/[0.08]"
                  style={{
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.16), inset -2px -2px 6px rgba(255,255,255,0.35)'
                  }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#111111]/80">
                    SABER MÁS
                  </span>
                </button>
              <img
                src={asset('card-no-se-como-funciona.webp')}
                alt="No sé cómo funciona"
                loading="lazy"
                className="absolute right-[-2%] bottom-[-5%] w-[200px] md:w-[280px] drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-2 pointer-events-none z-0"
              />
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden bg-white rounded-[32px] p-8 md:p-10 text-[#080808] min-h-[320px] md:min-h-[360px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-[#080808]/5">
              <div className="relative z-10 w-[90%] md:w-[55%]">
                <h4 className="font-epilogue text-[32px] md:text-[40px] font-extrabold leading-[1.05] tracking-tight mb-4">
                  <span className="inline-block mr-2 text-[32px] md:text-[40px]">😤</span>
                  Ya intenté y no funcionó.
                </h4>
                <p className="font-manrope text-[14px] md:text-[15px] leading-[1.6] opacity-90 mb-8">
                  Malas experiencias con freelancers o plantillas genéricas que no reflejan el negocio ni generan resultados.
                </p>
              </div>
                <button 
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-black/[0.04] py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:bg-black/[0.08]"
                  style={{
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.16), inset -2px -2px 6px rgba(255,255,255,0.35)'
                  }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#111111]/80">
                    SABER MÁS
                  </span>
                </button>
              <img
                src={asset('card-ya-intente.webp')}
                alt="Ya intenté y no funcionó"
                loading="lazy"
                className="absolute right-[-2%] bottom-[-5%] w-[200px] md:w-[280px] drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-2 pointer-events-none z-0"
              />
            </div>

            {/* Card 4 */}
            <div className="relative overflow-hidden bg-white rounded-[32px] p-8 md:p-10 text-[#080808] min-h-[320px] md:min-h-[360px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-[#080808]/5">
              <div className="relative z-10 w-[90%] md:w-[55%]">
                <h4 className="font-epilogue text-[32px] md:text-[40px] font-extrabold leading-[1.05] tracking-tight mb-4">
                  <span className="inline-block mr-2 text-[32px] md:text-[40px]">⏳</span>
                  No tengo tiempo.
                </h4>
                <p className="font-manrope text-[14px] md:text-[15px] leading-[1.6] opacity-90 mb-8">
                  Gestionar un negocio ya es suficiente trabajo. No debería necesitarse un equipo técnico propio para tener presencia digital.
                </p>
              </div>
                <button 
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-black/[0.04] py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:bg-black/[0.08]"
                  style={{
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.16), inset -2px -2px 6px rgba(255,255,255,0.35)'
                  }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#111111]/80">
                    SABER MÁS
                  </span>
                </button>
              <img
                src={asset('card-no-tengo-tiempo.webp')}
                alt="No tengo tiempo"
                loading="lazy"
                className="absolute right-[2%] bottom-[-5%] w-[180px] md:w-[240px] drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:-rotate-2 pointer-events-none z-0"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkNavbar = false;
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroComplete(true);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 10) {
        setNavHidden(false);
      } else if (currentY > lastScrollY.current + 6) {
        setNavHidden(true);
      } else if (currentY < lastScrollY.current - 6) {
        setNavHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="inicio" data-nav-theme="light" className="relative z-30 min-h-[100svh] w-full [overflow-x:clip] bg-[#ffffff] font-open-sauce text-[#080808] md:h-screen">
      {/* Gradiente izquierdo — sin overflow-hidden permite que sangre hacia la siguiente sección */}
      <motion.img
        src={asset('degradado-lateral.webp')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute left-[-48%] top-[72%] z-[5] hidden w-[82vw] min-w-[300px] max-w-[1120px] -translate-y-1/2 object-contain md:block md:left-[-34%] md:top-[71%] md:w-[66vw] md:min-w-[460px]"
      />
      <motion.img
        src={asset('degradado-lateral.webp')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute right-[-40%] top-[18%] z-[5] hidden w-[78vw] min-w-[280px] max-w-[980px] -translate-y-1/2 object-contain md:block md:right-[-28%] md:top-[22%] md:w-[60vw] md:min-w-[420px]"
      />

      <motion.div
        ref={logoRef}
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: navHidden ? -80 : 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-6 top-5 z-40 w-fit text-left text-[16px] leading-[0.95] transition-colors duration-200 md:left-[80px] md:top-[40px] md:text-[20px] ${
          isDarkNavbar ? 'text-white' : 'text-[#080808]'
        }`}
      >
        <span className="block font-semibold tracking-[-0.02em]">Kaiva</span>
        <span className="block font-normal">
          Studio<span style={gradientAccentStyle}>.</span>
        </span>
      </motion.div>

      <motion.div
        ref={navRef}
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: navHidden ? -80 : 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed right-[32px] top-[32px] z-40 hidden items-center gap-10 text-[16px] transition-colors duration-200 md:flex md:right-[80px] md:top-[45px] ${
          isDarkNavbar ? 'text-white/72' : 'text-[#080808]/68'
        }`}
      >
        <a
          href="#inicio"
          onClick={(event) => scrollToSection(event, 'inicio')}
          className="font-medium"
          style={gradientAccentStyle}
        >
          Inicio
        </a>
        <a href="#kaiva" onClick={(event) => scrollToSection(event, 'kaiva')} className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Nosotros</a>
        <a href={PROJECTS_PAGE_HREF} className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Proyectos</a>
        <a href="#contacto" onClick={(event) => scrollToSection(event, 'contacto')} className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Contacto</a>
        <a
          href="#planes"
          onClick={(event) => scrollToSection(event, 'planes')}
          className={`inline-flex h-[44px] items-center justify-center self-center rounded-full px-6 font-manrope text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 ${
            isDarkNavbar
              ? 'border border-white/18 bg-white/10 text-white hover:bg-white/16'
              : 'border border-[#080808]/12 bg-white/72 text-[#080808] shadow-[0_12px_28px_-20px_rgba(8,8,8,0.22)] hover:bg-white'
          }`}
        >
          Paquetes
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: navHidden ? -80 : 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-6 top-5 z-50 flex items-center gap-3 md:hidden"
      >
        <button
          aria-label="Abrir menú"
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#080808]/12 bg-white text-[#080808] shadow-[0_4px_14px_-8px_rgba(0,0,0,0.18)]"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <rect y="0" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="13" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-white px-6 pt-8 pb-10"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              <div className="text-[16px] leading-[0.95]">
                <span className="block font-semibold tracking-[-0.02em]">Kaiva</span>
                <span className="block font-normal">Studio<span style={gradientAccentStyle}>.</span></span>
              </div>
              <button
                aria-label="Cerrar menú"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#080808]/12 bg-[#f7f7f7] text-[#080808]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-1">
              {[
                { label: 'Inicio', id: 'inicio' },
                { label: 'Nosotros', id: 'kaiva' },
                { label: 'Contacto', id: 'contacto' },
                { label: 'Paquetes', id: 'planes' },
              ].map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { scrollToSection(e, id); setMobileMenuOpen(false); }}
                  className="py-4 text-[22px] font-semibold tracking-[-0.02em] text-[#080808] border-b border-[#080808]/6"
                >
                  {label}
                </a>
              ))}
              <a
                href={PROJECTS_PAGE_HREF}
                className="py-4 text-[22px] font-semibold tracking-[-0.02em] text-[#080808] border-b border-[#080808]/6"
                onClick={() => setMobileMenuOpen(false)}
              >
                Proyectos
              </a>
            </nav>
            <div className="mt-auto">
              <a
                href="#contacto"
                onClick={(e) => { scrollToSection(e, 'contacto'); setMobileMenuOpen(false); }}
                className="flex w-full items-center justify-center rounded-[30px] bg-[#0c0c0c] px-8 py-4 font-inter text-[14px] font-semibold text-white"
              >
                Quiero mi web
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.6, delay: 0.14, ease: 'easeOut' }}
        className="hero-copy-wrap absolute left-6 right-6 top-[110px] z-40 flex max-w-[360px] flex-col items-start text-left md:left-[80px] md:right-auto md:top-[160px] md:max-w-[720px]"
      >
        <h1 className="w-fit font-extrabold leading-[1.02] tracking-[-0.03em] text-[#080808] text-[clamp(26px,7vw,54px)] flex flex-col items-start gap-1">
          <AnimatedText text="Páginas web claras," startAnimation={introComplete} className="md:whitespace-nowrap" />
          <AnimatedText text="rápidas y profesionales" startAnimation={introComplete} className="md:whitespace-nowrap" />
        </h1>

        <a
          href={PROJECTS_PAGE_HREF}
          className="mt-4 inline-flex w-fit items-center gap-2 pb-1 text-[16px] font-medium leading-none underline decoration-1 underline-offset-[5px] md:mt-6 md:text-[20px]"
          style={gradientAccentStyle}
        >
          <span>Explora nuestro trabajo</span>
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
            style={{ color: '#8242f5' }}
          >
            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
        className="hero-visual-wrap absolute left-1/2 top-[290px] z-20 w-[118vw] max-w-[560px] -translate-x-1/2 px-0 md:top-[220px] md:w-[110vw] md:max-w-[1040px]"
      >
        <div className="relative mx-auto aspect-[1.08/1] w-full md:aspect-[1.16/1]">
          <img
            src={asset('nombre hero.webp')}
            alt="Kaiva Studio"
            fetchpriority="high"
            decoding="sync"
            className="absolute left-1/2 top-[10%] w-[58%] -translate-x-1/2 object-contain md:top-[10%] md:w-[50%]"
          />
          <motion.img
            src={asset('robots hero.webp')}
            alt="Robots Kaiva"
            fetchpriority="high"
            decoding="sync"
            className="absolute left-1/2 top-[9%] w-[245%] -translate-x-1/2 scale-[1.08] object-contain md:top-[8%] md:w-[280%] md:scale-[1.15]"
            animate={{
              y: [0, -7, 0, 7, 0],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 bottom-[110px] md:bottom-[6%] z-[60] -translate-x-1/2 w-full flex justify-center"
        initial={{ opacity: 0, y: 15 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
      >
        <a href="#contacto" onClick={(event) => scrollToSection(event, 'contacto')} className="flex min-h-[48px] sm:min-h-[52px] items-center justify-center rounded-[30px] bg-[#0c0c0c] px-8 font-inter text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.3)] sm:px-9 sm:text-[15px] whitespace-nowrap">
          Quiero mi web
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
        className="absolute bottom-4 left-6 right-6 z-40 hidden md:block md:bottom-[60px] md:left-auto md:right-[80px] md:max-w-[420px] md:text-[15px] text-left font-normal leading-[1.5] text-[#080808]/64"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}
      >
        Deja de perder clientes por no estar en internet. Diseñamos y desarrollamos tu página web con criterio profesional, entrega rápida y un precio justo.
      </motion.p>
    </section>
  );
};

export default App;










