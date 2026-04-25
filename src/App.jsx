import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

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
    description: 'Creamos páginas web profesionales pensadas para transmitir confianza, ordenar la presencia digital y generar oportunidades reales.',
  },
  {
    title: 'Diseño UI/UX',
    description: 'Diseñamos experiencias claras, rápidas y enfocadas en conversión, con una estructura visual alineada al objetivo comercial.',
  },
  {
    title: 'Automatización',
    description: 'Integramos herramientas, respuestas y flujos para reducir fricción operativa y dejar una solución lista para funcionar.',
  },
  {
    title: 'Configuración técnica',
    description: 'Resolvemos dominio, hosting, seguridad, correos corporativos y publicación final dentro de un solo proceso.',
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
    dashboard: asset('kaiva_dashboard_mockup.png'),
    ecommerce: asset('kaiva_ecommerce_mockup.png'),
    tech: asset('kaiva_tech_mockup.png'),
    creative: asset('kaiva_creative_mockup.png'),
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f8f8fa]">
      <img
        src={mockups[type]}
        alt={type}
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
      <img src={src} alt="Kaiva Character" className="h-full w-full object-contain" />
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
  const opacity = absOffset > 2 ? 0 : isActive ? 1 : 0.55 - absOffset * 0.15;
  const blur = isActive ? 0 : absOffset * 2;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        width: 'clamp(250px, 68vw, 620px)',
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
        filter: `blur(${blur}px)`,
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

  const paragraphItem = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: isMobile ? 14 : 20, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.22 : 0.95,
        delay: prefersReducedMotion ? 0 : 0.15,
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const blackPanelY = useTransform(
    scrollYProgress,
    [0, 0.08, 1],
    ['105%', '105%', '25%'],
  );

  return (
    <section ref={sectionRef} id="contacto" className="relative min-h-[120vh] bg-transparent">
      <div className="sticky top-0 z-0 h-screen overflow-hidden bg-transparent">
        <div
          className="mx-auto flex h-full w-full max-w-[1320px] items-center px-6 md:px-12 lg:px-16"
          style={{
            paddingTop: 'clamp(128px, 15vw, 196px)',
            paddingBottom: 'clamp(128px, 15vw, 196px)',
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
              className="max-w-[560px]"
            >
              <motion.div variants={textItem} className="font-manrope text-[16px] font-medium tracking-normal text-[#080808]/68">
                Contacto
              </motion.div>
              <motion.h2 className="mt-6 font-epilogue text-[clamp(56px,7vw,112px)] font-extrabold leading-[0.92] tracking-[-0.04em] text-[#080808] md:tracking-[-0.035em] lg:tracking-[-0.04em]">
                <motion.span variants={textItem} className="block">Ready to</motion.span>
                <motion.span variants={textItem} className="block">start?</motion.span>
              </motion.h2>
              <motion.p
                variants={paragraphItem}
                className="mt-7 max-w-[34ch] text-[clamp(18px,1.4vw,22px)] leading-[1.55] text-[#080808]/62"
              >
                Cuéntanos qué estás construyendo y te responderemos con una propuesta clara, directa y bien estructurada.
              </motion.p>
            </motion.div>

            <motion.form
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={formItem}
              whileHover={prefersReducedMotion || isMobile ? undefined : { y: -2 }}
              transition={{ duration: 0.32, ease: premiumEase }}
              className="contact-premium-card rounded-[34px] p-5 md:p-6"
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
          className="absolute inset-x-0 bottom-0 z-20 min-h-[80vh] bg-[#111111]"
          style={{ y: prefersReducedMotion ? '0%' : blackPanelY }}
        >
          <div className="mx-auto flex min-h-[80vh] w-full max-w-[1320px] flex-col items-center justify-center px-6 py-12 text-center md:px-12 md:py-14 lg:px-16">
          <a
            href="mailto:hello@kaivastudio.com"
            className="font-epilogue text-[clamp(30px,4.2vw,58px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-white transition-opacity duration-300 hover:opacity-80"
          >
            hello@kaivastudio.com
          </a>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-manrope text-[11px] font-bold uppercase tracking-[0.22em] text-white/52">
            <a href="#" className="transition-colors duration-300 hover:text-white">Instagram</a>
            <a href="#" className="transition-colors duration-300 hover:text-white">Dribbble</a>
            <a href="#" className="transition-colors duration-300 hover:text-white">LinkedIn</a>
          </div>
          </div>
        </motion.div>
      </div>
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
      <div className="mx-auto w-full max-w-[1320px] px-6 py-28 md:px-12 md:py-36 lg:px-16">{children}</div>
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
            className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-4"
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
                  onHoverStart={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  className="group relative flex min-h-[340px] overflow-hidden rounded-[30px] border border-white/80 bg-white/82 shadow-[0_18px_48px_-34px_rgba(80,74,168,0.35)] outline-none backdrop-blur-[16px] transition-[opacity,transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white hover:shadow-[0_28px_74px_-44px_rgba(80,74,168,0.48)] md:min-h-[380px] xl:min-h-[420px]"
                  whileHover={{ y: -12 }}
                  animate={{ opacity: isQuiet ? 0.56 : 1 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  tabIndex={0}
                >
                  <motion.div
                    className="aurora-hover-layer pointer-events-none absolute inset-0 overflow-hidden"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 60,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="aurora-card-blob blob-1" />
                    <div className="aurora-card-blob blob-2" />
                    <div className="aurora-card-blob blob-3" />
                    <div className="aurora-card-blob blob-4" />
                    <div className="aurora-card-blob blob-5" />
                  </motion.div>

                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    animate={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.46)',
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative z-10 flex min-h-full w-full flex-col px-7 py-9 md:px-8 md:py-10 lg:px-9 lg:py-11 xl:px-10">
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
        className="relative z-10 mt-8 h-[350px] sm:h-[420px] md:mt-12 md:h-[clamp(440px,58vh,680px)]"
        style={{
          perspective: '2000px',
        }}
        onWheel={handleWheel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <FloatingRobot
          src={asset('KaivaTheo.png')}
          className="block"
          style={{ top: '1%', left: '2%', width: 'clamp(96px, 14vw, 210px)', height: 'clamp(96px, 14vw, 210px)' }}
          delay={0}
          duration={10}
          amplitude={6}
          rotation={2}
        />
        <FloatingRobot
          src={asset('KaivaSara.png')}
          className="block"
          style={{ bottom: '18%', right: '2%', width: 'clamp(96px, 14vw, 210px)', height: 'clamp(96px, 14vw, 210px)' }}
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

      <div className="px-6 md:hidden">
        <div className="rounded-[22px] border border-[#080808]/10 bg-[var(--color-surface)] p-5 shadow-[0_18px_48px_-28px_rgba(0,0,0,0.12)]">
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
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06), inset 1px 1px 2px rgba(255,255,255,1), inset -1px -1px 2px rgba(0,0,0,0.05)',
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
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06), inset 1px 1px 2px rgba(255,255,255,1), inset -1px -1px 2px rgba(0,0,0,0.05)',
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

const ExpandedAgencySections = () => (
  <>
    <ServicesSection />

    <SectionShell id="proceso" tone="light">
      <motion.div {...sectionReveal}>
        <SectionHeader
          eyebrow="Proceso"
          title="Cómo trabajamos"
          description="Nuestro proceso está pensado para ser claro, estructurado y sin fricciones, de modo que el cliente entienda qué se está haciendo, por qué se hace y qué resultado puede esperar."
        />
        <div className="mt-16 rounded-[32px] border border-[#080808]/14 bg-[var(--color-surface)] p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-5 md:gap-6">
            {processSteps.map((step, index) => (
              <div key={step} className="relative">
                <div className="mb-5 flex items-center gap-4 md:block">
                  <div className="mb-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#080808]/16 bg-[var(--color-dominant)] font-manrope text-[12px] font-bold tracking-[0.18em] text-[#080808] md:mb-5">
                    0{index + 1}
                  </div>
                  <div className="font-epilogue text-[24px] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#080808] md:text-[22px]">{step}</div>
                </div>
                <p className="max-w-[210px] text-[14px] leading-7 text-[#080808]/62">
                  {index === 0 && 'Analizamos objetivos, contexto y necesidades del negocio antes de construir.'}
                  {index === 1 && 'Organizamos la estructura para que la presencia digital tenga un propósito claro y medible.'}
                  {index === 2 && 'Diseñamos una experiencia visual atractiva, profesional y alineada a la marca.'}
                  {index === 3 && 'Integramos tecnología, herramientas y configuración técnica completa en un solo servicio.'}
                  {index === 4 && 'Publicamos una solución lista para operar desde el primer día, con soporte posterior según el plan.'}
                </p>
                {index < processSteps.length - 1 ? (
                  <div className="hidden md:block">
                    <div className="absolute left-[58px] top-6 h-px w-[calc(100%-24px)] bg-gradient-to-r from-[#080808]/18 to-[#080808]/4" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionShell>

    <section
      id="planes"
      data-nav-theme="light"
      className="relative bg-transparent px-4 py-12 md:px-8 md:py-16"
    >
      <motion.img
        src={asset('KaivaMora1.png')}
        alt=""
        className="absolute -right-[5%] top-[10%] z-50 w-[380px] opacity-100 md:right-[1%] md:top-[15%] md:w-[550px] pointer-events-none"
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

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <motion.article
                key={plan.name}
                whileHover={undefined}
                transition={undefined}
                className="pricing-card relative flex h-full flex-col overflow-hidden rounded-[34px] p-6 md:p-8"
                style={createGlassPanelStyle()}
              >
                <GlassPanelLayers />

                {plan.featured ? (
                  <div
                    className="absolute right-5 top-5 rounded-full px-3.5 py-2 font-manrope text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(155,109,255,0.6) 0%, rgba(130,66,245,0.4) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.6)',
                      boxShadow: '0 8px 16px rgba(130,66,245,0.2), inset 1px 1px 2px rgba(255,255,255,0.8), inset -1px -1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    {plan.badge}
                  </div>
                ) : null}

                <div className="relative font-manrope text-[11px] font-bold uppercase tracking-[0.22em] text-[#2a1a4e]/55">
                  {plan.name}
                </div>
                <div className="relative mt-3 font-epilogue text-[34px] font-extrabold leading-[1] tracking-[-0.03em] text-[#1a0e38] md:text-[38px]">
                  {plan.price}
                </div>
                <p className="relative mt-3 max-w-[28ch] text-[14px] leading-6 text-[#2a1a4e]/70">
                  {plan.audience}
                </p>
                <p className="relative mt-3 text-[14px] leading-6 text-[#2a1a4e]/55">
                  {plan.description}
                </p>

                <div className="relative my-5 h-px bg-white/20" />

                <div className="relative space-y-2.5">
                  {plan.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span
                        className="mt-[4px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, rgba(160,112,255,0.6) 0%, rgba(130,66,245,0.4) 100%)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255,255,255,0.6)',
                          boxShadow: '0 4px 8px rgba(130,66,245,0.2), inset 1px 1px 2px rgba(255,255,255,0.8), inset -1px -1px 2px rgba(0,0,0,0.1)',
                        }}
                      >
                        ✓
                      </span>
                      <span className="text-[14px] leading-6 text-[#2a1a4e]/72">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-auto pt-6">
                  <button
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-3 font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a0e38] transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(255,255,255,0.45)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.8)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.08), inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.article
            whileHover={undefined}
            transition={undefined}
            className="relative mt-5 overflow-hidden rounded-[34px]"
            style={createGlassPanelStyle()}
          >
            <GlassPanelLayers />
            <div className="relative grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-center">
              <div className="px-6 py-6 md:min-h-[148px] md:px-8" style={{ borderRight: '1px solid rgba(255,255,255,0.24)' }}>
                <div className="font-manrope text-[11px] font-bold uppercase tracking-[0.24em]" style={gradientAccentStyle}>
                  {ecommercePlan.label}
                </div>
                <div className="mt-3 font-epilogue text-[30px] font-semibold leading-[1.02] tracking-[-0.025em] text-[#1a0e38] md:text-[34px]">
                  {ecommercePlan.name}
                </div>
                <div className="mt-3 font-manrope text-[18px] font-extrabold leading-none tracking-[-0.03em] text-[#2a1a4e]/85">
                  {ecommercePlan.price}
                </div>
              </div>

              <div className="px-6 py-6 md:min-h-[148px] md:flex md:items-center md:px-8 md:py-0" style={{ borderRight: '1px solid rgba(255,255,255,0.24)' }}>
                <p className="max-w-[62ch] text-[14px] leading-6 text-[#2a1a4e]/65 md:text-[15px] md:leading-7">
                  {ecommercePlan.description}
                </p>
              </div>

              <div className="px-6 pb-6 md:flex md:min-h-[148px] md:items-center md:justify-center md:px-8 md:py-0">
                <button
                  aria-label={ecommercePlan.cta}
                  className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(160,112,255,0.6) 0%, rgba(130,66,245,0.4) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 12px 32px rgba(130,66,245,0.25), inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.15)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 17L17 7M17 7H9M17 7V15"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.article>
      </motion.div>
    </section>

    <SectionShell id="por-que-kaiva" tone="light">
      <motion.div {...sectionReveal} className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeader
          eyebrow="Confianza"
          title="Por qué Kaiva"
          description="Kaiva Studio se rige por principios claros que garantizan consistencia, confianza y profesionalismo en cada proyecto."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {trustPoints.map((point, index) => (
              <div
                key={point}
                className="rounded-[26px] border border-[#080808]/14 bg-[var(--color-surface)] p-6"
              >
              <div className="font-manrope text-[11px] font-bold uppercase tracking-[0.22em] text-[#080808]/42">0{index + 1}</div>
              <div className="mt-4 font-epilogue text-[27px] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#080808]">{point}</div>
              <div className="mt-3 text-[14px] leading-7 text-[#080808]/66">
                {index === 0 && 'Cada proceso debe ser entendible para el cliente.'}
                {index === 1 && 'Cada entrega debe cumplir un estándar alto.'}
                {index === 2 && 'Los tiempos se respetan y se optimizan.'}
                {index === 3 && 'Lo prometido se cumple con orden y control.'}
                {index === 4 && 'Cada decisión tiene un propósito funcional.'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionShell>

    <SectionShell id="cta" tone="light" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <motion.div {...sectionReveal} className="relative z-10 rounded-[36px] border border-[#080808]/14 bg-[var(--color-surface)] px-8 py-16 text-center md:px-14 md:py-22">
        <div className="mx-auto max-w-4xl">
          <div className="inline-block w-fit font-manrope text-[11px] font-bold uppercase tracking-[0.24em]" style={gradientAccentStyle}>Visión</div>
          <h2 className="mt-6 font-epilogue text-[clamp(40px,5.4vw,86px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#080808]">
            Construimos presencia digital sólida y bien ejecutada
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-[#080808]/72">
            Buscamos consolidarnos como un estudio referente en desarrollo web para negocios que valoran la claridad, la estética y la estructura.
          </p>
          <a
            href="#contacto"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-transparent px-9 py-4 font-manrope text-[13px] font-bold uppercase tracking-[0.15em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-92"
            style={accentButtonStyle}
          >
            Hablemos de tu proyecto
          </a>
        </div>
      </motion.div>
    </SectionShell>

    <ContactRevealSection />
  </>
);

export default function KaivaLanding() {
  return (
    <div className="typography-refined relative w-full overflow-x-hidden">
      <div className="relative z-10">
        <HeroSection />
        <PortfolioSection />
        <div className="relative">
          <SectionsAuroraBackdrop />
          <div className="relative z-10">
            <ExpandedAgencySections />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;600;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
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
            radial-gradient(120% 130% at 0% 0%, rgba(126, 209, 255, 0.42) 0%, rgba(126, 209, 255, 0) 54%),
            radial-gradient(120% 120% at 100% 0%, rgba(155, 134, 255, 0.4) 0%, rgba(155, 134, 255, 0) 56%),
            radial-gradient(140% 150% at 100% 100%, rgba(255, 164, 214, 0.36) 0%, rgba(255, 164, 214, 0) 54%),
            radial-gradient(120% 120% at 0% 100%, rgba(107, 229, 229, 0.34) 0%, rgba(107, 229, 229, 0) 55%),
            linear-gradient(180deg, #ffffff 0%, #fcfcff 100%);
          animation: auroraShift 22s ease-in-out infinite alternate;
        }
        .aurora-blob {
          filter: blur(84px);
          opacity: 0.44;
          will-change: transform, opacity;
        }
        .aurora-blob-a {
          background: radial-gradient(circle at 30% 40%, rgba(107, 229, 229, 0.8) 0%, rgba(107, 229, 229, 0.18) 42%, rgba(107, 229, 229, 0) 75%);
          animation: floatBlobOne 24s ease-in-out infinite;
        }
        .aurora-blob-b {
          background: radial-gradient(circle at 70% 35%, rgba(155, 134, 255, 0.78) 0%, rgba(155, 134, 255, 0.18) 46%, rgba(155, 134, 255, 0) 76%);
          animation: floatBlobTwo 27s ease-in-out infinite;
        }
        .aurora-blob-c {
          background: radial-gradient(circle at 50% 62%, rgba(255, 164, 214, 0.72) 0%, rgba(255, 164, 214, 0.16) 44%, rgba(255, 164, 214, 0) 76%);
          animation: floatBlobThree 30s ease-in-out infinite;
        }
        .aurora-blur-overlay {
          backdrop-filter: blur(46px) saturate(108%);
          -webkit-backdrop-filter: blur(46px) saturate(108%);
          background: linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0.3) 100%);
        }
        .aurora-noise {
          opacity: 0.17;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(0,0,0,0.12) 0.6px, transparent 0.7px),
            radial-gradient(circle at 80% 60%, rgba(0,0,0,0.1) 0.5px, transparent 0.6px);
          background-size: 3px 3px, 4px 4px;
          mix-blend-mode: soft-light;
        }
        .aurora-hover-layer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 55%;
          overflow: hidden;
          background: linear-gradient(to top, rgba(130, 66, 245, 0.08), transparent);
          pointer-events: none;
          z-index: 0;
        }
        .aurora-card-blob {
          position: absolute;
          width: 150px;
          height: 150px;
          filter: blur(45px);
          opacity: 0.9;
          mix-blend-mode: hard-light;
          border-radius: 50%;
        }
        .blob-1 {
          background: #21b2c6;
          bottom: -30px; left: 0%;
          animation: blob-float-1 8s infinite ease-in-out;
        }
        .blob-2 {
          background: #8242f5;
          bottom: -20px; right: 5%;
          animation: blob-float-2 10s infinite ease-in-out;
        }
        .blob-3 {
          background: #d96cff;
          bottom: -50px; left: 30%;
          animation: blob-float-1 12s infinite reverse ease-in-out;
        }
        @keyframes blob-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(30px, -25px) scale(1.3) rotate(10deg); }
        }
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1.2) rotate(0deg); }
          50% { transform: translate(-40px, -20px) scale(0.95) rotate(-10deg); }
        }
        @keyframes auroraShift {
          0% { background-position: 0% 50%, 100% 50%, 50% 100%, 50% 0%, 50% 50%; }
          100% { background-position: 100% 50%, 0% 60%, 50% 0%, 50% 100%, 50% 50%; }
        }
        @keyframes floatBlobOne {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.44; }
          50% { transform: translate3d(4vw, -3vh, 0) scale(1.06); opacity: 0.52; }
          100% { transform: translate3d(-2vw, 2.5vh, 0) scale(0.98); opacity: 0.4; }
        }
        @keyframes floatBlobTwo {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.45; }
          50% { transform: translate3d(-3.8vw, 2.8vh, 0) scale(1.05); opacity: 0.5; }
          100% { transform: translate3d(2.4vw, -2.2vh, 0) scale(0.97); opacity: 0.4; }
        }
        @keyframes floatBlobThree {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate3d(2.6vw, -2.6vh, 0) scale(1.04); opacity: 0.48; }
          100% { transform: translate3d(-3vw, 2vh, 0) scale(0.98); opacity: 0.38; }
        }
        @media (max-width: 1200px) {
          .hero-copy-wrap { top: 136px !important; max-width: 640px !important; }
          .hero-visual-wrap { top: 250px !important; width: 116vw !important; max-width: 920px !important; }
        }
        @media (max-width: 768px) {
          .hero-copy-wrap { top: 108px !important; max-width: 360px !important; }
          .hero-visual-wrap { top: 284px !important; width: 122vw !important; max-width: 560px !important; }
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

const HeroSection = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [isDarkNavbar, setIsDarkNavbar] = useState(false);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroComplete(true);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const resolveThemeAtPoint = (x, y) => {
      const stack = document.elementsFromPoint(x, y);
      const match = stack.find((element) => {
        if (logoRef.current?.contains(element) || navRef.current?.contains(element)) return false;
        return element.closest?.('[data-nav-theme]');
      });

      return match?.closest?.('[data-nav-theme]')?.getAttribute('data-nav-theme') ?? 'light';
    };

    const updateNavbarTone = () => {
      const leftTone = resolveThemeAtPoint(120, 52);
      const rightTone = resolveThemeAtPoint(Math.max(window.innerWidth - 160, 120), 58);
      setIsDarkNavbar(leftTone === 'dark' || rightTone === 'dark');
    };

    updateNavbarTone();
    window.addEventListener('scroll', updateNavbarTone, { passive: true });
    window.addEventListener('resize', updateNavbarTone);

    return () => {
      window.removeEventListener('scroll', updateNavbarTone);
      window.removeEventListener('resize', updateNavbarTone);
    };
  }, []);

  return (
    <section id="inicio" data-nav-theme="light" className="relative min-h-[100svh] w-full overflow-visible bg-[#ffffff] font-open-sauce text-[#080808] md:h-screen">
      <motion.img
        src={asset('degradado-lateral.png')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="pointer-events-none absolute left-[-48%] top-[70%] z-[5] hidden w-[82vw] min-w-[300px] max-w-[1120px] -translate-y-1/2 object-contain md:block md:left-[-34%] md:top-[68%] md:w-[66vw] md:min-w-[460px]"
      />
      <motion.img
        src={asset('degradado-lateral.png')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
        className="pointer-events-none absolute right-[-40%] top-[18%] z-[5] hidden w-[78vw] min-w-[280px] max-w-[980px] -translate-y-1/2 object-contain md:block md:right-[-28%] md:top-[22%] md:w-[60vw] md:min-w-[420px]"
      />

      <motion.div
        ref={logoRef}
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
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
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        className={`fixed right-[32px] top-[32px] z-40 hidden items-center gap-10 text-[16px] transition-colors duration-200 md:flex md:right-[80px] md:top-[45px] ${
          isDarkNavbar ? 'text-white/72' : 'text-[#080808]/68'
        }`}
      >
        <a
          href="#inicio"
          className="font-medium"
          style={gradientAccentStyle}
        >
          Inicio
        </a>
        <a href="#kaiva" className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Nosotros</a>
        <a href="#proyectos" className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Proyectos</a>
        <a href="#contacto" className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Contacto</a>
        <a
          href="#planes"
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
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        className="fixed right-6 top-5 z-40 flex items-center gap-3 md:hidden"
      >
        <a
          href="#planes"
          className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-[#080808]/12 bg-white px-5 font-manrope text-[10px] font-bold uppercase tracking-[0.16em] text-[#080808] transition-colors hover:bg-[#f7f7f7]"
        >
          Paquetes
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.6, delay: 0.14, ease: 'easeOut' }}
        className="hero-copy-wrap absolute left-6 right-6 top-[110px] z-40 flex max-w-[360px] flex-col items-start text-left md:left-[80px] md:right-auto md:top-[160px] md:max-w-[720px]"
      >
        <h1 className="w-fit text-[30px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#080808] md:text-[54px]">
          <span className="block md:whitespace-nowrap">Páginas web claras,</span>
          <span className="block md:whitespace-nowrap">rápidas y profesionales</span>
        </h1>

        <a
          href="#proyectos"
          className="mt-4 inline-block w-fit pb-1 text-[16px] font-medium leading-none underline decoration-1 underline-offset-[5px] md:mt-6 md:text-[20px]"
          style={gradientAccentStyle}
        >
          Explora nuestro trabajo ↗
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
            src={asset('nombre hero.png')}
            alt="Kaiva Studio"
            className="absolute left-1/2 top-[10%] w-[58%] -translate-x-1/2 object-contain md:top-[10%] md:w-[50%]"
          />
          <motion.img
            src={asset('robots hero.png')}
            alt="Robots Kaiva"
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

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
        className="absolute bottom-4 left-6 right-6 z-40 max-w-[280px] text-left text-[12px] font-normal leading-[1.5] text-[#080808]/64 md:bottom-[60px] md:left-auto md:right-[80px] md:max-w-[420px] md:text-[15px]"
      >
        Kaiva Studio combina diseño, estructura y tecnología
        <br />
        para construir activos digitales que funcionan.
      </motion.p>
    </section>
  );
};





