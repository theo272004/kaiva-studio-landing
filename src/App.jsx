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
    [0.85, 1],
    ['100%', '0%'],
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
              className="relative z-10 max-w-[560px]"
            >
              <motion.div variants={textItem} className="font-manrope text-[16px] font-medium tracking-normal text-[#080808]/68">
                Contacto
              </motion.div>
              <motion.h2 className="mt-6 font-epilogue text-[clamp(56px,7vw,112px)] font-extrabold leading-[0.92] tracking-[-0.04em] text-[#080808] md:tracking-[-0.035em] lg:tracking-[-0.04em]">
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
          className="absolute inset-x-0 bottom-0 z-20 min-h-[45vh] bg-[#111111]"
          style={{ y: prefersReducedMotion ? '0%' : blackPanelY }}
        >
          <div className="mx-auto flex min-h-[45vh] w-full max-w-[1320px] flex-col items-center justify-center px-6 py-10 text-center md:px-12 md:py-12 lg:px-16">
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
                  className="group relative flex min-h-[340px] overflow-hidden rounded-[30px] border border-white/80 bg-white/82 shadow-[0_18px_48px_-34px_rgba(80,74,168,0.35)] outline-none backdrop-blur-[16px] transition-[opacity,transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white hover:shadow-[0_28px_74px_-44px_rgba(80,74,168,0.48)] md:min-h-[380px] xl:min-h-[420px]"
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  tabIndex={0}
                >
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
        <motion.div 
          className="mt-16 rounded-[32px] border border-[#080808]/14 bg-[var(--color-surface)] p-8 md:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {}
          }}
        >
          <div className="grid gap-8 md:grid-cols-5 md:gap-6">
            {processSteps.map((step, index) => (
              <motion.div 
                key={step} 
                className="relative"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <div className="mb-5 flex items-center gap-4 md:block">
                  <div className="mb-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#080808]/16 bg-[var(--color-dominant)] font-manrope text-[12px] font-bold tracking-[0.18em] md:mb-5" style={gradientAccentStyle}>
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
              </motion.div>
            ))}
          </div>
        </motion.div>
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
        className="absolute -right-[8%] top-[15%] z-50 w-[380px] opacity-100 md:-right-[6%] md:top-[10%] md:w-[600px] pointer-events-none"
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
                <article
                  key={plan.name}
                  className={`group relative flex min-h-[340px] flex-col rounded-[32px] border ${plan.featured ? 'border-[#a482ff]/50' : 'border-white/80'} bg-white/85 shadow-[0_18px_48px_-24px_rgba(32,29,26,0.12)] outline-none backdrop-blur-[16px] transition-[transform,shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-black/5 hover:shadow-[0_28px_74px_-34px_rgba(32,29,26,0.18)] md:min-h-[380px] xl:min-h-[420px]`}
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
                    <a href="#contacto" className="mt-10 inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-3 font-manrope text-[11px] font-bold uppercase tracking-widest text-[#080808] shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-[#080808]/5 transition-[shadow,transform] duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[1px]">
                      {plan.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-6 w-full max-w-[1180px]">
              <article className="group relative flex flex-col items-center justify-between gap-6 rounded-[32px] border border-white/80 bg-white/85 p-6 shadow-[0_18px_48px_-24px_rgba(32,29,26,0.12)] outline-none backdrop-blur-[16px] transition-[transform,shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_74px_-34px_rgba(32,29,26,0.18)] md:flex-row md:p-8 lg:px-12">
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
                  <a href="#contacto" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-[0_8px_20px_-6px_rgba(164,130,255,0.5)] transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #d49fff 0%, #a482ff 100%)' }}>
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

const WhyUsSection = () => {
  return (
    <section className="relative w-full bg-transparent text-[#080808] px-6 py-24 md:py-32 lg:px-16 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 max-w-[500px]">
          <h2 className="font-epilogue text-[40px] md:text-[56px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#080808]">
            El mundo digital te está esperando. Nosotros te llevamos.
          </h2>
          <p className="mt-8 text-[15px] md:text-[16px] leading-[1.6] text-[#080808]/70">
            Kaiva existe porque creemos que cualquier negocio colombiano, sin importar su tamaño, merece estar bien representado en internet. No como hobby, sino como motor real de ventas.
          </p>
          <p className="mt-6 text-[15px] md:text-[16px] leading-[1.6] text-[#080808]/70">
            Hacemos todo el trabajo técnico y creativo para que tú te concentres en lo que sabes hacer: tu negocio.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {[
            {
              title: "Visible en Google desde el día uno",
              desc: "Construimos sitios optimizados para SEO para que tus clientes te encuentren cuando te buscan."
            },
            {
              title: "Flujos de atención automatizados",
              desc: "Tu web responde, cotiza y agenda aunque estés atendiendo otro cliente o sea medianoche."
            },
            {
              title: "Sin tecnicismos, sin enredos",
              desc: "Manejamos todo lo técnico. Tú solo revisas, apruebas y recibes tu web funcionando."
            },
            {
              title: "Hecho para el mercado colombiano",
              desc: "Planes desde $320 USD pensados para la realidad de las pymes en Colombia."
            }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 rounded-[24px] border border-[#080808]/5 bg-white p-6 shadow-sm">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4f2ff]">
                <svg className="h-3 w-3 text-[#a482ff]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 mt-[-2px]">
                <h4 className="font-bold text-[15px] md:text-[16px] text-[#080808] leading-tight">{item.title}</h4>
                <p className="mt-1.5 text-[13px] md:text-[14px] leading-relaxed text-[#080808]/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AliadosSection = () => {
  return (
    <section className="relative w-full bg-transparent text-[#080808] px-6 py-16 md:py-24 lg:px-16 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 max-w-[460px]">
          <div className="mb-4 inline-block font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#a482ff]">
            ALIADOS ESTRATÉGICOS
          </div>
          <h2 className="font-epilogue text-[40px] md:text-[56px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#080808]">
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
    <motion.div style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.26em" }} variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((word, index) => (
        <motion.span variants={child} style={{ display: "inline-block" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
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

const App = () => {

  return (
    <div className="relative z-10 w-full bg-white">
      <CustomCursor />
      <HeroSection />
      <ProblemSection />
      <div className="relative">
        <SectionsAuroraBackdrop />
        <div className="relative z-10">
          <WhyUsSection />
          <PortfolioSection />
          <ExpandedAgencySections />
          <AliadosSection />
          <ContactRevealSection />
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
          .contact-premium-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(0, 0, 0, 0.12);
            box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.08);
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
    <section id="problema" className="relative w-full bg-transparent text-[#080808] px-6 py-24 md:py-32 lg:px-16">
      <div className="mx-auto w-full max-w-[1240px] relative z-10 flex flex-col items-center">
        
        <h2 className="font-epilogue text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-center max-w-[800px] mt-4">
          El 91% de las empresas en Colombia son pymes. La mayoría no existe en internet.
        </h2>
        
        <p className="mt-8 text-[16px] md:text-[18px] leading-[1.6] text-center max-w-[650px] text-[#080808]/70">
          Cada día, miles de colombianos buscan productos y servicios en Google. Si tu
          negocio no aparece, ese cliente se va a la competencia. Así de simple.
        </p>

        <div className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col gap-4">
            <div className="font-epilogue text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={75} suffix="%" />
            </div>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de los colombianos busca productos y servicios en internet antes de comprar
            </p>
          </div>
          <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col gap-4">
            <div className="font-epilogue text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={83} suffix="%" />
            </div>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de los emprendedores colombianos planea invertir más en presencia digital este año
            </p>
          </div>
          <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col gap-4">
            <div className="font-epilogue text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={1.7} prefix="+" suffix="M" decimal={true} />
            </div>
            <p className="text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de empresas registradas en Colombia. La mayoría sin presencia digital real
            </p>
          </div>
        </div>

        <div className="w-full mt-24">
          <h3 className="text-[14px] font-bold text-[#080808]/50 uppercase tracking-[0.15em] mb-6 md:mb-8 text-center md:text-left">
            POR QUÉ MUCHOS NEGOCIOS SIGUEN SIN WEB
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-[20px] p-6 md:p-8 flex items-start gap-4 shadow-sm border border-[#080808]/5">
              <span className="text-[24px]">💸</span>
              <div>
                <h4 className="font-bold text-[16px] md:text-[18px] text-[#080808] mb-2">"Es muy caro"</h4>
                <p className="text-[14px] md:text-[15px] text-[#080808]/70 leading-relaxed">
                  Muchos negocios creen que tener una web profesional está fuera de su presupuesto. No tiene por qué serlo.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 md:p-8 flex items-start gap-4 shadow-sm border border-[#080808]/5">
              <span className="text-[24px]">🤷‍♂️</span>
              <div>
                <h4 className="font-bold text-[16px] md:text-[18px] text-[#080808] mb-2">"No sé cómo funciona"</h4>
                <p className="text-[14px] md:text-[15px] text-[#080808]/70 leading-relaxed">
                  Dominios, hosting, SEO, diseño... el lenguaje técnico aleja a dueños de negocio que simplemente quieren más clientes.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 md:p-8 flex items-start gap-4 shadow-sm border border-[#080808]/5">
              <span className="text-[24px]">😤</span>
              <div>
                <h4 className="font-bold text-[16px] md:text-[18px] text-[#080808] mb-2">"Ya intenté y no funcionó"</h4>
                <p className="text-[14px] md:text-[15px] text-[#080808]/70 leading-relaxed">
                  Malas experiencias con freelancers o plantillas genéricas que no reflejan el negocio ni generan resultados.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[20px] p-6 md:p-8 flex items-start gap-4 shadow-sm border border-[#080808]/5">
              <span className="text-[24px]">⏳</span>
              <div>
                <h4 className="font-bold text-[16px] md:text-[18px] text-[#080808] mb-2">"No tengo tiempo"</h4>
                <p className="text-[14px] md:text-[15px] text-[#080808]/70 leading-relaxed">
                  Gestionar un negocio ya es suficiente trabajo. No debería necesitarse un equipo técnico propio para tener presencia digital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
    <section id="inicio" data-nav-theme="light" className="relative z-30 min-h-[100svh] w-full overflow-visible bg-[#ffffff] font-open-sauce text-[#080808] md:h-screen">
      <motion.img
        src={asset('degradado-lateral.png')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="pointer-events-none absolute left-[-48%] top-[72%] z-[5] hidden w-[82vw] min-w-[300px] max-w-[1120px] -translate-y-1/2 object-contain md:block md:left-[-34%] md:top-[71%] md:w-[66vw] md:min-w-[460px]"
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
        <h1 className="w-fit font-extrabold leading-[1.02] tracking-[-0.03em] text-[#080808] text-[30px] md:text-[54px] flex flex-col items-start gap-1">
          <AnimatedText text="Páginas web claras," startAnimation={introComplete} className="md:whitespace-nowrap" />
          <AnimatedText text="rápidas y profesionales" startAnimation={introComplete} className="md:whitespace-nowrap" />
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

      <motion.div
        className="absolute left-1/2 bottom-[8%] md:bottom-[6%] z-[60] -translate-x-1/2 w-full flex justify-center"
        initial={{ opacity: 0, y: 15 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
      >
        <a href="#contacto" className="flex min-h-[48px] sm:min-h-[52px] items-center justify-center rounded-[30px] bg-[#0c0c0c] px-8 font-inter text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.3)] sm:px-9 sm:text-[15px] whitespace-nowrap">
          Quiero mi web
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
        className="absolute bottom-4 left-6 right-6 z-40 max-w-[280px] text-left text-[12px] font-normal leading-[1.5] text-[#080808]/64 md:bottom-[60px] md:left-auto md:right-[80px] md:max-w-[420px] md:text-[15px]"
      >
        Deja de perder clientes por no estar en internet. Diseñamos y desarrollamos tu página web con criterio profesional, entrega rápida y un precio justo.
      </motion.p>
    </section>
  );
};

export default App;










