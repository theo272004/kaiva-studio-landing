import React, { memo, useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const SERVICES_PAGE_HREF = './servicios/';
const HOME_PAGE_HREF_FROM_SERVICES = '../';
const isServicesPath = () => {
  if (typeof window === 'undefined') return false;
  return /\/servicios(?:\/|$|\/index\.html$)/.test(window.location.pathname);
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
    description:
      'Páginas web con estructura clara, diseño responsive y SEO integrado. Una narrativa diseñada estratégicamente para destacar el valor de tu negocio y convertir visitas en clientes.',
    accent: '#8242f5',
    mockup: 'ecommerce',
    title: 'Desarrollo Web',
    points: ['Estrategia digital', 'Responsive premium', 'SEO integrado', 'Optimización total'],
  },
  {
    id: 'design',
    number: '02',
    label: 'Diseño',
    description:
      'Desde publicidad, portadas y logos hasta la conceptualización completa de la identidad de tu marca, expresando exactamente quién eres y el porqué de tu negocio.',
    accent: '#d96cff',
    title: 'Diseño de Marca',
    points: ['Identidad de marca', 'Interfaces UI/UX', 'Piezas publicitarias', 'Sistemas de diseño'],
  },
  {
    id: 'automation',
    number: '03',
    label: 'Sistemas',
    description:
      'Sistemas a medida, dashboards analíticos y flujos de automatización. Conectamos tus herramientas para que operes de forma inteligente y rápida.',
    accent: '#21b2c6',
    title: 'Sistemas y Automatización',
    points: ['Dashboards', 'Integraciones', 'Sistemas a medida', 'Bots de WhatsApp'],
  },
];

const webSlides = [
  {
    id: 1,
    category: 'systems',
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
    category: 'web',
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
    category: 'systems',
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
    category: 'design',
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
    price: 'Desde $320 USD',
    description: 'Solución clara, profesional y lista para presentar tu negocio con seriedad desde el primer contacto.',
    points: ['Landing page profesional', 'Diseño responsive', 'Entrega rápida', 'Soporte por 15 días', 'Asesoría para publicación'],
    cta: 'Comenzar',
  },
  {
    name: 'Plan Negocio',
    audience: 'Para empresas establecidas que necesitan crecer.',
    price: 'Desde $700 USD',
    description: 'Una solución con más estructura, mejor narrativa y una ejecución visual pensada para elevar percepción y conversión.',
    points: ['Hasta 5 subpáginas', 'SEO básico', 'Copy estratégico', 'Formulario automatizado', 'Soporte por 30 días'],
    cta: 'Comenzar',
    featured: true,
    badge: 'Más elegido',
  },
  {
    name: 'Plan Pro',
    audience: 'Para marcas posicionadas que necesitan presencia premium.',
    price: 'Desde $1,200 USD',
    description: 'Pensado para marcas que necesitan una presencia más robusta, con sistema, orden y una ejecución a la altura.',
    points: ['Hasta 10 subpáginas', 'SEO', 'Automatizaciones', 'Cambio de idioma', 'Animaciones avanzadas', 'Soporte por 60 días'],
    cta: 'Comenzar',
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
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 42;
  const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 32;
  node.__serviceMoveX = moveX;
  node.__serviceMoveY = moveY;
  if (node.__serviceRaf) return;
  node.__serviceRaf = window.requestAnimationFrame(() => {
    node.style.setProperty('--service-move-x', `${node.__serviceMoveX ?? 0}px`);
    node.style.setProperty('--service-move-y', `${node.__serviceMoveY ?? 0}px`);
    node.style.setProperty('--service-rotate-y', `${(node.__serviceMoveX ?? 0) * 0.5}deg`);
    node.style.setProperty('--service-rotate-x', `${(node.__serviceMoveY ?? 0) * -0.4}deg`);
    node.__serviceRaf = null;
  });
};

const resetServiceCardMouseMove = (event) => {
  const node = event.currentTarget;
  if (node.__serviceRaf) {
    window.cancelAnimationFrame(node.__serviceRaf);
    node.__serviceRaf = null;
  }
  node.style.setProperty('--service-move-x', '0px');
  node.style.setProperty('--service-move-y', '0px');
  node.style.setProperty('--service-rotate-y', '0deg');
  node.style.setProperty('--service-rotate-x', '0deg');
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

const MockupRenderer = memo(({ type }) => {
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
});

const DESIGN_THEMES = [
  {
    id: 'ink',
    swatch: '#16151f',
    label: 'Ink',
    board: 'linear-gradient(160deg, #16151f 0%, #3b2b63 58%, #d96cff 125%)',
    uiSurface: '#151225',
    chip: '#16151f',
    secondary: '#d9cdf7',
    soft: '#f3ede4',
    accent: '#8b5cf6',
  },
  {
    id: 'violet',
    swatch: '#8242f5',
    label: 'Violet',
    board: 'linear-gradient(160deg, #31205c 0%, #8242f5 55%, #d6b7ff 125%)',
    uiSurface: '#24153f',
    chip: '#8242f5',
    secondary: '#e8dcff',
    soft: '#f7f2ff',
    accent: '#8242f5',
  },
  {
    id: 'rose',
    swatch: '#d96cff',
    label: 'Rose',
    board: 'linear-gradient(160deg, #3f2244 0%, #d96cff 52%, #ffe0f1 122%)',
    uiSurface: '#2b1830',
    chip: '#d96cff',
    secondary: '#f4d6ff',
    soft: '#fff3fb',
    accent: '#d96cff',
  },
  {
    id: 'sand',
    swatch: '#f3ede4',
    label: 'Sand',
    board: 'linear-gradient(160deg, #322b24 0%, #a68a63 52%, #f3ede4 122%)',
    uiSurface: '#2a261f',
    chip: '#d5b48b',
    secondary: '#efe3d0',
    soft: '#fdf8f2',
    accent: '#d5b48b',
  },
];

const AUTOMATION_THEMES = [
  {
    id: 'black',
    label: 'Core',
    tabColor: '#111827',
    metricA: '#0f172a',
    metricB: '#334155',
    metricC: '#64748b',
    bars: [44, 78, 52, 92, 68, 86, 58, 100],
    donut: [48, 28, 24],
  },
  {
    id: 'blue',
    label: 'Flow',
    tabColor: '#2563eb',
    metricA: '#1d4ed8',
    metricB: '#38bdf8',
    metricC: '#7dd3fc',
    bars: [56, 82, 60, 88, 76, 94, 62, 98],
    donut: [56, 22, 22],
  },
  {
    id: 'green',
    label: 'Ops',
    tabColor: '#10b981',
    metricA: '#059669',
    metricB: '#34d399',
    metricC: '#a7f3d0',
    bars: [42, 74, 48, 84, 64, 90, 58, 96],
    donut: [38, 34, 28],
  },
];

const ResponsiveWebShowcase = memo(({ mobile = false, prefersReducedMotion = false }) => {
  const [responsiveMode, setResponsiveMode] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setResponsiveMode((current) => !current);
    }, 2300);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const browserWidth = mobile ? '90%' : '84%';
  const phoneWidth = mobile ? 66 : 126;
  const phoneHeight = mobile ? 124 : 236;

  return (
    <div className={`mx-auto w-full ${mobile ? 'max-w-[290px] overflow-hidden rounded-[22px] border border-[#d9d3ca] bg-[#eae6df] shadow-[0_18px_40px_-26px_rgba(57,53,44,0.18)]' : 'service-visual-web overflow-hidden rounded-[30px] bg-[#eae6df]'}`}>
      <div
        className={`${mobile ? 'min-h-[210px] p-4' : 'min-h-[390px] p-6 sm:p-8'} flex h-full items-center justify-center overflow-hidden bg-[#eae6df]`}
      >
        <div className={`relative flex w-full items-center justify-center ${mobile ? 'max-w-[220px]' : 'max-w-[500px]'}`}>
          <motion.div
            animate={
              prefersReducedMotion
                ? { scale: 1, x: 0, opacity: 1 }
                : responsiveMode
                  ? { scale: mobile ? 0.9 : 0.88, x: mobile ? -16 : -34, opacity: 0.96 }
                  : { scale: 1, x: 0, opacity: 1 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
            className="relative z-10"
            style={{ width: browserWidth }}
          >
            <div className={`mockup-browser overflow-hidden border border-[#d9d3ca] bg-white ${mobile ? 'rounded-[10px] shadow-[0_16px_34px_rgba(57,53,44,0.12)]' : 'rounded-[12px] shadow-[0_20px_50px_rgba(57,53,44,0.15)]'}`}>
              <div className={`bar flex items-center bg-[#f7f5f2] ${mobile ? 'h-[24px] gap-[6px] px-[12px]' : 'h-[30px] gap-[7px] px-[14px]'}`}>
                <span className={`block rounded-full bg-[#ff5f57] ${mobile ? 'h-[8px] w-[8px]' : 'h-[10px] w-[10px]'}`} />
                <span className={`block rounded-full bg-[#febc2e] ${mobile ? 'h-[8px] w-[8px]' : 'h-[10px] w-[10px]'}`} />
                <span className={`block rounded-full bg-[#28c840] ${mobile ? 'h-[8px] w-[8px]' : 'h-[10px] w-[10px]'}`} />
              </div>
              <div className={`content flex flex-col ${mobile ? 'gap-2 p-4' : 'gap-[0.7rem] p-[1.6rem]'}`}>
                <div className={`rounded-full bg-[#eae6df] ${mobile ? 'h-[6px] w-[78%]' : 'h-[8px] w-[80%] rounded-[4px]'}`} />
                <div className={`rounded-full bg-[#eae6df] ${mobile ? 'h-[6px] w-[58%]' : 'h-[8px] w-[60%] rounded-[4px]'}`} />
                <motion.div
                  animate={prefersReducedMotion ? { width: mobile ? '34%' : '35%' } : responsiveMode ? { width: mobile ? '54%' : '56%' } : { width: mobile ? '34%' : '35%' }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
                  className={`rounded-full bg-[#792fec] shadow-[0_0_12px_rgba(121,47,236,0.25)] ${mobile ? 'h-[6px]' : 'h-[8px] rounded-[4px]'}`}
                />
                <div className={`flex items-center rounded-[8px] border border-[#e0dbd2] bg-[#f9f8f6] ${mobile ? 'gap-2 p-3' : 'mt-[0.4rem] gap-[0.8rem] p-[1rem]'}`}>
                  <div className={`shrink-0 rounded-full bg-[#d9d3ca] ${mobile ? 'h-[24px] w-[24px]' : 'h-[32px] w-[32px]'}`} />
                  <div className="flex-1">
                    <div className={`rounded-full bg-[#d9d3ca] ${mobile ? 'mb-1.5 h-[5px] w-[70%]' : 'mb-[4px] h-[6px] w-[70%] rounded-[3px]'}`} />
                    <div className={`rounded-full bg-[#d9d3ca] ${mobile ? 'h-[5px] w-[46%]' : 'h-[6px] w-[50%] rounded-[3px]'}`} />
                  </div>
                </div>
                <div className={`rounded-full bg-[#eae6df] ${mobile ? 'h-[6px] w-[46%]' : 'h-[8px] w-[50%] rounded-[4px]'}`} />
                <div className={`rounded-full bg-[#eae6df] ${mobile ? 'h-[6px] w-[62%]' : 'h-[8px] w-[60%] rounded-[4px]'}`} />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={
              prefersReducedMotion
                ? { scale: 1, x: 0, y: 0, opacity: 1 }
                : responsiveMode
                  ? { scale: mobile ? 1.05 : 1.12, x: mobile ? -8 : -28, y: mobile ? -10 : -16, opacity: 1 }
                  : { scale: mobile ? 0.86 : 0.88, x: mobile ? 0 : 0, y: 0, opacity: 0.92 }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
            className={`absolute z-20 ${mobile ? '-bottom-4 -right-4' : '-bottom-8 -right-8'}`}
          >
            <div
              className="relative flex flex-col bg-white"
              style={{
                height: `${phoneHeight}px`,
                width: `${phoneWidth}px`,
                borderRadius: mobile ? '14px' : '24px',
                border: mobile ? '4px solid #1f1f1f' : '6px solid #1f1f1f',
                boxShadow: mobile ? '0 20px 36px rgba(0,0,0,0.18)' : '0 30px 60px rgba(0,0,0,0.35)',
              }}
            >
              <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#1f1f1f] ${mobile ? 'top-1.5 h-[3px] w-7' : 'top-2 h-[4px] w-10'}`} />
              <div className={`flex h-full flex-col ${mobile ? 'space-y-1.5 p-2 pt-5' : 'gap-2.5 p-3 pt-7'}`}>
                <div className={`rounded-full bg-[#d9d3ca] ${mobile ? 'h-[5px] w-1/2' : 'h-2 w-1/2'}`} />
                <motion.div
                  animate={prefersReducedMotion ? { height: mobile ? 38 : 76 } : responsiveMode ? { height: mobile ? 58 : 112 } : { height: mobile ? 38 : 76 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
                  className="w-full rounded-[8px] bg-[#eae6df]"
                />
                <div className={`rounded-full bg-[#eae6df] ${mobile ? 'h-[5px] w-4/5' : 'h-2 w-4/5'}`} />
                <div className={`rounded-full bg-[#eae6df] ${mobile ? 'h-[5px] w-3/5' : 'h-2 w-3/5'}`} />
                <motion.div
                  animate={prefersReducedMotion ? { width: mobile ? '50%' : '50%' } : responsiveMode ? { width: mobile ? '72%' : '74%' } : { width: mobile ? '50%' : '50%' }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
                  className={`mt-auto rounded-[5px] bg-[#792fec] shadow-sm ${mobile ? 'h-[14px]' : 'h-6 opacity-95'}`}
                />
              </div>
            </div>
          </motion.div>

          {!mobile && (
            <motion.div
              animate={prefersReducedMotion ? { opacity: 0.7 } : responsiveMode ? { opacity: 1 } : { opacity: 0.7 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
              className="pointer-events-none absolute bottom-3 left-8 rounded-full border border-[#d8d0ee] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d28d9]"
            >
              Responsive motion
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
});

const DesignShowcase = memo(({ mobile = false, prefersReducedMotion = false }) => {
  const [activeThemeId, setActiveThemeId] = useState(DESIGN_THEMES[1].id);
  const activeTheme = DESIGN_THEMES.find((theme) => theme.id === activeThemeId) ?? DESIGN_THEMES[1];

  return (
    <div className={`mx-auto w-full ${mobile ? 'max-w-[292px]' : ''}`}>
      <div
        className={`design-composition service-visual-design ${mobile ? 'grid gap-3' : 'grid gap-4 lg:grid-cols-[0.88fr_1.12fr] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform'}`}
        style={mobile ? undefined : { transform: 'translate(calc(var(--service-move-x,0px) * 0.7), calc(var(--service-move-y,0px) * 0.5))' }}
      >
        <div className={`${mobile ? 'rounded-[20px] p-4 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.22)]' : 'rounded-[28px] p-5 shadow-[0_26px_72px_-40px_rgba(15,23,42,0.28)]'} border border-[#111827]/8 bg-[#fffdf9]`}>
          <div className={`font-bold uppercase tracking-[0.2em] text-[#8b5cf6] ${mobile ? 'mb-3 text-[10px]' : 'mb-5 text-[11px]'}`}>Brand board</div>
          <div className="space-y-3">
            <div className={`font-epilogue font-extrabold tracking-[-0.04em] text-[#16151f] ${mobile ? 'text-[30px] leading-none' : 'text-4xl'}`}>Kaiva</div>
            <div className={`${mobile ? 'mt-2 text-[14px]' : 'text-lg'} font-semibold tracking-[-0.03em] text-[#16151f]`}>Systems with character</div>
            {!mobile && (
              <div className="max-w-[15rem] text-sm leading-6 text-[#5b556e]">
                Dirección visual, color, tipografía y piezas listas para web, decks o redes.
              </div>
            )}
          </div>
          <div className={`mt-4 grid grid-cols-4 gap-2 ${mobile ? '' : 'mt-6'}`}>
            {DESIGN_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                aria-label={`Activar paleta ${theme.label}`}
                onMouseEnter={() => setActiveThemeId(theme.id)}
                onFocus={() => setActiveThemeId(theme.id)}
                onClick={() => setActiveThemeId(theme.id)}
                className={`${mobile ? 'h-9 rounded-[14px]' : 'h-12 rounded-2xl'} border border-black/5 transition-all duration-300 ${activeTheme.id === theme.id ? 'scale-[1.04] ring-2 ring-black/10' : 'scale-100 opacity-85 hover:opacity-100'}`}
                style={{ background: theme.swatch }}
              />
            ))}
          </div>
        </div>

        <motion.div
          animate={prefersReducedMotion ? false : { boxShadow: ['0 28px 74px -40px rgba(91,33,182,0.22)', '0 32px 88px -42px rgba(91,33,182,0.3)', '0 28px 74px -40px rgba(91,33,182,0.22)'] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className={`${mobile ? 'rounded-[20px] p-4 shadow-[0_18px_40px_-28px_rgba(91,33,182,0.26)]' : 'overflow-hidden rounded-[28px] p-5 shadow-[0_28px_74px_-40px_rgba(91,33,182,0.34)]'} border border-[#111827]/8 bg-[#f5f0ff]`}
        >
          <div className={`grid gap-3 ${mobile ? 'grid-cols-[1.05fr_0.95fr]' : 'md:grid-cols-[0.92fr_1.08fr] gap-4'}`}>
            <div className={`${mobile ? 'rounded-[18px] p-3' : 'rounded-[24px] p-4'} bg-white shadow-[0_18px_48px_-32px_rgba(15,23,42,0.32)]`}>
              <motion.div
                animate={{ background: activeTheme.board }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                className={`${mobile ? 'mb-3 h-20 rounded-[16px]' : 'mb-4 h-36 rounded-[20px]'}`}
              />
              <div className="space-y-2">
                <motion.div
                  animate={{ backgroundColor: activeTheme.chip }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                  className={`${mobile ? 'h-3 w-16' : 'h-4 w-24'} rounded-full`}
                />
                <motion.div
                  animate={{ backgroundColor: activeTheme.secondary }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                  className={`${mobile ? 'h-2.5' : 'h-3'} rounded-full`}
                />
                {!mobile && (
                  <motion.div
                    animate={{ backgroundColor: activeTheme.soft }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                    className="h-3 w-4/5 rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="grid gap-3 md:gap-4">
              <motion.div
                animate={{ backgroundColor: activeTheme.uiSurface }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                className={`${mobile ? 'rounded-[18px] p-3' : 'rounded-[24px] p-4'} text-white`}
              >
                <div className={`${mobile ? 'mb-2 text-[9px]' : 'mb-3 text-[11px]'} uppercase tracking-[0.16em] text-white/52`}>UI kit</div>
                <div className="flex gap-2">
                  <motion.div
                    animate={{ backgroundColor: activeTheme.soft }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                    className={`${mobile ? 'h-8' : 'h-10'} flex-1 rounded-full`}
                  />
                  <motion.div
                    animate={{ backgroundColor: activeTheme.accent }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                    className={`${mobile ? 'h-8 w-10' : 'h-10 w-12'} rounded-full`}
                  />
                </div>
              </motion.div>
              <div className={`${mobile ? 'rounded-[18px] p-3' : 'rounded-[24px] p-4'} bg-white`}>
                <motion.div
                  animate={{ backgroundColor: activeTheme.secondary }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                  className={`${mobile ? 'mb-2 h-2.5 w-14' : 'mb-3 h-3 w-20'} rounded-full`}
                />
                <div className={`grid grid-cols-2 ${mobile ? 'gap-2' : 'gap-3'}`}>
                  <motion.div
                    animate={{ background: `linear-gradient(135deg, ${activeTheme.soft}, #ffffff)` }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                    className={`${mobile ? 'h-14 rounded-[14px]' : 'h-20 rounded-[18px]'}`}
                  />
                  <motion.div
                    animate={{ background: `linear-gradient(135deg, ${activeTheme.chip}, ${activeTheme.uiSurface})` }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
                    className={`${mobile ? 'h-14 rounded-[14px]' : 'h-20 rounded-[18px]'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

const AutomationShowcase = memo(({ mobile = false, prefersReducedMotion = false }) => {
  const [activeThemeId, setActiveThemeId] = useState(AUTOMATION_THEMES[1].id);
  const activeTheme = AUTOMATION_THEMES.find((theme) => theme.id === activeThemeId) ?? AUTOMATION_THEMES[1];
  const donutStops = [];
  let offset = 0;
  activeTheme.donut.forEach((value, index) => {
    donutStops.push(`${[activeTheme.metricA, activeTheme.metricB, activeTheme.metricC][index]} ${offset}% ${offset + value}%`);
    offset += value;
  });

  return (
    <div className={`mx-auto w-full ${mobile ? 'max-w-[292px] overflow-hidden rounded-[20px] border border-[#dfe7f1] bg-white shadow-[0_18px_42px_-28px_rgba(15,23,42,0.14)]' : 'overflow-hidden rounded-[30px] border border-[#0f172a]/8 bg-[#fdfdfd] shadow-[0_32px_90px_-42px_rgba(2,8,23,0.12)]'}`}>
      <div
        className={`${mobile ? '' : 'service-visual-dashboard transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform h-full'}`}
        style={mobile ? undefined : { transform: 'translate(calc(var(--service-move-x,0px) * 0.4), calc(var(--service-move-y,0px) * 0.3))' }}
      >
        <div className={`${mobile ? 'space-y-3 bg-[#f7f9fc] p-4' : 'flex min-h-[390px] h-full items-center justify-center bg-[#f7f9fc] p-6 lg:p-8'}`}>
          <div className={`${mobile ? '' : 'w-full max-w-[500px] overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]'}`}>
            <div className={`flex items-center border-b border-[#f1f5f9] bg-[#f8fafc] ${mobile ? 'h-8 px-3' : 'h-10 px-4'}`}>
              <div className="flex gap-1.5">
                <div className={`${mobile ? 'h-2 w-2' : 'h-2.5 w-2.5'} rounded-full bg-[#ff5f57]`} />
                <div className={`${mobile ? 'h-2 w-2' : 'h-2.5 w-2.5'} rounded-full bg-[#febc2e]`} />
                <div className={`${mobile ? 'h-2 w-2' : 'h-2.5 w-2.5'} rounded-full bg-[#28c840]`} />
              </div>
            </div>

            <div className={`${mobile ? 'space-y-3 bg-[#f7f9fc] p-4' : 'flex h-[280px] gap-4 p-4'}`}>
              {!mobile && (
                <div className="hidden w-[28%] flex-col gap-3 border-r border-[#f1f5f9] pr-4 pt-1 sm:flex">
                  <div className="h-4 w-full rounded bg-[#e2e8f0]" />
                  <div className="h-4 w-3/4 rounded bg-[#f1f5f9]" />
                  <div className="h-4 w-5/6 rounded bg-[#f1f5f9]" />
                  <div className="h-4 w-2/3 rounded bg-[#f1f5f9]" />
                  <div className="mt-auto rounded-[12px] border border-[#e2e8f0] bg-white p-3">
                    <motion.div
                      animate={{ background: `conic-gradient(${donutStops.join(', ')})` }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                      className="mx-auto h-24 w-24 rounded-full"
                      style={{ mask: 'radial-gradient(circle at center, transparent 56%, black 58%)', WebkitMask: 'radial-gradient(circle at center, transparent 56%, black 58%)' }}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-1 flex-col gap-4">
                <div className={`grid ${mobile ? 'grid-cols-[1fr_1fr_auto] gap-3' : 'grid-cols-[repeat(4,minmax(0,1fr))] gap-4'}`}>
                  <button
                    type="button"
                    aria-label={`Ver dashboard ${AUTOMATION_THEMES[0].label}`}
                    onMouseEnter={() => setActiveThemeId(AUTOMATION_THEMES[0].id)}
                    onFocus={() => setActiveThemeId(AUTOMATION_THEMES[0].id)}
                    onClick={() => setActiveThemeId(AUTOMATION_THEMES[0].id)}
                    className={`rounded-[12px] border border-[#f1f5f9] bg-white p-3 text-left transition-all duration-300 ${activeTheme.id === AUTOMATION_THEMES[0].id ? 'scale-[1.02] ring-2 ring-black/8 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.25)]' : 'hover:-translate-y-0.5'}`}
                  >
                    <div className="mb-2 h-3 w-1/2 rounded bg-[#94a3b8]" />
                    <motion.div animate={{ backgroundColor: AUTOMATION_THEMES[0].metricA }} transition={{ duration: prefersReducedMotion ? 0 : 0.35 }} className="h-5 w-3/4 rounded" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Ver dashboard ${AUTOMATION_THEMES[1].label}`}
                    onMouseEnter={() => setActiveThemeId(AUTOMATION_THEMES[1].id)}
                    onFocus={() => setActiveThemeId(AUTOMATION_THEMES[1].id)}
                    onClick={() => setActiveThemeId(AUTOMATION_THEMES[1].id)}
                    className={`rounded-[12px] border border-[#f1f5f9] bg-white p-3 text-left transition-all duration-300 ${activeTheme.id === AUTOMATION_THEMES[1].id ? 'scale-[1.02] ring-2 ring-black/8 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.25)]' : 'hover:-translate-y-0.5'}`}
                  >
                    <div className="mb-2 h-3 w-1/2 rounded bg-[#94a3b8]" />
                    <motion.div animate={{ backgroundColor: AUTOMATION_THEMES[1].metricB }} transition={{ duration: prefersReducedMotion ? 0 : 0.35 }} className="h-5 w-2/3 rounded" />
                  </button>
                  {!mobile && (
                    <button
                      type="button"
                      aria-label={`Ver dashboard ${AUTOMATION_THEMES[2].label}`}
                      onMouseEnter={() => setActiveThemeId(AUTOMATION_THEMES[2].id)}
                      onFocus={() => setActiveThemeId(AUTOMATION_THEMES[2].id)}
                      onClick={() => setActiveThemeId(AUTOMATION_THEMES[2].id)}
                      className={`rounded-[12px] border border-[#f1f5f9] bg-white p-3 text-left transition-all duration-300 ${activeTheme.id === AUTOMATION_THEMES[2].id ? 'scale-[1.02] ring-2 ring-black/8 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.25)]' : 'hover:-translate-y-0.5'}`}
                    >
                      <div className="mb-2 h-3 w-1/2 rounded bg-[#94a3b8]" />
                      <motion.div animate={{ backgroundColor: AUTOMATION_THEMES[2].metricC }} transition={{ duration: prefersReducedMotion ? 0 : 0.35 }} className="h-5 w-3/4 rounded" />
                    </button>
                  )}
                  <div className={`${mobile ? 'col-span-1 flex flex-col gap-2 rounded-[12px] border border-[#f1f5f9] bg-white p-2' : 'rounded-[12px] border border-[#f1f5f9] bg-white p-3'}`}>
                    <div className={`flex items-center ${mobile ? 'flex-col gap-1.5' : 'gap-2'}`}>
                      {AUTOMATION_THEMES.map((theme) => (
                        <div
                          key={theme.id}
                          className={`${mobile ? 'h-6 w-6 rounded-full' : 'h-8 flex-1 rounded-full'} border border-black/5 transition-all duration-300 ${activeTheme.id === theme.id ? 'opacity-100 shadow-[0_8px_18px_-12px_rgba(15,23,42,0.35)]' : 'opacity-65'}`}
                          style={{ backgroundColor: theme.tabColor }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${mobile ? 'grid grid-cols-[1.12fr_0.88fr] gap-3' : 'flex-1'}`}>
                  <div className={`${mobile ? 'flex h-[124px] items-end gap-2.5 rounded-[12px] border border-[#e2e8f0] bg-white px-3 pb-4 pt-3' : 'flex h-full items-end gap-3 rounded-[12px] border border-[#e2e8f0] bg-white px-5 pb-4 pt-3'}`}>
                    {activeTheme.bars.map((height, index) => (
                      <motion.div
                        key={`${activeTheme.id}-${index}`}
                        animate={{ height: `${height}%`, backgroundColor: index % 3 === 0 ? activeTheme.metricA : index % 2 === 0 ? activeTheme.metricB : activeTheme.metricC }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: premiumEase }}
                        className="flex-1 rounded-t-[7px]"
                      />
                    ))}
                  </div>
                  {mobile && (
                    <div className="flex items-center justify-center rounded-[12px] border border-[#e2e8f0] bg-white p-3">
                      <motion.div
                        animate={{ background: `conic-gradient(${donutStops.join(', ')})` }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                        className="h-[78px] w-[78px] rounded-full"
                        style={{ mask: 'radial-gradient(circle at center, transparent 56%, black 58%)', WebkitMask: 'radial-gradient(circle at center, transparent 56%, black 58%)' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const ServiceShowcaseVisual = memo(({ service, prefersReducedMotion }) => {
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: premiumEase };

  return (
    <motion.div
      key={service.id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12, scale: 0.985 }}
      transition={panelTransition}
      className="w-full"
    >
      {service.id === 'web' && <ResponsiveWebShowcase prefersReducedMotion={prefersReducedMotion} />}
      {service.id === 'design' && <DesignShowcase prefersReducedMotion={prefersReducedMotion} />}
      {service.id === 'automation' && <AutomationShowcase prefersReducedMotion={prefersReducedMotion} />}
    </motion.div>
  );
});

const MobileServiceShowcaseVisual = memo(({ service, prefersReducedMotion }) => {
  if (service.id === 'web') return <ResponsiveWebShowcase mobile prefersReducedMotion={prefersReducedMotion} />;
  if (service.id === 'design') return <DesignShowcase mobile prefersReducedMotion={prefersReducedMotion} />;
  return <AutomationShowcase mobile prefersReducedMotion={prefersReducedMotion} />;
});

const FloatingRobot = memo(({ src, style, className = '', delay = 0, duration = 6, amplitude = 20, rotation = 8 }) => (
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
));

const HeroDraggableRobot = memo(({
  src,
  alt,
  className = '',
  floatY = [0, -6, 0, 6, 0],
  floatX = [0, 0, 0, 0, 0],
  floatRotate = [0, 0, 0, 0, 0],
  duration = 8,
  delay = 0,
  constraintsRef,
}) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: floatY,
      x: floatX,
      rotate: floatRotate,
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  >
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.18}
      dragMomentum={false}
      dragSnapToOrigin
      whileTap={{ cursor: 'grabbing', scale: 1.02 }}
      className="cursor-grab touch-none"
    >
      <img
        src={src}
        alt={alt}
        fetchpriority="high"
        decoding="sync"
        className="h-full w-full object-contain select-none pointer-events-none drop-shadow-[0_18px_34px_rgba(0,0,0,0.18)]"
        draggable="false"
      />
    </motion.div>
  </motion.div>
));

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

  const contactTextViewport = { once: true, amount: 0.16 };
  const contactFormViewport = { once: true, amount: 0.12 };
  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/kaivastudio/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'Dribbble',
      href: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 4.5c2.7 3.2 5.1 7 6.8 11.7M5 9.2c4.8-.2 9.4.5 13.7 2.1M9.7 18.7c1.5-3.8 4.5-6.8 8.5-8.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 10v6M8 8.2v.1M12 16v-3.2c0-1.3.8-2.1 1.9-2.1 1 0 1.7.7 1.7 2.1V16M12 10v.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="contacto" 
      ref={sectionRef} 
      className="contact-section relative w-full overflow-x-clip bg-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.92)_72%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute right-[8%] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#8242f5]/[0.08] blur-[88px]" />
      <div className="pointer-events-none absolute right-[12%] top-[34%] h-[220px] w-[220px] rounded-full bg-[#d96cff]/[0.06] blur-[72px]" />
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
              viewport={contactTextViewport}
              className="relative z-10 max-w-[560px]"
            >
              <motion.div variants={textItem} className="font-manrope text-[16px] font-medium tracking-normal" style={gradientAccentStyle}>
                Contacto
              </motion.div>
              <motion.h2 className="mt-6 font-epilogue text-[clamp(40px,7vw,112px)] font-extrabold leading-[0.92] tracking-[-0.04em] text-[#080808] md:tracking-[-0.035em] lg:tracking-[-0.04em]">
                <motion.span variants={textItem} className="block">¡Hablemos!</motion.span>
              </motion.h2>
              <AnimatedText 
                text="Cuéntanos qué estás construyendo y te responderemos con una propuesta clara, directa y bien estructurada."
                className="mt-7 max-w-[40ch] text-[clamp(18px,1.4vw,22px)] leading-[1.55] text-[#080808]/62"
              />
            </motion.div>

            <motion.form
              initial="hidden"
              whileInView="show"
              viewport={contactFormViewport}
              variants={formItem}
              whileHover={prefersReducedMotion || isMobile ? undefined : { y: -2 }}
              transition={{ duration: 0.32, ease: premiumEase }}
              className="relative z-30 rounded-[34px] p-6 md:p-8 shadow-[0_24px_60px_-16px_rgba(130,66,245,0.15)] border border-white/60"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 243, 255, 0.88) 100%)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                ...(isMobile ? {} : { transformPerspective: 1600, transformStyle: 'preserve-3d' })
              }}
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
                      className="contact-input mt-3 w-full rounded-[20px] px-4 py-3.5 text-[15px] text-[#080808] outline-none bg-white/60 backdrop-blur-md border border-white/80 focus:bg-white transition-all shadow-sm"
                    />
                  </motion.label>
                  <motion.label variants={fieldItem} className="block">
                    <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.18em] text-[#080808]/46">
                      Correo electrónico
                    </span>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      className="contact-input mt-3 w-full rounded-[20px] px-4 py-3.5 text-[15px] text-[#080808] outline-none bg-white/60 backdrop-blur-md border border-white/80 focus:bg-white transition-all shadow-sm"
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
                    className="contact-input mt-3 w-full rounded-[22px] px-4 py-3.5 text-[15px] text-[#080808] outline-none bg-white/60 backdrop-blur-md border border-white/80 focus:bg-white transition-all shadow-sm resize-none"
                  />
                </motion.label>
              </motion.div>

              <motion.div variants={fieldItem} className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <label className="flex items-start gap-3 max-w-[34ch] cursor-pointer group">
                  <div className="relative flex items-center justify-center h-5 w-5 rounded border border-[#080808]/20 bg-white/50 shrink-0 group-hover:border-[#8242f5] transition-colors mt-0.5">
                    <input type="checkbox" className="peer opacity-0 absolute inset-0 cursor-pointer" required />
                    <svg className="w-3.5 h-3.5 text-[#8242f5] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[12px] leading-5 text-[#080808]/60">
                    Acepto las políticas de privacidad y el tratamiento de mis datos.
                  </span>
                </label>
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
        className="contact-footer-block relative w-full overflow-hidden bg-[#111111] pb-[max(env(safe-area-inset-bottom),0px)]"
        style={prefersReducedMotion ? undefined : { y: footerY, opacity: footerOpacity }}
        initial={prefersReducedMotion ? { opacity: 0 } : false}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.06 }}
        transition={{ duration: 0.7, ease: premiumEase }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          animate={prefersReducedMotion ? undefined : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={prefersReducedMotion ? undefined : { duration: 16, ease: 'linear', repeat: Infinity }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 28%, rgba(33,178,198,0.18) 0%, rgba(33,178,198,0) 28%), radial-gradient(circle at 82% 36%, rgba(130,66,245,0.22) 0%, rgba(130,66,245,0) 32%), radial-gradient(circle at 54% 82%, rgba(217,108,255,0.18) 0%, rgba(217,108,255,0) 28%)',
            backgroundSize: '140% 140%',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_22%,rgba(255,255,255,0)_100%)]" />
        <div className="mx-auto flex min-h-[34vh] w-full max-w-[1320px] flex-col items-center justify-center px-6 py-10 text-center md:min-h-[40vh] md:px-12 md:py-12 lg:px-16">
          <a
            href="mailto:hello@kaivastudio.com"
            className="relative z-10 font-epilogue text-[clamp(28px,4vw,60px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-white transition-opacity duration-300 hover:opacity-80"
          >
            hello@kaivastudio.com
          </a>
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, delay: index * 0.06, ease: premiumEase }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition-all duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-white/10 hover:text-white"
              >
                {item.icon}
              </motion.a>
            ))}
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
        <div className="mx-auto w-full max-w-[1240px] px-6 pb-20 md:px-12 md:pb-24 lg:px-16 lg:pb-28">
          <div className="services-sticky-container relative">
            {services.map((service, index) => {
              const isActive = activeService === index;

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`services-sticky-card group relative flex flex-col overflow-hidden rounded-[40px] border border-white/80 bg-white shadow-[0_22px_60px_-30px_rgba(80,74,168,0.18)] transition-[box-shadow,transform] duration-500 hover:shadow-[0_32px_80px_-40px_rgba(130,66,245,0.25)] ${isActive ? 'services-card-active shadow-[0_32px_80px_-40px_rgba(130,66,245,0.25)]' : ''}`}
                  onViewportEnter={() => setActiveService(index)}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  onFocus={() => setActiveService(index)}
                  onTouchStart={() => setActiveService(index)}
                >
                  {/* Glowing Effect Blobs (Bottom Half) */}
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[40px]">
                    <div className={`services-glow-a absolute -bottom-[20%] -right-[10%] h-[70%] w-[70%] translate-x-1/4 translate-y-1/4 rounded-full bg-[#d96cff] opacity-0 blur-[100px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-[0.25] ${isActive ? 'translate-x-0 translate-y-0 opacity-[0.25]' : ''}`} />
                    <div className={`services-glow-b absolute -bottom-[20%] left-[15%] h-[70%] w-[70%] translate-y-1/4 rounded-full bg-[#8242f5] opacity-0 blur-[100px] transition-all duration-1000 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-[0.2] ${isActive ? 'translate-y-0 opacity-[0.2]' : ''}`} />
                    <div className={`services-glow-c absolute -bottom-[20%] -left-[10%] h-[70%] w-[70%] -translate-x-1/4 translate-y-1/4 rounded-full bg-[#21b2c6] opacity-0 blur-[100px] transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-[0.25] ${isActive ? 'translate-x-0 translate-y-0 opacity-[0.25]' : ''}`} />
                  </div>

                  <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 md:p-12 lg:p-16">
                    <div className="flex items-start justify-between">
                      <div className="max-w-2xl">
                        <motion.div
                          className="font-epilogue text-[64px] font-extrabold leading-none tracking-[-0.04em] md:text-[84px] lg:text-[110px]"
                          style={gradientAccentStyle}
                          animate={{
                            x: isActive ? 10 : 0,
                          }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          0{index + 1}
                        </motion.div>
                        <motion.h3
                          className="mt-8 font-epilogue text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] md:text-[48px] lg:text-[64px] xl:text-[72px]"
                          animate={{
                            x: isActive ? 12 : 0,
                          }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {service.title}
                        </motion.h3>
                      </div>
                    </div>

                    <div className="mt-12 max-w-xl">
                      <motion.p
                        className="text-[16px] leading-[1.6] text-[#080808]/60 md:text-[20px] lg:text-[22px]"
                        animate={{
                          color: isActive ? 'rgba(8,8,8,0.85)' : 'rgba(8,8,8,0.60)',
                          x: isActive ? 12 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {service.description}
                      </motion.p>
                      
                      <div className="mt-10 flex gap-4">
                        <button className="flex items-center gap-2 rounded-full bg-[#080808] px-8 py-4 font-manrope text-[14px] font-bold text-white transition-transform duration-300 hover:scale-105">
                          Saber más
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const PortfolioSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      id="proyectos"
      data-nav-theme="light"
      className="relative [overflow-x:clip] bg-[linear-gradient(180deg,#ede4fb_0%,#f1e8ff_10%,#f4edff_24%,#f7f3ff_42%,#ffffff_100%)] pb-20 text-[#080808]"
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

      <div className="relative z-20 mx-auto max-w-[1380px] px-5 pt-32 sm:px-6 sm:pt-36 md:px-10 lg:px-12 lg:pt-40">
        <div className="mt-0">
          <div className="portfolio-sticky-container sticky-container relative hidden lg:block">
            {serviceShowcase.map((service, index) => (
              <article
                key={service.id}
                className="portfolio-service-card service-card group sticky overflow-hidden rounded-[28px] border border-[#d9d3ca] bg-white shadow-[0_12px_30px_rgba(57,53,44,0.06)] transition-[border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-[#792fec]/30 hover:shadow-[0_24px_60px_rgba(57,53,44,0.08),0_0_0_1px_rgba(121,47,236,0.12)]"
                style={{ zIndex: index + 1 }}
                onMouseMove={handleServiceCardMouseMove}
                onMouseLeave={resetServiceCardMouseMove}
              >
                <div className="portfolio-service-layout flex min-h-0">
                  <div className="service-info relative flex-[1] overflow-hidden">
                    <div className="pointer-events-none absolute left-8 top-6 font-['Inter Tight'] text-[88px] font-extrabold leading-none tracking-[-0.06em] text-[#39352c]/[0.03] lg:text-[110px]">
                      {service.number}
                    </div>
                    <div className="portfolio-service-copy relative z-10 flex h-full flex-col justify-center px-8 py-10 xl:px-12 xl:py-12">
                      <h2 className="portfolio-service-title mt-0 max-w-[13ch] font-['Inter Tight'] text-[clamp(38px,4.4vw,58px)] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#39352c]">
                        {service.title}
                      </h2>
                      <p className="mt-5 max-w-[31rem] text-[15px] leading-7 text-[#5e584e] md:text-[16px]">
                        {service.description}
                      </p>
                      <div className="portfolio-service-points mt-7 flex max-w-[32rem] flex-wrap gap-3">
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

          <div className="portfolio-mobile-stack relative lg:hidden">
            {serviceShowcase.map((service, index) => (
              <motion.article
                key={service.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: premiumEase, delay: index * 0.03 }}
                className="portfolio-mobile-card sticky overflow-hidden rounded-[24px] border border-[#d8d0ee] bg-white shadow-[0_20px_44px_-32px_rgba(66,52,111,0.18)] sm:rounded-[28px]"
                style={{ zIndex: index + 1 }}
              >
                {(() => {
                  const mobileDescription =
                    service.id === 'design'
                      ? 'Identidad visual, UI y piezas clave para que la marca se vea coherente, seria y lista para vender.'
                      : service.description;
                  const mobilePoints =
                    service.id === 'design'
                      ? service.points.slice(0, 2)
                      : service.points;

                  return (
                <div className="grid min-h-[560px] gap-0">
                  <div className="relative overflow-hidden border-b border-[#ece5fb] px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#080808]/8 bg-[#faf7ff] font-['Inter Tight'] text-[24px] font-extrabold tracking-[-0.05em] text-[#080808]/60">
                        {service.number}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8242f5]">
                          {service.label}
                        </div>
                        <h2 className="mt-1 max-w-[10ch] font-['Inter Tight'] text-[clamp(28px,8vw,40px)] font-extrabold leading-[0.96] tracking-[-0.045em] text-[#080808]">
                          {service.title}
                        </h2>
                        <p className="mt-3 pr-2 text-[14px] leading-6 text-[#080808]/68">
                          {mobileDescription}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {mobilePoints.map((point) => (
                        <div
                          key={point}
                          className="rounded-full border border-[#080808]/8 bg-[#faf7ff] px-3.5 py-2 text-[12px] font-medium text-[#39352c]/78"
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-center bg-[linear-gradient(180deg,rgba(247,243,255,0.96)_0%,rgba(255,255,255,1)_100%)] px-4 pb-5 pt-4">
                    <div className="w-full">
                      <MobileServiceShowcaseVisual service={service} prefersReducedMotion={prefersReducedMotion} />
                    </div>
                  </div>
                </div>
                  );
                })()}
              </motion.article>
            ))}
          </div>
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
    <section ref={sectionRef} id="proceso" className="process-section relative w-full bg-[#6f22ef] py-0">
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
    <div style={{ marginTop: '-2px', position: 'relative', zIndex: 2 }}>
      <AliadosSection />
    </div>
    <div style={{ marginTop: '-2px', position: 'relative', zIndex: 1 }}>
      <section
        id="planes"
        data-nav-theme="light"
        className="plans-section relative overflow-hidden px-4 pb-12 pt-14 md:px-8 md:pb-16 md:pt-20"
        style={{
          background:
            'linear-gradient(180deg, #f3edff 0%, #f5f0ff 18%, #fbf9ff 40%, #ffffff 64%, #ffffff 100%)'
        }}
      >
      <motion.img
        src={asset('KaivaMora1.webp')}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute right-0 top-[6%] z-20 hidden w-[200px] opacity-90 sm:block md:right-[-2%] md:top-[6.5%] md:w-[320px] lg:right-[-3%] lg:top-[6%] lg:w-[460px] pointer-events-none"
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.48, ease: premiumEase }}
        className="plans-shell relative z-30 mx-auto w-full max-w-[1180px]"
      >
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
              src={asset('plan-negocio-gradient.webp')}
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

                    <div className="plan-price font-epilogue text-[30px] font-extrabold leading-none tracking-[-0.04em] text-[#080808]">
                      {plan.price}
                    </div>
                    <div className="mt-2 text-[13px] font-medium text-[#080808]/50">
                      Pago único
                    </div>

                    <a href="#contacto" onClick={(event) => scrollToSection(event, 'contacto')} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-inter text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-[1.02] ${isMiddle ? '' : 'bg-[#0a0a0a]'}`} style={isMiddle ? accentButtonStyle : undefined}>
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
                          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24">
                            <defs>
                              <linearGradient id={`grad-${index}-${i}`} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#21b2c6" />
                                <stop offset="58%" stopColor="#8242f5" />
                                <stop offset="100%" stopColor="#d96cff" />
                              </linearGradient>
                            </defs>
                            <circle cx="12" cy="12" r="9" strokeWidth="1.5" stroke={`url(#grad-${index}-${i})`} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" stroke={`url(#grad-${index}-${i})`} />
                          </svg>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

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
    </div>
  </>
);

const AliadosSection = () => {
  return (
    <section
      className="allies-section relative overflow-hidden px-4 py-12 md:px-8 md:py-16 lg:py-20"
      style={{
        background:
          'linear-gradient(180deg, #6f22ef 0%, #8242f5 30%, #9c67f2 54%, #d9ccfb 78%, #efe6ff 90%, #f3edff 100%)'
      }}
    >
      <div className="mx-auto w-full max-w-[1680px] rounded-[34px] bg-[#050505] px-7 py-12 text-white shadow-[0_16px_38px_-30px_rgba(6,2,26,0.52)] ring-1 ring-white/10 md:px-14 md:py-16 lg:min-h-[82vh] lg:px-20 lg:py-24 xl:min-h-[86vh] xl:px-24">
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
                  className="absolute -bottom-1 left-[-2%] h-[22px] w-[110%] object-contain md:h-[28px] lg:-bottom-[9px]"
                />
              </span>
            </h2>

            <div className="mt-6 flex flex-col items-start gap-5 md:mt-8 md:gap-6">
              <p className="max-w-[48ch] text-[16px] leading-[1.65] text-white/72 md:text-[18px] lg:text-[20px] lg:max-w-[52ch]">
                Alianza estratégica con Seo4Startups enfocada en potenciar la visibilidad digital mediante SEO, posicionamiento y presencia online.
              </p>

              <a
                href="https://seoforstartups.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 font-inter text-[14px] font-bold text-[#121222] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)] transition-transform duration-300 hover:-translate-y-0.5 md:px-10 md:py-4 md:text-[15px]"
              >
                Conoce más de Seo4Startups
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a2e] text-white/80">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] md:max-w-[560px] lg:max-w-[700px] xl:max-w-[760px]">
            <img
              src={asset('Kaiva seo.webp')}
              alt="Kaiva x SEO for Startups"
              loading="lazy"
              decoding="async"
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
    <h2 ref={containerRef} className="font-epilogue text-[clamp(20px,5.8vw,72px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-center max-w-[980px] mt-4 mx-auto flex flex-col items-center">
      {resolvedLines.map((line, lineIndex) => (
        <span key={lineIndex} className="flex justify-center w-full whitespace-nowrap gap-x-[0.25em]">
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
      className="inline-block"
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
  const hoveredRef = useRef(false);

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
      const nextHovered = !!(target.closest('a') || target.closest('button'));
      if (nextHovered !== hoveredRef.current) {
        hoveredRef.current = nextHovered;
        setHoveredNode(nextHovered);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
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

const FixedNavbar = ({ projectsActive = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
  <>
    <a
      href={projectsActive ? HOME_PAGE_HREF_FROM_SERVICES : '#inicio'}
      onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'inicio')}
      className="fixed left-6 top-5 z-40 w-fit text-left text-[16px] leading-[0.95] text-[#080808] transition-colors duration-200 md:left-[80px] md:top-[40px] md:text-[20px]"
    >
      <span className="block font-semibold tracking-[-0.02em]">Kaiva</span>
      <span className="block font-normal">
        Studio<span style={gradientAccentStyle}>.</span>
      </span>
    </a>

    <nav className="fixed right-[32px] top-[32px] z-40 hidden items-center gap-10 text-[16px] text-[#080808]/68 transition-colors duration-200 md:flex md:right-[80px] md:top-[45px]">
      <a href={projectsActive ? HOME_PAGE_HREF_FROM_SERVICES : '#inicio'} onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'inicio')} className="font-medium" style={projectsActive ? undefined : gradientAccentStyle}>
        Inicio
      </a>
              <a href={projectsActive ? './' : SERVICES_PAGE_HREF} className="transition-colors hover:text-[#080808]" style={projectsActive ? gradientAccentStyle : undefined}>Servicios</a>
      <a href={projectsActive ? `${HOME_PAGE_HREF_FROM_SERVICES}#contacto` : '#contacto'} onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'contacto')} className="transition-colors hover:text-[#080808]">Contacto</a>
      <a
        href={projectsActive ? `${HOME_PAGE_HREF_FROM_SERVICES}#planes` : '#planes'}
        onClick={projectsActive ? undefined : (event) => scrollToSection(event, 'planes')}
        className="inline-flex h-[44px] items-center justify-center self-center rounded-full border border-[#080808]/12 bg-white/72 px-6 font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#080808] shadow-[0_12px_28px_-20px_rgba(8,8,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
      >
        Paquetes
      </a>
    </nav>

    <div className="fixed right-6 top-5 z-40 flex items-center gap-3 md:hidden">
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
      {!projectsActive && (
        <a
          href="#planes"
          onClick={(event) => scrollToSection(event, 'planes')}
          className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-[#080808]/12 bg-white px-5 font-manrope text-[10px] font-bold uppercase tracking-[0.16em] text-[#080808] transition-colors hover:bg-[#f7f7f7]"
        >
          Paquetes
        </a>
      )}
    </div>

    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-white px-6 pb-10 pt-8 md:hidden"
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
            <a
              href={projectsActive ? HOME_PAGE_HREF_FROM_SERVICES : '#inicio'}
              onClick={(e) => {
                if (!projectsActive) scrollToSection(e, 'inicio');
                setMobileMenuOpen(false);
              }}
              className="border-b border-[#080808]/6 py-4 text-[22px] font-semibold tracking-[-0.02em] text-[#080808]"
            >
              Inicio
            </a>
            <a
              href={projectsActive ? './' : SERVICES_PAGE_HREF}
              className="border-b border-[#080808]/6 py-4 text-[22px] font-semibold tracking-[-0.02em] text-[#080808]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </a>
            {[
              { label: 'Paquetes', id: 'planes' },
              { label: 'Contacto', id: 'contacto' },
            ].map(({ label, id }) => (
              <a
                key={id}
                href={projectsActive ? `${HOME_PAGE_HREF_FROM_SERVICES}#${id}` : `#${id}`}
                onClick={(e) => {
                  if (!projectsActive) scrollToSection(e, id);
                  setMobileMenuOpen(false);
                }}
                className="border-b border-[#080808]/6 py-4 text-[22px] font-semibold tracking-[-0.02em] text-[#080808]"
              >
                {label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};

const projectGalleryItems = [
  { id: 1, category: 'web', title: 'Restaurante Gourmet', desc: 'Landing page premium con sistema de reservas integrado.', image: 'project-web-1.webp' },
  { id: 2, category: 'web', title: 'E-commerce Skincare', desc: 'Tienda online con diseño minimalista y checkout optimizado.', image: 'project-web-2.webp' },
  { id: 3, category: 'web', title: 'Firma Legal', desc: 'Sitio corporativo con formulario de consultas y blog SEO.', image: 'project-web-3.webp' },
  { id: 4, category: 'design', title: 'Identidad Corporativa', desc: 'Logo, papelería y manual de marca completo.', image: 'project-design-1.webp' },
  { id: 5, category: 'design', title: 'Contenido Social', desc: 'Plantillas de redes sociales y piezas publicitarias.', image: 'project-design-2.webp' },
  { id: 6, category: 'systems', title: 'Dashboard Analítico', desc: 'Panel de control con KPIs en tiempo real e integraciones.', image: 'project-system-1.webp' },
];

const ProjectsGallery = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projectGalleryItems : projectGalleryItems.filter(p => p.category === filter);

  return (
    <section className="relative bg-white px-6 pb-20 pt-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="font-manrope text-[11px] font-bold uppercase tracking-[0.2em] text-[#8242f5]">Portfolio</div>
            <h2 className="mt-3 font-epilogue text-[clamp(32px,5vw,56px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-[#080808]">
              Proyectos recientes
            </h2>
            <p className="mt-4 max-w-[500px] text-[15px] leading-relaxed text-[#080808]/60">
              Una muestra de lo que hacemos. Cada proyecto se diseña con estrategia, estética y propósito.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'web', label: 'Web' },
              { id: 'design', label: 'Diseño' },
              { id: 'systems', label: 'Sistemas' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                  filter === cat.id
                    ? 'bg-[#080808] text-white shadow-md'
                    : 'bg-[#f7f5fb] border border-[#080808]/8 text-[#080808]/70 hover:bg-[#ede4fb]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: premiumEase }}
                className="group relative overflow-hidden rounded-[24px] border border-[#080808]/6 bg-white shadow-[0_8px_30px_-16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(130,66,245,0.15)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f7f5fb]">
                  <img
                    src={asset(project.image)}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-5 md:p-6">
                  <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-[#8242f5]">
                    {project.category === 'web' ? 'Desarrollo Web' : project.category === 'design' ? 'Diseño' : 'Sistemas'}
                  </div>
                  <h3 className="mt-2 font-epilogue text-[20px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#080808]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#080808]/55">
                    {project.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mt-16 relative overflow-hidden rounded-[28px] px-8 py-12 md:px-14 md:py-16 text-center"
          style={{ background: 'linear-gradient(135deg, #8242f5 0%, #6f22ef 60%, #5a18d0 100%)' }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-[15%] -top-[30%] h-[300px] w-[300px] rounded-full bg-white/8 blur-[80px]" />
            <div className="absolute -left-[10%] -bottom-[20%] h-[250px] w-[250px] rounded-full bg-white/6 blur-[60px]" />
          </div>
          <div className="relative z-10">
            <h3 className="font-epilogue text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="mx-auto mt-4 max-w-[500px] text-[15px] leading-relaxed text-white/75">
              Cada proyecto comienza con una conversación. Cuéntanos tu idea y te damos una propuesta sin compromiso.
            </p>
            <a
              href={`${HOME_PAGE_HREF_FROM_SERVICES}#contacto`}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-manrope text-[13px] font-bold uppercase tracking-[0.12em] text-[#8242f5] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-105"
            >
              Hablemos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
          <img
            src={asset('KaivaSara.webp')}
            alt=""
            loading="lazy"
            className="pointer-events-none absolute -right-4 -bottom-4 hidden w-[180px] opacity-30 md:block lg:w-[240px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

const ProjectsPage = () => {
  return (
    <>
      <FixedNavbar projectsActive />
      <PortfolioSection />
      <ProjectsGallery />
    </>
  );
};

const App = () => {
  const showProjectsPage = isServicesPath();

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
              <div style={{ marginTop: '-2px', position: 'relative', zIndex: 0 }}>
                <ContactRevealSection />
              </div>
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

        @media (max-width: 767px) {
          .portfolio-mobile-stack {
            height: 282vh;
          }
          .portfolio-mobile-card {
            top: 66px;
            margin-bottom: 12vh;
          }
          .problem-flip-wrapper {
            transform: translateZ(0);
          }
          .problem-reasons-grid {
            gap: 12px !important;
          }
          .problem-flip-inner {
            transform: translateZ(0);
          }
          .problem-card,
          .problem-flip-face {
            box-shadow: 0 14px 30px -24px rgba(8, 8, 8, 0.18) !important;
            filter: none !important;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }
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
            min-height: 180px !important;
            padding: 16px 18px !important;
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
          .problem-flip-inner.problem-flipped {
            transform: rotateY(180deg);
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
            font-size: 24px !important;
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

          .portfolio-sticky-container {
            height: 360vh;
          }
          .portfolio-service-card {
            top: clamp(100px, 14vh, 140px);
            margin-bottom: 28vh;
          }
          .portfolio-service-layout {
            height: min(680px, calc(100svh - clamp(108px, 15vh, 148px)));
            min-height: 500px;
          }
          .portfolio-service-copy {
            min-height: 0;
          }
          .portfolio-service-title {
            overflow-wrap: anywhere;
          }
          .portfolio-service-points > div {
            padding-block: 0.7rem;
          }

          @media (min-width: 1024px) and (max-width: 1366px) {
            .portfolio-sticky-container {
              height: 330vh;
            }
            .portfolio-service-card {
              top: 88px;
              margin-bottom: 24vh;
            }
            .portfolio-service-layout {
              height: min(610px, calc(100svh - 112px));
              min-height: 460px;
            }
            .portfolio-service-copy {
              padding: 34px 36px !important;
            }
            .portfolio-service-title {
              margin-top: 28px !important;
              font-size: clamp(34px, 4vw, 48px) !important;
            }
            .portfolio-service-points {
              margin-top: 22px !important;
              gap: 10px !important;
            }
            .portfolio-service-points > div {
              padding: 0.58rem 0.85rem !important;
              font-size: 13px !important;
            }
            .service-visual > div {
              padding: 20px !important;
            }
            .service-visual-web .portfolio-web-visual-stage {
              min-height: 300px !important;
            }
          }

          @media (min-width: 1024px) and (max-height: 760px) {
            .portfolio-service-card {
              top: 74px;
            }
            .portfolio-service-layout {
              height: calc(100svh - 92px);
              min-height: 420px;
            }
            .portfolio-service-copy {
              padding-top: 26px !important;
              padding-bottom: 26px !important;
            }
            .portfolio-service-title {
              margin-top: 20px !important;
              font-size: clamp(30px, 3.4vw, 42px) !important;
            }
            .portfolio-service-copy p {
              margin-top: 14px !important;
              font-size: 14px !important;
              line-height: 1.55 !important;
            }
            .portfolio-service-points {
              margin-top: 18px !important;
            }
          }
          
          /* Sticky Services Stacking Effect */
          .services-sticky-container {
            height: 310vh; /* Allow enough scroll space for 3 cards */
            position: relative;
            margin-top: 40px;
          }
          .services-sticky-card {
            position: sticky;
            top: 100px;
            height: 75vh;
            min-height: 520px;
            width: 100%;
            margin-bottom: 40px;
          }
          .services-sticky-card:nth-child(1) { z-index: 1; }
          .services-sticky-card:nth-child(2) { z-index: 2; }
          .services-sticky-card:nth-child(3) { z-index: 3; }
          .services-sticky-card.services-card-active {
            transform: translateY(-4px);
          }
          
          @media (max-width: 768px) {
            .services-sticky-container {
              height: auto;
              margin-top: 20px;
            }
            .services-sticky-card {
              position: sticky;
              top: 84px !important;
              height: calc(100svh - 112px);
              min-height: 430px;
              max-height: 560px;
              margin-bottom: 28px;
              border-radius: 28px !important;
              touch-action: pan-y;
            }
            .services-sticky-card > .relative.z-10 {
              padding: 28px !important;
            }
            .services-sticky-card h3 {
              margin-top: 22px !important;
              font-size: clamp(30px, 9vw, 42px) !important;
            }
            .services-sticky-card p {
              font-size: 15px !important;
              line-height: 1.55 !important;
            }
            .services-sticky-card button {
              padding: 13px 22px !important;
              font-size: 13px !important;
            }
            .services-card-active .services-glow-a,
            .services-card-active .services-glow-c {
              opacity: 0.25 !important;
              transform: translate(0, 0) !important;
            }
            .services-card-active .services-glow-b {
              opacity: 0.2 !important;
              transform: translateY(0) !important;
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

const ProblemFlipCard = ({ card, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="problem-flip-wrapper"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: premiumEase }}
    >
      <div
        className="problem-flip-inner relative w-full min-h-[200px] md:min-h-[220px] transition-transform duration-700"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT — Problem */}
        <div
          className="problem-flip-face problem-card absolute inset-0 overflow-hidden rounded-[22px] p-5 md:p-6 text-[#080808] flex flex-col justify-between group"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="problem-card-copy relative z-10">
            <h4 className="font-epilogue text-[20px] md:text-[24px] font-extrabold leading-[1.05] tracking-tight mb-2">
              {card.problem}
            </h4>
            <p className="font-manrope text-[13px] md:text-[14px] leading-[1.5] text-[#080808]/66">
              {card.problemDesc}
            </p>
          </div>
          <button
            onClick={() => setFlipped(true)}
            className="problem-card-button mt-4 inline-flex w-fit items-center gap-3 rounded-full py-1.5 pl-1.5 pr-6 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="problem-card-button-icon flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#080808]/72">
              VER SOLUCIÓN
            </span>
          </button>
        </div>

        {/* BACK — Solution */}
        <div
          className="problem-flip-face absolute inset-0 overflow-hidden rounded-[22px] p-5 md:p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(145deg, #8242f5 0%, #6f22ef 100%)' }}
        >
          <div className="relative z-10">
            <div className="font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">
              Nuestra solución
            </div>
            <h4 className="font-epilogue text-[20px] md:text-[24px] font-extrabold leading-[1.05] tracking-tight text-white mb-2">
              {card.solution}
            </h4>
            <p className="font-manrope text-[13px] md:text-[14px] leading-[1.5] text-white/80">
              {card.solutionDesc}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setFlipped(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </button>
            <a
              href="#planes"
              onClick={(e) => scrollToSection(e, 'planes')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8242f5] transition-transform hover:scale-105"
            >
              Ver planes
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProblemSection = () => {
  return (
    <section id="problema" className="problem-section relative w-full bg-transparent text-[#080808] px-6 py-14 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-[1240px] relative z-10 flex flex-col items-center">
        
        <ScrollRevealHeadline
          lines={[
            'El 91% de las empresas en Colombia',
            'son pymes. La mayoría no',
            'existen en internet.',
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

          <div className="problem-reasons-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                problem: 'Es muy caro.',
                problemDesc: 'Muchos negocios creen que una web profesional está fuera de su alcance.',
                solution: 'Inversión con retorno real.',
                solutionDesc: 'Tendrás una web profesional que trabaja 24/7 captando clientes.',
              },
              {
                problem: 'No sé cómo funciona.',
                problemDesc: 'Dominios, hosting, SEO... el lenguaje técnico aleja a quienes solo quieren más clientes.',
                solution: 'Nos encargamos de todo.',
                solutionDesc: 'Cuéntanos tu negocio y nosotros hacemos el resto.',
              },
              {
                problem: 'Ya intenté y no funcionó.',
                problemDesc: 'Malas experiencias con freelancers o plantillas que no reflejan tu negocio.',
                solution: 'Estrategia, no plantillas.',
                solutionDesc: 'Cada proyecto tiene estructura, copy y diseño estratégico.',
              },
              {
                problem: 'No tengo tiempo.',
                problemDesc: 'Gestionar un negocio ya es suficiente. No deberías necesitar un equipo técnico.',
                solution: 'Entrega lista para operar.',
                solutionDesc: 'En semanas tienes tu web publicada y funcionando, sin reuniones infinitas.',
              },
            ].map((card, i) => (
              <ProblemFlipCard key={i} card={card} index={i} />
            ))}
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
  const heroSectionRef = useRef(null);
  const heroRobotBoundsRef = useRef(null);
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
    <section ref={heroSectionRef} id="inicio" data-nav-theme="light" className="relative z-30 min-h-[100svh] w-full [overflow-x:clip] bg-[#ffffff] font-open-sauce text-[#080808] md:min-h-[860px]">
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
        <a href={SERVICES_PAGE_HREF} className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Servicios</a>
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
              <a
                href="#inicio"
                onClick={(e) => { scrollToSection(e, 'inicio'); setMobileMenuOpen(false); }}
                className="py-4 text-[22px] font-semibold tracking-[-0.02em] text-[#080808] border-b border-[#080808]/6"
              >
                Inicio
              </a>
              <a
                href={SERVICES_PAGE_HREF}
                className="py-4 text-[22px] font-semibold tracking-[-0.02em] text-[#080808] border-b border-[#080808]/6"
                onClick={() => setMobileMenuOpen(false)}
              >
                Servicios
              </a>
              {[
                { label: 'Paquetes', id: 'planes' },
                { label: 'Contacto', id: 'contacto' },
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
          href={SERVICES_PAGE_HREF}
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
        <div ref={heroRobotBoundsRef} className="relative mx-auto aspect-[1.08/1] w-full md:aspect-[1.16/1]">
          <img
            src={asset('nombre hero.webp')}
            alt="Kaiva Studio"
            fetchpriority="high"
            decoding="sync"
            className="absolute left-1/2 top-[10%] w-[58%] -translate-x-1/2 object-contain md:top-[10%] md:w-[50%]"
          />
          <HeroDraggableRobot
            src={asset('KaivaTheo.webp')}
            alt="Robot Kaiva Theo"
            constraintsRef={heroSectionRef}
            className="left-[2%] top-[20%] z-20 w-[40%] md:left-[10%] md:top-[18%] md:w-[34%]"
            floatY={[0, -5, 0, 5, 0]}
            floatX={[0, 0, 0, 0, 0]}
            floatRotate={[0, 0, 0, 0, 0]}
            duration={8.6}
            delay={0.15}
          />
          <HeroDraggableRobot
            src={asset('KaivaSara.webp')}
            alt="Robot Kaiva Sara"
            constraintsRef={heroSectionRef}
            className="right-[-4%] top-[6%] z-30 w-[41%] md:right-[2%] md:top-[8%] md:w-[34%]"
            floatY={[0, -6, 0, 6, 0]}
            floatX={[0, 0, 0, 0, 0]}
            floatRotate={[0, 0, 0, 0, 0]}
            duration={7.8}
            delay={0.35}
          />
        </div>
      </motion.div>

      <motion.div
        className="hero-cta-wrap absolute left-1/2 bottom-[92px] md:bottom-[4.5%] z-[60] -translate-x-1/2 w-full flex justify-center"
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
        className="hero-support-copy absolute bottom-4 left-6 right-6 z-40 hidden md:block md:bottom-[60px] md:left-auto md:right-[80px] md:max-w-[420px] md:text-[15px] text-justify font-normal leading-[1.5] text-[#080808]/64"
      >
        Deja de perder clientes por no estar en el internet. Diseñamos tu<br />
        página web con criterio profesional, entrega rápida y precio justo.
      </motion.p>
    </section>
  );
};

export default App;










