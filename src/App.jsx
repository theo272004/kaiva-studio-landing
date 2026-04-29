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

const serviceShowcase = [
  {
    id: 'web',
    number: '01',
    label: 'Desarrollo web',
    vibe: 'Rendimiento · Conversión',
    brand: 'KAIVA WEB',
    description:
      'Landing pages y sitios corporativos con estructura clara, velocidad real y una narrativa diseñada para convertir visitas en conversaciones.',
    accent: '#8242f5',
    mockup: 'ecommerce',
    title: 'Rendimiento & Conversión',
    points: ['Copy y estructura', 'Responsive premium', 'SEO base', 'Entrega lista para crecer'],
  },
  {
    id: 'design',
    number: '02',
    label: 'Diseño',
    vibe: 'Percepción · Claridad',
    brand: 'KAIVA DESIGN',
    description:
      'Dirección visual, identidad y sistemas de interfaz para que la marca se vea cohesionada y transmita más valor en cada punto de contacto.',
    accent: '#d96cff',
    title: 'Diseño visual y de interfaz para que la marca tenga presencia.',
    points: ['Dirección de arte', 'UI systems', 'Brand boards', 'Presentaciones y assets'],
  },
  {
    id: 'automation',
    number: '03',
    label: 'Automatización',
    vibe: 'Operación · Sistemas',
    brand: 'KAIVA SYSTEMS',
    description:
      'Conectamos formularios, CRM, mensajes y procesos internos para que el negocio responda más rápido y pierda menos tiempo en tareas repetitivas.',
    accent: '#21b2c6',
    title: 'Sistemas que ordenan la operación y ejecutan procesos repetitivos.',
    points: ['Bots y flujos', 'Integraciones', 'Dashboards internos', 'Automatización comercial'],
  },
];

const webSlides = [
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

const handleServiceCardMouseMove = (event) => {
  if (typeof window !== 'undefined' && window.innerWidth < 769) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 42;
  const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 32;
  event.currentTarget.style.setProperty('--service-move-x', `${moveX}px`);
  event.currentTarget.style.setProperty('--service-move-y', `${moveY}px`);
  event.currentTarget.style.setProperty('--service-rotate-y', `${moveX * 0.5}deg`);
  event.currentTarget.style.setProperty('--service-rotate-x', `${moveY * -0.4}deg`);
};

const resetServiceCardMouseMove = (event) => {
  event.currentTarget.style.setProperty('--service-move-x', '0px');
  event.currentTarget.style.setProperty('--service-move-y', '0px');
  event.currentTarget.style.setProperty('--service-rotate-y', '0deg');
  event.currentTarget.style.setProperty('--service-rotate-x', '0deg');
};

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

const ServiceShowcaseVisual = ({ service, prefersReducedMotion }) => {
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: premiumEase };

  if (service.id === 'web') {
    return (
      <motion.div
        key={service.id}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12, scale: 0.985 }}
        transition={panelTransition}
        className="service-visual-web w-full overflow-hidden rounded-[30px] bg-[#eae6df]"
      >
        <div
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform"
          style={{ transform: 'perspective(700px) rotateY(var(--service-rotate-y,0deg)) rotateX(var(--service-rotate-x,0deg)) translateZ(8px)' }}
        >
          <div className="flex min-h-[390px] items-center justify-center bg-[#eae6df] p-8">
            <div className="mockup-browser w-[85%] max-w-[480px] overflow-hidden rounded-[12px] border border-[#d9d3ca] bg-white shadow-[0_20px_50px_rgba(57,53,44,0.15)]">
              <div className="bar flex h-[30px] items-center gap-[7px] bg-[#f7f5f2] px-[14px]">
                <span className="block h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
                <span className="block h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
                <span className="block h-[10px] w-[10px] rounded-full bg-[#28c840]" />
              </div>
              <div className="content flex flex-col gap-[0.7rem] p-[1.6rem]">
                <div className="line h-[8px] w-[80%] rounded-[4px] bg-[#eae6df]" />
                <div className="line short h-[8px] w-[60%] rounded-[4px] bg-[#eae6df]" />
                <div className="line accent h-[8px] w-[35%] rounded-[4px] bg-[#792fec] shadow-[0_0_12px_rgba(121,47,236,0.25)]" />
                <div className="card-mini mt-[0.4rem] flex items-center gap-[0.8rem] rounded-[8px] border border-[#e0dbd2] bg-[#f9f8f6] p-[1rem]">
                  <div className="avatar h-[32px] w-[32px] rounded-full bg-[#d9d3ca]" />
                  <div className="text-group flex-1">
                    <div className="l mb-[4px] h-[6px] w-[70%] rounded-[3px] bg-[#d9d3ca]" />
                    <div className="l short h-[6px] w-[50%] rounded-[3px] bg-[#d9d3ca]" />
                  </div>
                </div>
                <div className="line h-[8px] w-[50%] rounded-[4px] bg-[#eae6df]" />
                <div className="line short h-[8px] w-[60%] rounded-[4px] bg-[#eae6df]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (service.id === 'design') {
    return (
      <motion.div
        key={service.id}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12, scale: 0.985 }}
        transition={panelTransition}
        className="w-full"
      >
        <div
          className="design-composition service-visual-design grid gap-4 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform lg:grid-cols-[0.88fr_1.12fr]"
          style={{ transform: 'translate(calc(var(--service-move-x,0px) * 0.7), calc(var(--service-move-y,0px) * 0.5))' }}
        >
          <div className="rounded-[28px] border border-[#111827]/8 bg-[#fffdf9] p-5 shadow-[0_26px_72px_-40px_rgba(15,23,42,0.28)]">
            <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8b5cf6]">Brand board</div>
            <div className="space-y-3">
              <div className="font-epilogue text-4xl font-extrabold tracking-[-0.04em] text-[#16151f]">Kaiva</div>
              <div className="text-lg font-semibold tracking-[-0.03em] text-[#16151f]">Systems with character</div>
              <div className="max-w-[15rem] text-sm leading-6 text-[#5b556e]">
                Dirección visual, color, tipografía y piezas listas para web, decks o redes.
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {['#16151f', '#8242f5', '#d96cff', '#f3ede4'].map((color) => (
                <div key={color} className="h-12 rounded-2xl border border-black/5" style={{ background: color }} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-[#111827]/8 bg-[#f5f0ff] p-5 shadow-[0_28px_74px_-40px_rgba(91,33,182,0.34)]">
            <div className="grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[24px] bg-white p-4 shadow-[0_18px_48px_-32px_rgba(15,23,42,0.32)]">
                <div className="mb-4 h-36 rounded-[20px] bg-[linear-gradient(160deg,_#111827,_#6d28d9_58%,_#f5d0fe_120%)]" />
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded-full bg-[#111827]" />
                  <div className="h-3 rounded-full bg-[#d8ccff]" />
                  <div className="h-3 w-4/5 rounded-full bg-[#eadcff]" />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[24px] bg-[#151225] p-4 text-white">
                  <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/52">UI kit</div>
                  <div className="flex gap-2">
                    <div className="h-10 flex-1 rounded-full bg-white text-[#121212]" />
                    <div className="h-10 w-12 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="rounded-[24px] bg-white p-4">
                  <div className="mb-3 h-3 w-20 rounded-full bg-[#d8ccff]" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 rounded-[18px] bg-[linear-gradient(135deg,_#ede9fe,_#ffffff)]" />
                    <div className="h-20 rounded-[18px] bg-[linear-gradient(135deg,_#111827,_#334155)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={service.id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12, scale: 0.985 }}
      transition={panelTransition}
      className="w-full overflow-hidden rounded-[30px] border border-[#0f172a]/8 bg-[#09111f] p-5 shadow-[0_32px_90px_-42px_rgba(2,8,23,0.92)]"
    >
      <div
        className="automation-flow service-visual-flow transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform"
        style={{ transform: 'translate(calc(var(--service-move-x,0px) * 0.4), calc(var(--service-move-y,0px) * 0.3))' }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#7dd3fc]">Automation flow</div>
            <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Sistemas que ejecutan</div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/48">
            24/7
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-[linear-gradient(135deg,_#38bdf8,_#6366f1)]" />
              <div>
                <div className="h-3 w-24 rounded-full bg-white/18" />
                <div className="mt-2 h-2 w-16 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-[18px] bg-[#0f172a] px-4 py-3 text-sm text-white/86">Nuevo lead desde la web</div>
              <div className="rounded-[18px] bg-white/10 px-4 py-3 text-sm text-white/74">Clasificar, etiquetar y notificar</div>
              <div className="rounded-[18px] bg-white/10 px-4 py-3 text-sm text-white/74">Disparar respuesta o tarea interna</div>
            </div>
          </div>
          <div className="rounded-[24px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_32%),linear-gradient(180deg,_#0f172a_0%,_#050814_100%)] p-4">
            <div className="grid gap-3 md:grid-cols-3">
              {['Lead', 'CRM', 'Ops'].map((item, index) => (
                <div key={item} className="rounded-[18px] border border-white/10 bg-white/6 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="h-9 w-9 rounded-2xl"
                      style={{
                        background:
                          index === 0
                            ? 'linear-gradient(135deg, #38bdf8, #0ea5e9)'
                            : index === 1
                              ? 'linear-gradient(135deg, #818cf8, #8b5cf6)'
                              : 'linear-gradient(135deg, #34d399, #10b981)',
                      }}
                    />
                    <div className="h-3 w-14 rounded-full bg-white/16" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 rounded-full bg-white/12" />
                    <div className="h-3 w-4/5 rounded-full bg-white/8" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/34">
              <div className="h-px bg-white/12" />
              <span>Sync</span>
              <div className="h-px bg-white/12" />
              <span>Route</span>
              <div className="h-px bg-white/12" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
    <section id="contacto" ref={sectionRef} className="contact-section relative w-full overflow-x-clip bg-transparent">
      <div
        className="contact-main-block mx-auto flex w-full max-w-[1320px] items-center px-6 md:px-12 lg:px-16"
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
        className="contact-footer-block w-full bg-[#111111] pb-[max(env(safe-area-inset-bottom),0px)]"
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
  const prefersReducedMotion = useReducedMotion();
  const [activeWebSlide, setActiveWebSlide] = useState(1);
  const [isWebCarouselHovering, setIsWebCarouselHovering] = useState(false);

  useEffect(() => {
    if (isWebCarouselHovering) return undefined;
    const timer = setInterval(() => {
      setActiveWebSlide((prev) => (prev + 1) % webSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isWebCarouselHovering]);

  const handleWebCarouselWheel = (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      event.preventDefault();
      if (event.deltaX > 30) setActiveWebSlide((prev) => Math.min(prev + 1, webSlides.length - 1));
      if (event.deltaX < -30) setActiveWebSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  const currentWebSlide = webSlides[activeWebSlide];

  return (
    <div
      id="proyectos"
      data-nav-theme="light"
      className="relative overflow-x-hidden bg-[linear-gradient(180deg,#ede4fb_0%,#f1e8ff_10%,#f4edff_24%,#f7f3ff_42%,#f7f5fb_100%)] pb-20 text-[#080808]"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px]"
        style={{ background: 'linear-gradient(180deg, rgba(130,66,245,0.24) 0%, rgba(130,66,245,0.12) 36%, rgba(255,255,255,0) 100%)' }}
      />
      <div
        className="pointer-events-none absolute left-[-10%] top-[16%] h-[320px] w-[320px] rounded-full blur-[95px]"
        style={{ background: 'rgba(130,66,245,0.2)' }}
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-[28%] h-[280px] w-[280px] rounded-full blur-[95px]"
        style={{ background: 'rgba(186,145,255,0.16)' }}
      />

      <div className="relative z-20 mx-auto max-w-[1280px] px-6 pt-6 md:px-12 md:pt-8">
        <div className="mt-0">
          <div className="sticky-container relative hidden h-[330vh] md:block">
            {serviceShowcase.map((service, index) => (
              <article
                key={service.id}
                className="service-card group sticky top-[84px] mb-[10px] overflow-hidden rounded-[28px] border border-[#d9d3ca] bg-white shadow-[0_12px_30px_rgba(57,53,44,0.06)] transition-[border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-[#792fec]/30 hover:shadow-[0_24px_60px_rgba(57,53,44,0.08),0_0_0_1px_rgba(121,47,236,0.12)]"
                style={{ zIndex: index + 1 }}
                onMouseMove={handleServiceCardMouseMove}
                onMouseLeave={resetServiceCardMouseMove}
              >
                <div className="flex h-[calc(100vh-124px)] min-h-[520px]">
                  <div className="service-info relative flex-[1] overflow-hidden">
                    <div className="pointer-events-none absolute left-8 top-6 font-['Inter Tight'] text-[88px] font-extrabold leading-none tracking-[-0.06em] text-[#39352c]/[0.03] lg:text-[110px]">
                      {service.number}
                    </div>
                    <div className="relative z-10 flex flex-col justify-center px-10 py-12 lg:px-14 lg:py-16">
                      <div
                        className="inline-flex rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em]"
                        style={{
                          color: service.id === 'design' ? '#21b2c6' : '#792fec',
                          background: service.id === 'design' ? 'rgba(33,178,198,0.08)' : 'rgba(121,47,236,0.06)',
                          borderColor: service.id === 'design' ? 'rgba(33,178,198,0.16)' : 'rgba(121,47,236,0.15)',
                        }}
                      >
                        {service.brand}
                      </div>
                      <h2 className="mt-14 max-w-[13ch] font-['Inter Tight'] text-[clamp(40px,4.8vw,60px)] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#39352c]">
                        {service.title}
                      </h2>
                      <p className="mt-5 max-w-[31rem] text-[15px] leading-7 text-[#5e584e] md:text-[16px]">
                        {service.description}
                      </p>
                      <div className="mt-8 flex max-w-[32rem] flex-wrap gap-3">
                        {service.points.map((point) => (
                          <div
                            key={point}
                            className="rounded-full border border-[#d9d3ca] bg-[#f6f2ec] px-4 py-3 text-sm text-[#5e584e]"
                          >
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="service-visual relative flex-[1.1] border-l border-[#d9d3ca] bg-[#eae6df]">
                    <div className="flex h-full w-full items-center justify-center p-6 lg:p-8">
                      <ServiceShowcaseVisual service={service} prefersReducedMotion={prefersReducedMotion} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-5 md:hidden">
            {serviceShowcase.map((service, index) => (
              <motion.article
                key={service.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: premiumEase, delay: index * 0.04 }}
                className="overflow-hidden rounded-[28px] border border-[#d8d0ee] bg-white/88 shadow-[0_18px_48px_-28px_rgba(66,52,111,0.14)] backdrop-blur-[10px]"
              >
                <div className="grid gap-0">
                  <div className="relative flex flex-col justify-center overflow-hidden border-b border-[#e8e1f7] px-6 py-8">
                    <div className="pointer-events-none absolute left-7 top-5 font-['Inter Tight'] text-[72px] font-extrabold leading-none tracking-[-0.06em] text-[#080808]/[0.035]">
                      {service.number}
                    </div>
                    <div className="relative z-10">
                      <div className="inline-flex rounded-full border border-[#8242f5]/12 bg-[#8242f5]/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8242f5]">
                        {service.brand}
                      </div>
                      <div className="mt-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#080808]/45">
                        {service.vibe}
                      </div>
                      <h2 className="mt-4 max-w-[14ch] font-['Inter Tight'] text-[clamp(34px,8vw,46px)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#080808]">
                        {service.title}
                      </h2>
                      <p className="mt-5 text-[15px] leading-7 text-[#080808]/66">
                        {service.description}
                      </p>
                      <div className="mt-8 grid gap-3">
                        {service.points.map((point) => (
                          <div
                            key={point}
                            className="flex items-center gap-3 rounded-[18px] border border-[#080808]/6 bg-[#faf8ff] px-4 py-3 text-sm text-[#1f2937]"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: service.id === 'automation' ? '#21b2c6' : '#8242f5' }}
                            />
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-[linear-gradient(180deg,rgba(247,243,255,0.88)_0%,rgba(255,255,255,0.92)_100%)] p-4">
                    <ServiceShowcaseVisual service={service} prefersReducedMotion={prefersReducedMotion} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: premiumEase }}
          className="mt-16"
        >
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8242f5]">Nuestras webs</div>
                  <h3 className="mt-3 font-epilogue text-[clamp(28px,3.8vw,52px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-[#080808]">
                    El carrusel sigue aquí, ahora como respaldo visual del servicio.
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.24em] text-[#080808]/42">Vista activa</div>
                  <div className="mt-2 font-epilogue text-[22px] font-semibold italic tracking-[-0.02em] text-[#080808]">
                    {currentWebSlide.label}
                  </div>
                </div>
              </div>

              <div
                className="relative h-[360px] overflow-hidden rounded-[34px] border border-white/55 bg-[linear-gradient(180deg,#f7f3ff_0%,#ffffff_100%)] px-4 py-6 shadow-[0_34px_90px_-46px_rgba(91,33,182,0.24)] sm:h-[420px] md:px-8 md:py-8 lg:h-[520px]"
                onWheel={handleWebCarouselWheel}
                onMouseEnter={() => setIsWebCarouselHovering(true)}
                onMouseLeave={() => setIsWebCarouselHovering(false)}
              >
                <FloatingRobot
                  src={asset('KaivaTheo.webp')}
                  className="hidden md:block"
                  style={{ top: '5%', left: '2%', width: 'clamp(66px, 9vw, 170px)', height: 'clamp(66px, 9vw, 170px)' }}
                  delay={0.2}
                  duration={10}
                  amplitude={6}
                  rotation={2}
                />
                <FloatingRobot
                  src={asset('KaivaSara.webp')}
                  className="hidden md:block"
                  style={{ bottom: '8%', right: '2%', width: 'clamp(66px, 9vw, 170px)', height: 'clamp(66px, 9vw, 170px)' }}
                  delay={1.8}
                  duration={10.4}
                  amplitude={6}
                  rotation={2}
                />

                <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
                  {webSlides.map((slide, index) => (
                    <TiltSlide
                      key={slide.id}
                      slide={slide}
                      isActive={index === activeWebSlide}
                      position={index - activeWebSlide}
                      onClick={() => setActiveWebSlide(index)}
                    />
                  ))}
                </div>

                <div className="absolute inset-x-4 bottom-4 z-20 rounded-[24px] border border-white/70 bg-white/88 px-4 py-4 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.2)] backdrop-blur-xl md:left-8 md:right-8 md:bottom-8 md:px-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="flex items-end gap-3">
                      <div className="font-epilogue text-[40px] font-extrabold italic leading-none tracking-[-0.03em] opacity-90 md:text-[58px]" style={gradientAccentStyle}>
                        {currentWebSlide.number}
                      </div>
                      <div className="pb-1">
                        <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.24em] text-[#080808]/42">Caso visual</div>
                        <div className="font-epilogue text-[22px] font-semibold italic leading-[1.1] tracking-[-0.02em] text-[#080808] md:text-[28px]">
                          {currentWebSlide.label}
                        </div>
                        <div className="mt-1 font-manrope text-[11px] tracking-wider text-[#080808]/56">{currentWebSlide.vibe}</div>
                      </div>
                    </div>

                    <div className="md:max-w-[260px] md:text-right">
                      <div className="mb-2 font-manrope text-[11px] font-bold uppercase tracking-wider" style={gradientAccentStyle}>
                        - {currentWebSlide.brand}
                      </div>
                      <div className="font-manrope text-[13px] italic leading-relaxed text-[#080808]/66">
                        {currentWebSlide.description}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveWebSlide((prev) => (prev - 1 + webSlides.length) % webSlides.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#080808]/10 bg-white text-[#080808] transition-transform duration-300 hover:scale-110"
                      aria-label="Anterior"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <div className="flex flex-1 gap-1.5">
                      {webSlides.map((slide, index) => {
                        const isActive = index === activeWebSlide;
                        return (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={() => setActiveWebSlide(index)}
                            className="group relative h-[2px] flex-1 overflow-hidden bg-[#080808]/12"
                          >
                            <motion.div
                              className="absolute inset-y-0 left-0 origin-left"
                              style={{ background: 'linear-gradient(135deg, #21b2c6 0%, #8242f5 58%, #d96cff 100%)' }}
                              initial={{ scaleX: 0 }}
                              animate={{
                                scaleX: index < activeWebSlide ? 1 : isActive ? (isWebCarouselHovering ? 0 : 1) : 0,
                              }}
                              transition={isActive && !isWebCarouselHovering ? { duration: 5.5, ease: 'linear' } : { duration: 0.4 }}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveWebSlide((prev) => (prev + 1) % webSlides.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#080808]/10 bg-white text-[#080808] transition-transform duration-300 hover:scale-110"
                      aria-label="Siguiente"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
        </motion.div>
      </div>
    </div>
  );
};

const stepLabels = ['Primer paso', 'Segundo paso', 'Tercer paso', 'Cuarto paso', 'Quinto paso'];

const ProcessStepCard = ({ step, index, activeProgress }) => {
  const distance = useTransform(activeProgress, (value) => {
    return index - value;
  });
  const y = useTransform(distance, (value) => value * 138);
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
  const activeProgress = useSpring(activeProgressRaw, { stiffness: 190, damping: 24, mass: 0.08 });
  const purpleStageOpacity = useTransform(
    activeProgressRaw,
    [0, 1, 2, 3, 4],
    [0, 0.25, 0.5, 0.75, 1]
  );
  const currentStep = stepsContent[activeStep];

  useMotionValueEvent(activeProgressRaw, 'change', (latest) => {
    const nextStep = Math.min(stepsContent.length - 1, Math.max(0, Math.floor(latest + 0.2)));
    setActiveStep(nextStep);
  });

  return (
    <section ref={sectionRef} id="proceso" className="process-section relative w-full bg-white py-0">
      <div className="process-sticky-stage relative hidden h-[225vh] w-full md:block lg:h-[240vh]">
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-16">
          {/* Progressive giant gradient: white on step 1 to full purple on step 5 */}
          <motion.div 
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 12%, rgba(111,34,239,0.14) 30%, rgba(111,34,239,0.34) 48%, rgba(111,34,239,0.68) 70%, #6f22ef 100%)',
              opacity: purpleStageOpacity
            }}
          />
          <div className="relative z-10 mx-auto flex w-full max-w-[800px] items-center justify-center gap-6">
            <div className="process-card-stack relative h-[360px] w-full overflow-visible sm:h-[410px] md:h-[540px]">
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

      <div className="relative h-[170vh] w-full bg-[#6f22ef] md:hidden">
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-white px-5">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 10%, rgba(111,34,239,0.14) 28%, rgba(111,34,239,0.34) 48%, rgba(111,34,239,0.68) 70%, #6f22ef 100%)',
              opacity: purpleStageOpacity
            }}
          />
          <div className="relative z-10 mx-auto flex w-full max-w-[420px] flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-[28px] border border-[#8242f5]/12 bg-white/92 p-6 shadow-[0_24px_60px_-34px_rgba(130,66,245,0.18)] backdrop-blur-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#080808]/6 bg-white font-epilogue text-[15px] font-bold text-[#080808]/45 shadow-sm">
                    0{activeStep + 1}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#8242f5]">
                      {stepLabels[activeStep]}
                    </div>
                    <h3 className="font-epilogue text-[28px] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#080808]">
                      {currentStep.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#080808]/62">
                      {currentStep.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExpandedAgencySections = () => (
  <>
    <ProcessRedesignSection />
    <AliadosSection />
    <section
      id="planes"
      data-nav-theme="light"
      className="plans-section relative overflow-hidden px-4 pb-12 pt-14 md:-mt-[3px] md:px-8 md:pb-16 md:pt-20"
      style={{
        background:
          'linear-gradient(180deg, #ede4fb 0%, #f1e9ff 18%, #faf7ff 42%, #ffffff 100%)'
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-[10px]"
        style={{ background: '#ede4fb' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-[59] h-[56px] w-[34%]"
        style={{ background: 'linear-gradient(180deg, #ede4fb 0%, rgba(237,228,251,0.96) 48%, rgba(237,228,251,0) 100%)' }}
      />
      <motion.img
        src={asset('KaivaMora1.webp')}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute right-0 top-[6%] z-40 hidden w-[200px] opacity-90 sm:block md:right-[-2%] md:top-[6.5%] md:w-[320px] lg:right-[-3%] lg:top-[6%] lg:w-[460px] pointer-events-none"
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
      <motion.div {...sectionReveal} className="plans-shell mx-auto w-full max-w-[1180px]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-epilogue text-[clamp(40px,6vw,60px)] font-bold leading-[1.05] tracking-tight text-[#080808]">
              Elige el plan <span className="italic font-serif font-light">ideal</span>
              <br />
              para <span className="italic font-serif font-light">tu</span> negocio
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#080808]/70">
              Diseño premium, estructura estratégica y ejecución real. <br className="hidden md:block" /> Selecciona la solución que mejor se adapte a ti.
            </p>
          </div>

          <div className="plans-grid mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan, index) => {
              const isMiddle = index === 1;
              return (
                <article
                  key={plan.name}
                  className={`plan-card group relative flex flex-col rounded-[24px] bg-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.1)] outline-none transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.15)] overflow-hidden`}
                >
                  {isMiddle && (
                    <img
                      src={asset('plan-negocio-gradient.png')}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-bottom pointer-events-none z-0"
                    />
                  )}

                  <div className="relative z-10 flex flex-1 flex-col p-8 md:p-10">
                    <h3 className="font-epilogue text-[24px] font-bold tracking-tight text-[#080808]">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-[14px] leading-snug text-[#080808]/60 min-h-[42px]">
                      {plan.audience}
                    </p>
                    
                    <div className="my-6 h-[1px] w-full bg-[#080808]/5" />

                    <div className="plan-price font-epilogue text-[36px] font-extrabold leading-none tracking-[-0.04em] text-[#080808]">
                      {plan.price}
                    </div>
                    <div className="mt-2 text-[13px] font-medium text-[#080808]/50">
                      Pago único
                    </div>

                    <a href="#contacto" onClick={(event) => scrollToSection(event, 'contacto')} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-6 py-4 font-inter text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-[1.02]">
                      {plan.cta}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>

                    <div className="mt-8 text-[13px] font-bold uppercase tracking-wider text-[#080808]">
                      Incluye:
                    </div>
                    <ul className="mt-4 flex-1 space-y-3.5">
                      {plan.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-[14px] text-[#080808]/80">
                          <svg className="h-5 w-5 shrink-0 text-[#080808]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" />
                          </svg>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8 text-center text-[12px] text-[#080808]/40">
                      Soporte y garantía incluidos.
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-8 w-full max-w-[1180px]">
            <article className="plans-addon group relative flex flex-col items-center justify-between gap-6 rounded-[24px] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.1)] outline-none transition-[transform,shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.15)] md:flex-row md:p-8 lg:px-12 overflow-hidden">
              <div className="flex flex-col items-center text-center md:items-start md:text-left md:max-w-[280px] relative z-10">
                <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#8242f5]">
                  {ecommercePlan.label}
                </div>
                <h3 className="mt-1 font-epilogue text-[24px] font-bold leading-none tracking-tight md:text-[28px]">
                  {ecommercePlan.name}
                </h3>
                <div className="mt-2 text-[14px] font-bold text-[#080808]">
                  {ecommercePlan.price}
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center gap-6 md:flex-row md:justify-between md:pl-10 text-center md:text-left relative z-10">
                <p className="max-w-[500px] text-[14px] leading-relaxed text-[#080808]/70">
                  {ecommercePlan.description}
                </p>
                <a href="#contacto" onClick={(event) => scrollToSection(event, 'contacto')} className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-6 py-3 font-inter text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-[1.02]">
                  {ecommercePlan.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
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
    <section
      className="allies-section relative overflow-hidden px-4 py-12 md:-mt-[3px] md:px-8 md:py-16 lg:py-20"
      style={{
        background:
          'linear-gradient(180deg, #6f22ef 0%, #8242f5 30%, #9c67f2 54%, #d9ccfb 78%, #f2ebff 90%, #ede4fb 100%)'
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-[6px]"
        style={{ background: '#6f22ef' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] h-[6px]"
        style={{ background: '#ede4fb' }}
      />
      <div className="mx-auto w-full max-w-[1680px] rounded-[34px] bg-[#050505] px-7 py-12 text-white shadow-[0_28px_70px_-48px_rgba(6,2,26,0.7)] ring-1 ring-white/10 md:px-14 md:py-16 lg:min-h-[82vh] lg:px-20 lg:py-24 xl:min-h-[86vh] xl:px-24">
        <div className="absolute inset-0 rounded-[34px]" style={{ background: 'radial-gradient(72% 80% at 22% 44%, rgba(126,60,245,0.20) 0%, rgba(126,60,245,0) 72%), radial-gradient(52% 68% at 82% 58%, rgba(88,27,201,0.34) 0%, rgba(88,27,201,0) 74%)' }} />

        <div className="relative z-10 grid items-center gap-10 lg:min-h-[calc(82vh-12rem)] lg:grid-cols-[1.18fr_0.82fr] lg:gap-12 xl:min-h-[calc(86vh-12rem)]">
          <div className="text-left">
            <h2 className="font-epilogue text-[clamp(52px,9.2vw,132px)] font-extrabold leading-[0.92] tracking-[-0.045em] text-white">
              Kaiva
              <br />
              <span className="relative inline-block whitespace-nowrap pb-8 md:pb-10">
                for Startups
                <img
                  src={asset('linea-startups.png')}
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-1 left-[-2%] h-[22px] w-[110%] object-contain md:h-[28px]"
                />
              </span>
            </h2>

            <div className="mt-7 flex flex-col items-start gap-4 md:mt-9 md:gap-5">
              <div className="inline-flex rounded-full bg-black px-6 py-2.5 font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-white/95 ring-1 ring-white/12 md:text-[14px]">
                ALIANZA ESTRATÉGICA
              </div>

              <a
                href="https://seoforstartups.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 font-inter text-[14px] font-bold text-[#121222] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] transition-transform duration-300 hover:-translate-y-0.5 md:px-10 md:py-4 md:text-[15px]"
              >
                Conoce más de SEO for Startups
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#efe8ff] text-[#7f41f0]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] md:max-w-[560px] lg:max-w-[700px] xl:max-w-[760px]">
            <img
              src={asset('Kaiva seo.png')}
              alt="Kaiva x SEO for Startups"
              loading="lazy"
              className="w-full object-contain drop-shadow-[0_20px_40px_rgba(56,14,136,0.55)]"
            />
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

const ScrollRevealHeadline = ({ text, lines }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const resolvedLines = lines ?? [text];
  const words = resolvedLines.flatMap((line) => line.split(" "));
  let wordIndex = 0;
  
  return (
    <h2 ref={containerRef} className="font-epilogue text-[clamp(20px,5.8vw,72px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-center max-w-[980px] mt-4">
      {resolvedLines.map((line, lineIndex) => (
        <span key={lineIndex} className="block whitespace-nowrap">
          {line.split(" ").map((word) => {
            const currentIndex = wordIndex;
            wordIndex += 1;
            return <RevealWord key={`${lineIndex}-${currentIndex}`} word={word} index={currentIndex} total={words.length} progress={scrollYProgress} />;
          })}
        </span>
      ))}
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
              <a href={projectsActive ? './' : PROJECTS_PAGE_HREF} className="transition-colors hover:text-[#080808]" style={projectsActive ? gradientAccentStyle : undefined}>Servicios</a>
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
        .problem-card {
          background: #ffffff;
          border: 1px solid rgba(8, 8, 8, 0.06);
          box-shadow: 0 16px 44px -28px rgba(8, 8, 8, 0.18);
        }
        .problem-card::before {
          display: none;
        }
        .problem-card-copy {
          width: 100%;
        }
        .problem-card-button {
          position: relative;
          z-index: 10;
          color: #080808;
          background: #ffffff;
          border: 1px solid rgba(8, 8, 8, 0.08);
          box-shadow: 0 10px 24px -18px rgba(8, 8, 8, 0.2);
        }
        .problem-card-button-icon {
          background: linear-gradient(135deg, #21b2c6 0%, #8242f5 58%, #d96cff 100%);
          box-shadow: 0 10px 18px -12px rgba(130, 66, 245, 0.55);
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
        @media (min-width: 1024px) and (max-width: 1440px) {
          .hero-logo {
            left: 52px !important;
            top: 28px !important;
            font-size: 18px !important;
          }
          .hero-nav {
            right: 52px !important;
            top: 32px !important;
            gap: 28px !important;
            font-size: 14px !important;
          }
          .hero-copy-wrap {
            top: 118px !important;
            left: 52px !important;
            max-width: min(38vw, 500px) !important;
          }
          .hero-copy-wrap h1 {
            font-size: clamp(34px, 3.25vw, 48px) !important;
            line-height: 0.98 !important;
          }
          .hero-copy-wrap a {
            margin-top: 18px !important;
            font-size: 18px !important;
          }
          .hero-visual-wrap {
            top: 198px !important;
            width: min(82vw, 860px) !important;
            max-width: 860px !important;
          }
          .hero-visual-wrap > div {
            aspect-ratio: 1.2 / 1 !important;
          }
          .hero-cta-wrap {
            bottom: 60px !important;
          }
          .hero-support-copy {
            right: 52px !important;
            bottom: 18px !important;
            max-width: 360px !important;
            font-size: 14px !important;
            line-height: 1.42 !important;
          }
        }
        @media (min-width: 1441px) {
          .hero-support-copy {
            right: 80px !important;
            max-width: 520px !important;
            font-size: 15px !important;
            line-height: 1.42 !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1440px) and (max-height: 900px) {
          .hero-logo {
            top: 22px !important;
            font-size: 17px !important;
          }
          .hero-nav {
            top: 26px !important;
            gap: 22px !important;
            font-size: 13px !important;
          }
          .hero-copy-wrap {
            top: 96px !important;
            max-width: min(36vw, 440px) !important;
          }
          .hero-copy-wrap h1 {
            font-size: clamp(30px, 2.85vw, 42px) !important;
          }
          .hero-copy-wrap a {
            margin-top: 14px !important;
            font-size: 16px !important;
          }
          .hero-visual-wrap {
            top: 158px !important;
            width: min(76vw, 760px) !important;
            max-width: 760px !important;
          }
          .hero-cta-wrap {
            bottom: 38px !important;
          }
          .hero-support-copy {
            bottom: 10px !important;
            max-width: 260px !important;
            font-size: 13px !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1320px) and (max-height: 820px) {
          .hero-copy-wrap {
            top: 82px !important;
            max-width: min(34vw, 390px) !important;
          }
          .hero-copy-wrap h1 {
            font-size: clamp(26px, 2.35vw, 36px) !important;
          }
          .hero-copy-wrap a {
            margin-top: 12px !important;
            font-size: 15px !important;
          }
          .hero-visual-wrap {
            top: 132px !important;
            width: min(68vw, 640px) !important;
            max-width: 640px !important;
          }
          .hero-cta-wrap {
            bottom: 42px !important;
          }
          .hero-cta-wrap a {
            min-height: 46px !important;
            padding-left: 28px !important;
            padding-right: 28px !important;
            font-size: 14px !important;
          }
          .hero-support-copy {
            display: -webkit-box !important;
            right: 40px !important;
            bottom: 8px !important;
            max-width: 255px !important;
            font-size: 12px !important;
            line-height: 1.36 !important;
            -webkit-line-clamp: 3 !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1280px) and (max-height: 760px) {
          .hero-logo {
            top: 18px !important;
            left: 40px !important;
          }
          .hero-nav {
            top: 22px !important;
            right: 40px !important;
            gap: 18px !important;
            font-size: 12px !important;
          }
          .hero-copy-wrap {
            top: 74px !important;
            left: 40px !important;
            max-width: min(34vw, 360px) !important;
          }
          .hero-copy-wrap h1 {
            font-size: clamp(24px, 2.15vw, 32px) !important;
          }
          .hero-visual-wrap {
            top: 122px !important;
            width: min(64vw, 580px) !important;
            max-width: 580px !important;
          }
          .hero-cta-wrap {
            bottom: 34px !important;
          }
          .hero-cta-wrap a {
            min-height: 44px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
            font-size: 13px !important;
          }
          .hero-support-copy {
            display: -webkit-box !important;
            right: 40px !important;
            bottom: 6px !important;
            max-width: 235px !important;
            font-size: 11px !important;
            line-height: 1.34 !important;
            -webkit-line-clamp: 3 !important;
          }
        }
        @media (min-width: 1024px) {
          .hero-support-copy {
            display: block;
            overflow: visible;
            -webkit-line-clamp: unset;
            -webkit-box-orient: initial;
          }
        }
        @media (min-width: 1024px) and (max-width: 1600px) {
          #inicio {
            height: 100svh !important;
            min-height: 100svh !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1600px) and (max-height: 900px) {
          .problem-section {
            min-height: 100svh;
            display: flex;
            align-items: center;
          }
          .problem-section > div {
            width: 100%;
          }
          .problem-stats-grid {
            margin-top: 24px !important;
            gap: 14px !important;
          }
          .problem-stat-card {
            padding: 18px 20px !important;
            gap: 8px !important;
          }
          .problem-stat-card > div:first-child {
            font-size: clamp(34px, 3.8vw, 50px) !important;
          }
          .problem-reasons-grid {
            gap: 14px !important;
          }
          .problem-card {
            min-height: 210px !important;
            padding: 18px 20px !important;
          }
          .problem-card h4 {
            font-size: clamp(22px, 2vw, 28px) !important;
            margin-bottom: 10px !important;
          }
          .problem-card p {
            font-size: 12px !important;
            line-height: 1.45 !important;
            margin-bottom: 14px !important;
          }
          .problem-card-button {
            transform: scale(0.92);
            transform-origin: left center;
          }
          .plans-section {
            min-height: 100svh;
            display: flex;
            align-items: center;
          }
          .plans-shell {
            width: 100%;
          }
          .plans-shell > div:first-child h2 {
            font-size: clamp(28px, 3vw, 42px) !important;
          }
          .plans-shell > div:first-child p {
            margin-top: 10px !important;
            font-size: 13px !important;
          }
          .plans-grid {
            margin-top: 24px !important;
            gap: 16px !important;
          }
          .plan-card .relative.z-10.flex {
            padding: 20px 18px !important;
          }
          .plan-card h3 {
            font-size: 20px !important;
          }
          .plan-card p {
            font-size: 12px !important;
          }
          .plan-price {
            font-size: 28px !important;
          }
          .plan-card ul {
            margin-top: 12px !important;
            gap: 10px !important;
          }
          .plan-card li {
            font-size: 12px !important;
          }
          .plan-card a {
            margin-top: 16px !important;
            padding-top: 12px !important;
            padding-bottom: 12px !important;
            font-size: 13px !important;
          }
          .plans-addon {
            margin-top: 18px !important;
            padding: 18px 22px !important;
            gap: 16px !important;
          }
          .allies-section {
            min-height: 100svh;
            display: flex;
            align-items: center;
          }
        }
        @media (min-width: 1024px) and (max-width: 1440px) and (max-height: 860px) {
          .problem-section {
            padding-top: 48px !important;
            padding-bottom: 68px !important;
          }
          .problem-section h2 {
            margin-top: 0 !important;
            max-width: 760px !important;
            font-size: clamp(34px, 4.4vw, 56px) !important;
          }
          .problem-section p {
            max-width: 600px !important;
          }
          .problem-section h3 {
            margin-bottom: 24px !important;
            font-size: clamp(22px, 2.4vw, 32px) !important;
          }
          .process-sticky-stage {
            height: 212vh !important;
          }
          .process-card-stack {
            height: 440px !important;
          }
          .plans-section h2 {
            font-size: clamp(34px, 4vw, 52px) !important;
          }
          .allies-section {
            padding-top: 72px !important;
            padding-bottom: 86px !important;
          }
          .allies-section h2 {
            font-size: clamp(42px, 6vw, 86px) !important;
          }
          .contact-main-block {
            padding-top: clamp(52px, 7vw, 108px) !important;
            padding-bottom: clamp(42px, 6vw, 88px) !important;
          }
          .contact-section h2 {
            font-size: clamp(36px, 5vw, 88px) !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1280px) and (max-height: 760px) {
          .problem-section {
            padding-top: 42px !important;
            padding-bottom: 56px !important;
          }
          .process-sticky-stage {
            height: 196vh !important;
          }
          .process-card-stack {
            height: 390px !important;
          }
          .allies-section {
            padding-top: 60px !important;
            padding-bottom: 72px !important;
          }
          .contact-main-block {
            padding-top: 46px !important;
            padding-bottom: 52px !important;
          }
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
    <section id="problema" className="problem-section relative w-full bg-transparent text-[#080808] px-6 py-14 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1240px] relative z-10 flex flex-col items-center">
        
        <ScrollRevealHeadline
          lines={[
            'El 91% de las empresas en Colombia',
            'son pymes. La mayoría',
            'no existen en\u00A0internet',
          ]}
        />
        
        <p className="mt-8 text-[16px] md:text-[18px] leading-[1.6] text-center max-w-[650px] text-[#080808]/70">
          Cada día, miles de colombianos buscan productos y servicios en Google. Si tu
          negocio no aparece, ese cliente se va a la competencia. Así de simple.
        </p>

        <div className="problem-stats-grid mt-10 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="problem-stat-card bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col items-center text-center sm:items-start sm:text-left gap-3">
            <div className="font-epilogue text-[42px] sm:text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={75} suffix="%" />
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de los colombianos busca productos y servicios en internet antes de comprar
            </p>
          </div>
          <div className="problem-stat-card bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col items-center text-center sm:items-start sm:text-left gap-3">
            <div className="font-epilogue text-[42px] sm:text-[48px] md:text-[64px] font-extrabold leading-none tracking-[-0.04em]" style={gradientAccentStyle}>
              <CountUpAnimation endValue={83} suffix="%" />
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#080808]/70">
              de los emprendedores colombianos planea invertir más en presencia digital este año
            </p>
          </div>
          <div className="problem-stat-card bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_12px_44px_-24px_rgba(32,29,26,0.1)] border border-[#080808]/5 flex flex-col items-center text-center sm:items-start sm:text-left gap-3">
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

          <div className="problem-reasons-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            {/* Card 1 */}
            <div className="problem-card relative overflow-hidden rounded-[22px] p-5 text-[#080808] min-h-[210px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 md:p-6">
              <div className="problem-card-copy relative z-10">
                <h4 className="font-epilogue text-[22px] md:text-[26px] font-extrabold leading-[1.05] tracking-tight mb-2">
                  Es muy caro.
                </h4>
                <p className="font-manrope text-[13px] md:text-[14px] leading-[1.5] text-[#080808]/66 mb-5">
                  Muchos negocios creen que tener una web profesional está fuera de su presupuesto. No tiene por qué serlo.
                </p>
              </div>
                <button 
                  className="problem-card-button inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="problem-card-button-icon flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#080808]/72">
                    SABER MÁS
                  </span>
                </button>
            </div>

            {/* Card 2 */}
            <div className="problem-card relative overflow-hidden rounded-[22px] p-5 text-[#080808] min-h-[210px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 md:p-6">
              <div className="problem-card-copy relative z-10">
                <h4 className="font-epilogue text-[22px] md:text-[26px] font-extrabold leading-[1.05] tracking-tight mb-2">
                  No sé cómo funciona.
                </h4>
                <p className="font-manrope text-[13px] md:text-[14px] leading-[1.5] text-[#080808]/66 mb-5">
                  Dominios, hosting, SEO, diseño... el lenguaje técnico aleja a dueños de negocio que simplemente quieren más clientes.
                </p>
              </div>
                <button 
                  className="problem-card-button inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="problem-card-button-icon flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#080808]/72">
                    SABER MÁS
                  </span>
                </button>
            </div>

            {/* Card 3 */}
            <div className="problem-card relative overflow-hidden rounded-[22px] p-5 text-[#080808] min-h-[210px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 md:p-6">
              <div className="problem-card-copy relative z-10">
                <h4 className="font-epilogue text-[22px] md:text-[26px] font-extrabold leading-[1.05] tracking-tight mb-2">
                  Ya intenté y no funcionó.
                </h4>
                <p className="font-manrope text-[13px] md:text-[14px] leading-[1.5] text-[#080808]/66 mb-5">
                  Malas experiencias con freelancers o plantillas genéricas que no reflejan el negocio ni generan resultados.
                </p>
              </div>
                <button 
                  className="problem-card-button inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="problem-card-button-icon flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#080808]/72">
                    SABER MÁS
                  </span>
                </button>
            </div>

            {/* Card 4 */}
            <div className="problem-card relative overflow-hidden rounded-[22px] p-5 text-[#080808] min-h-[210px] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 md:p-6">
              <div className="problem-card-copy relative z-10">
                <h4 className="font-epilogue text-[22px] md:text-[26px] font-extrabold leading-[1.05] tracking-tight mb-2">
                  No tengo tiempo.
                </h4>
                <p className="font-manrope text-[13px] md:text-[14px] leading-[1.5] text-[#080808]/66 mb-5">
                  Gestionar un negocio ya es suficiente trabajo. No debería necesitarse un equipo técnico propio para tener presencia digital.
                </p>
              </div>
                <button 
                  className="problem-card-button inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-1.5 pr-7 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="problem-card-button-icon flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#080808]/72">
                    SABER MÁS
                  </span>
                </button>
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
    <section id="inicio" data-nav-theme="light" className="relative z-30 min-h-[100svh] w-full [overflow-x:clip] bg-[#ffffff] font-open-sauce text-[#080808] md:min-h-[860px]">
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
        className={`hero-logo fixed left-6 top-5 z-40 w-fit text-left text-[16px] leading-[0.95] transition-colors duration-200 md:left-[80px] md:top-[40px] md:text-[20px] ${
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
        className={`hero-nav fixed right-[32px] top-[32px] z-40 hidden items-center gap-10 text-[16px] transition-colors duration-200 md:flex md:right-[80px] md:top-[45px] ${
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
                  <a href={PROJECTS_PAGE_HREF} className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Servicios</a>
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
                Servicios
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
        className="hero-cta-wrap absolute left-1/2 bottom-[110px] md:bottom-[6%] z-[60] -translate-x-1/2 w-full flex justify-center"
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
        className="hero-support-copy absolute bottom-4 left-6 right-6 z-40 hidden md:block md:bottom-[60px] md:left-auto md:right-[80px] md:max-w-[420px] md:text-[15px] text-left font-normal leading-[1.5] text-[#080808]/64"
      >
        Deja de perder clientes por no estar en internet. Diseñamos y desarrollamos tu página web con criterio profesional, entrega rápida y un precio justo.
      </motion.p>
    </section>
  );
};

export default App;










