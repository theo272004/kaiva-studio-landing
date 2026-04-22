import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const slides = [
  {
    id: 1,
    number: '01',
    label: 'Inteligencia de Negocios',
    vibe: 'Analitico · Predictivo',
    brand: 'KAIVA INSIGHTS',
    description: 'Transformamos datos complejos en dashboards intuitivos que impulsan decisiones estrategicas.',
    accent: '#8242F5',
    mockup: 'dashboard',
  },
  {
    id: 2,
    number: '02',
    label: 'E-Commerce de Lujo',
    vibe: 'Exclusivo · Conversion',
    brand: 'KAIVA COMMERCE',
    description: 'Experiencias de compra premium donde la estetica eleva el valor percibido de cada producto.',
    accent: '#8242F5',
    mockup: 'ecommerce',
  },
  {
    id: 3,
    number: '03',
    label: 'Infraestructura SaaS',
    vibe: 'Solido · Escalable',
    brand: 'KAIVA CORE',
    description: 'Plataformas tecnologicas disenadas para el rendimiento extremo y la claridad operativa.',
    accent: '#8242F5',
    mockup: 'tech',
  },
  {
    id: 4,
    number: '04',
    label: 'Editorial Creativo',
    vibe: 'Sofisticado · Narrativo',
    brand: 'KAIVA STUDIO',
    description: 'Storytelling visual para marcas que buscan destacar en un ecosistema digital saturado.',
    accent: '#8242F5',
    mockup: 'creative',
  },
];

const businessPillars = [
  'Claridad',
  'Eficiencia',
  'Valor percibido',
];

const services = [
  {
    title: 'Desarrollo web',
    description: 'Creamos paginas web profesionales pensadas para transmitir confianza, ordenar la presencia digital y generar oportunidades reales.',
  },
  {
    title: 'Diseno UI/UX',
    description: 'Disenamos experiencias claras, rapidas y enfocadas en conversion, con una estructura visual alineada al objetivo comercial.',
  },
  {
    title: 'Automatizacion',
    description: 'Integramos herramientas, respuestas y flujos para reducir friccion operativa y dejar una solucion lista para funcionar.',
  },
  {
    title: 'Configuracion tecnica',
    description: 'Resolvemos dominio, hosting, seguridad, correos corporativos y publicacion final dentro de un solo proceso.',
  },
];

const processSteps = ['Diagnostico', 'Estructura', 'Diseno', 'Desarrollo', 'Entrega'];

const resultCases = [
  {
    name: 'Que somos',
    lead: 'Kaiva Studio es un estudio de desarrollo web que crea experiencias digitales enfocadas en claridad, estetica y funcionalidad.',
    detail: 'No nos limitamos a disenar paginas web. Desarrollamos plataformas que ayudan a posicionar negocios, organizar su presencia digital y convertir visitas en oportunidades reales.',
  },
  {
    name: 'Publico objetivo',
    lead: 'Trabajamos con emprendedores, marcas personales, negocios en crecimiento, pymes y ecommerce en expansion.',
    detail: 'El cliente de Kaiva busca claridad, rapidez y confianza en el proceso. Necesita una solucion integral para avanzar sin complicaciones ni multiples proveedores.',
  },
  {
    name: 'Personalidad de marca',
    lead: 'Kaiva se define por una personalidad clara, segura y estrategica.',
    detail: 'Es una marca moderna, visual y eficiente, con una comunicacion directa, profesional y orientada a resultados, sin complejidad innecesaria.',
  },
];

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

const MockupRenderer = ({ type }) => {
  const mockups = {
    dashboard: asset('kaiva_dashboard_mockup.png'),
    ecommerce: asset('kaiva_ecommerce_mockup.png'),
    tech: asset('kaiva_tech_mockup.png'),
    creative: asset('kaiva_creative_mockup.png'),
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a1a1c]">
      <img
        src={mockups[type]}
        alt={type}
        className="h-full w-full object-contain p-3 opacity-90 transition-opacity duration-700 hover:opacity-100 sm:object-cover sm:p-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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

const SectionHeader = ({ eyebrow, title, description, align = 'left', inverse = false }) => (
  <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    {eyebrow ? (
      <div className={`mb-4 text-[11px] font-manrope font-extrabold uppercase tracking-[0.32em] ${inverse ? 'text-white/64' : 'text-[#21B2C6]'}`}>
        {eyebrow}
      </div>
    ) : null}
    <h2 className={`text-[clamp(34px,5vw,78px)] font-epilogue font-extrabold leading-[0.98] tracking-[-0.065em] ${inverse ? 'text-white' : 'text-[#080808]'}`}>
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
  const toneClass =
    tone === 'dark'
      ? 'bg-[#050505] text-[#ffffff]'
      : tone === 'muted'
        ? 'bg-[#ffffff] text-[#080808]'
        : 'bg-[#ffffff] text-[#080808]';

  return (
    <section id={id} data-nav-theme={tone === 'dark' ? 'dark' : 'light'} className={`${toneClass} ${className}`}>
      <div className="mx-auto w-full max-w-[1320px] px-6 py-28 md:px-12 md:py-36 lg:px-16">{children}</div>
    </section>
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
      data-nav-theme="dark"
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="relative z-30 px-6 pt-6 md:px-16 md:pt-8" aria-hidden="true" />

      <div className="relative z-20 mt-10 px-6 md:mt-20 md:px-16">
        <div className="flex justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="font-['Manrope'] text-[clamp(40px,5.8vw,88px)] font-extrabold leading-[0.98] tracking-[-0.06em] text-white">
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
              <div className="font-epilogue text-[clamp(48px,7vw,92px)] font-extrabold italic leading-none opacity-90" style={{ color: active.accent }}>
                {active.number}
              </div>
              <div className="pb-2">
                <div className="font-manrope text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/42">Servicio</div>
                <div className="font-epilogue text-xl font-bold italic leading-tight md:text-2xl">{active.label}</div>
                <div className="mt-1 font-manrope text-[11px] tracking-wider text-white/56">{active.vibe}</div>
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
            <div className="mb-2 font-manrope text-[11px] font-bold uppercase tracking-wider text-[#8242F5]">- {active.brand}</div>
            <div className="font-manrope text-[13px] italic leading-relaxed text-white/64">{active.description}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 md:hidden">
        <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
          <div className="flex items-end gap-3">
            <div className="font-epilogue text-[42px] font-extrabold italic leading-none opacity-90" style={{ color: active.accent }}>
              {active.number}
            </div>
            <div className="pb-1">
              <div className="font-manrope text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/42">Servicio</div>
              <div className="font-epilogue text-[22px] font-bold italic leading-tight text-white">{active.label}</div>
              <div className="mt-1 font-manrope text-[11px] tracking-wider text-white/56">{active.vibe}</div>
            </div>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="mb-2 font-manrope text-[11px] font-bold uppercase tracking-wider text-[#8242F5]">- {active.brand}</div>
            <div className="font-manrope text-[13px] italic leading-relaxed text-white/68">{active.description}</div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-8 px-6 pb-12 md:mt-32 md:px-16">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setActiveIndex((p) => (p - 1 + slides.length) % slides.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 transition-colors hover:border-white/42"
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
                  className="group relative h-[2px] flex-1 cursor-pointer overflow-hidden bg-white/12"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left"
                    style={{ background: s.accent }}
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: i < activeIndex ? 1 : isActive ? (isHovering ? 0 : 1) : 0,
                    }}
                    transition={isActive && !isHovering ? { duration: 5.5, ease: 'linear' } : { duration: 0.4 }}
                  />
                  <div className="absolute -top-5 left-0 font-mono text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-60">
                    {s.number}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="font-manrope text-[11px] font-bold tracking-wider tabular-nums text-[#8242F5]">
            {String(activeIndex + 1).padStart(2, '0')} <span className="opacity-40">/ {String(slides.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={() => setActiveIndex((p) => (p + 1) % slides.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 transition-colors hover:border-white/42"
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
    <SectionShell id="estructura" tone="light">
      <motion.div {...sectionReveal} className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <SectionHeader
          eyebrow="Diagnostico"
          title="Descripcion de marca"
          description="Kaiva Studio es un estudio de desarrollo web especializado en la creacion de paginas claras, rapidas y visualmente impactantes para negocios que buscan crecer con una presencia digital profesional."
        />

        <div className="rounded-[30px] border border-[#080808]/14 bg-white p-8 md:p-10">
          <div className="space-y-5">
            {businessPillars.map((item, index) => (
              <div key={item} className="flex items-start gap-5 border-b border-[#080808]/10 pb-6 last:border-b-0 last:pb-0">
                <span className="min-w-[34px] font-manrope text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#080808]/42">
                  0{index + 1}
                </span>
                <div>
                  <div className="font-epilogue text-[26px] font-extrabold leading-tight tracking-[-0.04em] text-[#080808]">{item}</div>
                  <p className="mt-3 text-[14px] leading-7 text-[#080808]/62">
                    {index === 0 && 'Cada proceso debe ser entendible para el cliente y cada mensaje debe transmitir seguridad y proposito.'}
                    {index === 1 && 'El proceso esta disenado para ser comprensible, estructurado y sin fricciones, evitando dependencias externas.'}
                    {index === 2 && 'Kaiva no compite por precio. Compite por orden, estetica y resultados.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionShell>

    <SectionShell id="servicios" tone="dark">
      <motion.div {...sectionReveal}>
        <SectionHeader
          eyebrow="Servicios"
          title="Que ofrecemos"
          description="Ofrecemos soluciones completas de desarrollo web que integran diseno, tecnologia y estructura en un solo proceso."
          inverse
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="rounded-[28px] border border-white/14 bg-transparent p-8"
            >
              <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.28em] text-white/44">Kaiva</div>
              <h3 className="mt-6 font-epilogue text-[30px] font-extrabold tracking-[-0.05em] text-white">{service.title}</h3>
              <p className="mt-5 text-[15px] leading-8 text-white/68">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </SectionShell>

    <SectionShell id="proceso" tone="light">
      <motion.div {...sectionReveal}>
        <SectionHeader
          eyebrow="Proceso"
          title="Como trabajamos"
          description="Nuestro proceso esta pensado para ser claro, estructurado y sin fricciones, de modo que el cliente entienda que se esta haciendo, por que se hace y que resultado puede esperar."
        />
        <div className="mt-16 rounded-[32px] border border-[#080808]/14 bg-white p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-5 md:gap-6">
            {processSteps.map((step, index) => (
              <div key={step} className="relative">
                <div className="mb-5 flex items-center gap-4 md:block">
                  <div className="mb-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#080808]/16 bg-white font-manrope text-[12px] font-extrabold tracking-[0.22em] text-[#080808] md:mb-5">
                    0{index + 1}
                  </div>
                  <div className="font-epilogue text-[24px] font-extrabold tracking-[-0.045em] text-[#080808] md:text-[22px]">{step}</div>
                </div>
                <p className="max-w-[210px] text-[14px] leading-7 text-[#080808]/62">
                  {index === 0 && 'Analizamos objetivos, contexto y necesidades del negocio antes de construir.'}
                  {index === 1 && 'Organizamos la estructura para que la presencia digital tenga un proposito claro y medible.'}
                  {index === 2 && 'Disenamos una experiencia visual atractiva, profesional y alineada a la marca.'}
                  {index === 3 && 'Integramos tecnologia, herramientas y configuracion tecnica completa en un solo servicio.'}
                  {index === 4 && 'Publicamos una solucion lista para operar desde el primer dia, con soporte posterior segun el plan.'}
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

    <SectionShell id="resultados" tone="dark" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[8%] top-[12%] h-48 w-48 rounded-full bg-[#21B2C6]/8 blur-3xl" />
        <div className="absolute bottom-[10%] right-[12%] h-56 w-56 rounded-full bg-[#8242F5]/8 blur-3xl" />
      </div>
      <motion.div {...sectionReveal} className="relative z-10">
        <SectionHeader
          eyebrow="Marca"
          title="Que somos y para quien trabajamos"
          description="Nuestro trabajo conecta lo visual con lo estrategico para construir activos digitales que no solo se ven bien, sino que funcionan a nivel de negocio."
          inverse
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {resultCases.map((item) => (
            <article
              key={item.name}
              className="rounded-[30px] border border-white/14 bg-transparent p-8"
            >
              <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/44">Kaiva Studio</div>
              <h3 className="mt-5 font-epilogue text-[30px] font-extrabold tracking-[-0.05em] text-white">{item.name}</h3>
              <div className="mt-8 grid gap-5">
                <div>
                  <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/38">Enfoque</div>
                  <p className="mt-2 text-[14px] leading-6 text-white/62">{item.lead}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/44">Detalle</div>
                  <p className="mt-2 text-[16px] leading-7 text-white/88">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </SectionShell>

    <section
      id="planes"
      data-nav-theme="dark"
      className="bg-[#5918DF] px-4 py-12 md:px-8 md:py-16"
    >
      <motion.div {...sectionReveal} className="mx-auto w-full max-w-[1180px]">
          <div className="max-w-3xl">
            <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.34em] text-white/68">Pricing</div>
            <h2 className="mt-3 font-epilogue text-[clamp(44px,7vw,92px)] font-extrabold leading-[0.92] tracking-[-0.07em] text-white">
              Planes
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/82 md:text-[17px]">
              Elige la solución ideal para tu negocio.
              <br />
              Diseño premium, estructura estratégica y ejecución real.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <motion.article
                key={plan.name}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`relative flex h-full flex-col rounded-[24px] border p-6 md:p-7 ${
                  plan.featured
                    ? 'border-white/10 bg-[rgba(10,6,24,0.96)] text-white shadow-[0_28px_80px_-36px_rgba(0,0,0,0.72)]'
                    : 'border-white/16 bg-white text-[#080808] shadow-[0_22px_64px_-38px_rgba(22,14,72,0.32)]'
                }`}
              >
                {plan.featured ? (
                  <div className="absolute right-5 top-5 rounded-full border border-[#C6FF00]/20 bg-[#C6FF00] px-3 py-1.5 font-manrope text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#080808]">
                    {plan.badge}
                  </div>
                ) : null}

                <div className={`font-manrope text-[11px] font-extrabold uppercase tracking-[0.3em] ${plan.featured ? 'text-white/52' : 'text-[#080808]/44'}`}>
                  {plan.name}
                </div>
                <div className={`mt-3 font-epilogue text-[34px] font-extrabold leading-[0.95] tracking-[-0.06em] md:text-[38px] ${plan.featured ? 'text-white' : 'text-[#080808]'}`}>
                  {plan.price}
                </div>
                <p className={`mt-3 max-w-[28ch] text-[14px] leading-6 ${plan.featured ? 'text-white/74' : 'text-[#080808]/68'}`}>
                  {plan.audience}
                </p>
                <p className={`mt-3 text-[14px] leading-6 ${plan.featured ? 'text-white/66' : 'text-[#080808]/58'}`}>
                  {plan.description}
                </p>

                <div className={`my-5 h-px ${plan.featured ? 'bg-white/10' : 'bg-[#080808]/10'}`} />

                <div className="space-y-2.5">
                  {plan.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className={`mt-[4px] flex h-5 w-5 items-center justify-center rounded-full border border-[#C6FF00]/25 bg-[#C6FF00] text-[11px] font-bold text-[#080808]`}>
                        ✓
                      </span>
                      <span className={`text-[14px] leading-6 ${plan.featured ? 'text-white/82' : 'text-[#080808]/74'}`}>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <button
                    className={`inline-flex min-h-[42px] items-center justify-center rounded-full px-5 py-2.5 font-manrope text-[11px] font-extrabold uppercase tracking-[0.22em] transition-all duration-300 ${
                      plan.featured
                        ? 'bg-white text-[#080808] hover:-translate-y-0.5 hover:bg-white/92'
                        : 'bg-[#080808] text-white hover:-translate-y-0.5 hover:bg-[#141414]'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="mt-5 overflow-hidden rounded-[22px] border border-white/10 bg-[#050505] shadow-[0_18px_48px_-28px_rgba(0,0,0,0.6)]"
          >
            <div className="grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-center">
              <div className="px-6 py-6 md:min-h-[148px] md:border-r md:border-white/12 md:px-8">
                <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#C6FF00]">
                  {ecommercePlan.label}
                </div>
                <div className="mt-3 font-epilogue text-[30px] font-bold leading-none tracking-[-0.04em] text-white/96 md:text-[34px]">
                  {ecommercePlan.name}
                </div>
                <div className="mt-3 font-manrope text-[18px] font-extrabold leading-none tracking-[-0.03em] text-white/88">
                  {ecommercePlan.price}
                </div>
              </div>

              <div className="px-6 py-6 md:min-h-[148px] md:border-r md:border-white/12 md:px-8 md:py-0 md:flex md:items-center">
                <p className="max-w-[62ch] text-[14px] leading-6 text-white/68 md:text-[15px] md:leading-7">
                  {ecommercePlan.description}
                </p>
              </div>

              <div className="px-6 pb-6 md:flex md:min-h-[148px] md:items-center md:justify-center md:px-8 md:py-0">
                <button
                  aria-label={ecommercePlan.cta}
                  className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#C6FF00] text-[#050505] shadow-[0_12px_28px_-18px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_30px_-20px_rgba(0,0,0,0.62)]"
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

    <SectionShell id="por-que-kaiva" tone="dark">
      <motion.div {...sectionReveal} className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeader
          eyebrow="Confianza"
          title="Por que Kaiva"
          description="Kaiva Studio se rige por principios claros que garantizan consistencia, confianza y profesionalismo en cada proyecto."
          inverse
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {trustPoints.map((point, index) => (
            <div
              key={point}
              className="rounded-[26px] border border-white/14 bg-transparent p-6"
            >
              <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.28em] text-white/42">0{index + 1}</div>
              <div className="mt-4 font-epilogue text-[27px] font-extrabold leading-tight tracking-[-0.05em] text-white">{point}</div>
              <div className="mt-3 text-[14px] leading-7 text-white/66">
                {index === 0 && 'Cada proceso debe ser entendible para el cliente.'}
                {index === 1 && 'Cada entrega debe cumplir un estandar alto.'}
                {index === 2 && 'Los tiempos se respetan y se optimizan.'}
                {index === 3 && 'Lo prometido se cumple con orden y control.'}
                {index === 4 && 'Cada decision tiene un proposito funcional.'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionShell>

    <SectionShell id="kaiva" tone="muted">
      <motion.div {...sectionReveal} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[32px] border border-[#080808]/14 bg-[#080808] p-8 text-white md:p-10">
          <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.34em] text-white/44">Kaiva Studio</div>
          <div className="mt-8 font-epilogue text-[clamp(34px,4vw,54px)] font-extrabold leading-[1.02] tracking-[-0.05em]">
            Ayudamos a negocios a construir una presencia digital profesional, funcional y alineada con sus objetivos.
          </div>
        </div>
        <div className="max-w-2xl">
          <p className="text-[17px] leading-8 text-[#080808]/68">
            Kaiva Studio elimina la complejidad tecnica para que el cliente pueda enfocarse en hacer crecer su negocio, a traves de procesos claros, soluciones integrales y ejecucion eficiente.
          </p>
        </div>
      </motion.div>
    </SectionShell>

    <SectionShell id="cta" tone="dark" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <motion.div {...sectionReveal} className="relative z-10 rounded-[36px] border border-white/14 bg-transparent px-8 py-16 text-center md:px-14 md:py-22">
        <div className="mx-auto max-w-4xl">
          <div className="font-manrope text-[11px] font-extrabold uppercase tracking-[0.34em] text-white/44">Vision</div>
          <h2 className="mt-6 font-epilogue text-[clamp(40px,5.4vw,86px)] font-extrabold leading-[0.98] tracking-[-0.065em] text-white">
            Construimos presencia digital solida y bien ejecutada
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-8 text-white/72">
            Buscamos consolidarnos como un estudio referente en desarrollo web para negocios que valoran la claridad, la estetica y la estructura.
          </p>
          <a
            href="#contacto"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-white bg-white px-8 py-4 font-manrope text-[13px] font-extrabold uppercase tracking-[0.2em] text-[#080808] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Hablemos de tu proyecto
          </a>
        </div>
      </motion.div>
    </SectionShell>

    <SectionShell id="contacto" tone="light">
      <motion.div {...sectionReveal} className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeader
          eyebrow="Contacto"
          title="Conversemos"
          description="La comunicacion de Kaiva Studio es directa, clara y orientada a resultados. Cuentanos sobre tu proyecto y te responderemos con precision, sin tecnicismos innecesarios."
        />
        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="https://wa.me/"
              className="rounded-[26px] border border-[#080808]/14 bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="font-manrope text-[11px] font-bold uppercase tracking-[0.28em] text-[#21B2C6]">WhatsApp</div>
              <div className="mt-5 font-epilogue text-[30px] font-extrabold tracking-[-0.05em] text-[#080808]">Contacto directo</div>
              <div className="mt-2 text-[15px] text-[#080808]/62">Abrir conversacion</div>
            </a>
            <a
              href="mailto:hola@kaivastudio.com"
              className="rounded-[26px] border border-[#080808]/14 bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="font-manrope text-[11px] font-bold uppercase tracking-[0.28em] text-[#21B2C6]">Email</div>
              <div className="mt-5 font-epilogue text-[30px] font-extrabold tracking-[-0.05em] text-[#080808]">hola@kaivastudio.com</div>
              <div className="mt-2 text-[15px] text-[#080808]/62">Respuesta por correo</div>
            </a>
          </div>

          <form className="rounded-[32px] border border-[#080808]/14 bg-white p-7 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.26em] text-[#201d1a]/54">Nombre</span>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="mt-3 w-full rounded-2xl border border-[#201d1a]/10 bg-white px-5 py-4 text-[15px] text-[#201d1a] outline-none transition-colors focus:border-[#21B2C6]"
                />
              </label>
              <label className="block">
                <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.26em] text-[#201d1a]/54">Email</span>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="mt-3 w-full rounded-2xl border border-[#201d1a]/10 bg-white px-5 py-4 text-[15px] text-[#201d1a] outline-none transition-colors focus:border-[#21B2C6]"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.26em] text-[#201d1a]/54">Proyecto</span>
              <textarea
                rows="6"
                placeholder="Cuantanos sobre tu negocio, objetivos y el tipo de web que necesitas."
                className="mt-3 w-full rounded-[24px] border border-[#201d1a]/10 bg-white px-5 py-4 text-[15px] text-[#201d1a] outline-none transition-colors focus:border-[#21B2C6]"
              />
            </label>
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-lg text-[13px] leading-6 text-[#201d1a]/58">
                Proyectos seleccionados, procesos claros y una ejecucion orientada a resultado.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#201d1a] px-8 py-4 font-manrope text-[13px] font-bold uppercase tracking-[0.2em] text-[#f8f6f2] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Enviar consulta
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </SectionShell>
  </>
);

export default function KaivaLanding() {
  return (
    <div className="w-full">
      <HeroSection />
      <PortfolioSection />
      <ExpandedAgencySections />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,300;0,400;0,600;0,800;1,400&family=Manrope:wght@300;400;600;800&family=Inter:wght@300;400;600;800&family=Montserrat:wght@300;400;600;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        @import url('https://fonts.cdnfonts.com/css/open-sauce-one');
        html { scroll-behavior: smooth; }
        body { background-color: #f8f6f2; }
        .font-epilogue { font-family: 'Epilogue', sans-serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-open-sauce { font-family: 'Open Sauce One', sans-serif; }
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
    <section id="inicio" data-nav-theme="light" className="relative min-h-[100svh] w-full overflow-hidden bg-[#ffffff] font-open-sauce text-[#080808] md:h-screen">
      <motion.img
        src={asset('degradado-lateral.png')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="pointer-events-none absolute left-[-48%] top-[70%] z-0 hidden w-[82vw] min-w-[300px] max-w-[1120px] -translate-y-1/2 object-contain md:block md:left-[-34%] md:top-[68%] md:w-[66vw] md:min-w-[460px]"
      />
      <motion.img
        src={asset('degradado-lateral.png')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
        className="pointer-events-none absolute right-[-40%] top-[18%] z-0 hidden w-[78vw] min-w-[280px] max-w-[980px] -translate-y-1/2 object-contain md:block md:right-[-28%] md:top-[22%] md:w-[60vw] md:min-w-[420px]"
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
        <span className="block font-bold">Kaiva</span>
        <span className="block font-normal">
          Studio<span className="text-[#7b6dff]">.</span>
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
          style={{
            background: 'linear-gradient(135deg, #6aa8ff, #7b6dff, #d96cff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Inicio
        </a>
        <a href="#kaiva" className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Nosotros</a>
        <a href="#proyectos" className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Proyectos</a>
        <a href="#contacto" className={`transition-colors ${isDarkNavbar ? 'hover:text-white' : 'hover:text-[#080808]'}`}>Contacto</a>
        <a
          href="#planes"
          className={`inline-flex h-[42px] items-center justify-center self-center rounded-full px-5 font-manrope text-[11px] font-extrabold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-0.5 ${
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
          className={`inline-flex min-h-[38px] items-center justify-center rounded-full px-4 font-manrope text-[10px] font-extrabold uppercase tracking-[0.2em] transition-colors ${
            isDarkNavbar ? 'bg-white/10 text-white' : 'bg-[#080808] text-white'
          }`}
        >
          Paquetes
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.6, delay: 0.14, ease: 'easeOut' }}
        className="absolute left-6 right-6 top-[110px] z-40 flex max-w-[360px] flex-col items-start text-left md:left-[80px] md:right-auto md:top-[160px] md:max-w-[720px]"
      >
        <h1 className="w-fit text-[30px] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#080808] md:text-[54px]">
          <span className="block md:whitespace-nowrap">Paginas web claras,</span>
          <span className="block md:whitespace-nowrap">rapidas y profesionales</span>
        </h1>

        <a
          href="#proyectos"
          className="mt-4 inline-block w-fit pb-1 text-[16px] font-medium leading-none underline decoration-1 underline-offset-[5px] md:mt-6 md:text-[20px]"
          style={{
            background: 'linear-gradient(135deg, #6aa8ff, #7b6dff, #d96cff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Explora nuestro trabajo ↗
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
        className="absolute left-1/2 top-[290px] z-20 w-[118vw] max-w-[560px] -translate-x-1/2 px-0 md:top-[220px] md:w-[110vw] md:max-w-[1040px]"
      >
        <div className="relative mx-auto aspect-[1.08/1] w-full md:aspect-[1.16/1]">
          <img
            src={asset('nombre hero.png')}
            alt="Kaiva Studio"
            className="absolute left-1/2 top-[10%] w-[58%] -translate-x-1/2 object-contain md:top-[10%] md:w-[50%]"
          />
          <img
            src={asset('robots hero.png')}
            alt="Robots Kaiva"
            className="absolute left-1/2 top-[9%] w-[245%] -translate-x-1/2 scale-[1.08] object-contain md:top-[8%] md:w-[280%] md:scale-[1.15]"
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
        className="absolute bottom-4 left-6 right-6 z-40 max-w-[280px] text-left text-[12px] font-normal leading-[1.5] text-[#080808]/64 md:bottom-[60px] md:left-auto md:right-[80px] md:max-w-[420px] md:text-[15px]"
      >
        Kaiva Studio combina diseno, estructura y tecnologia
        <br />
        para construir activos digitales que funcionan.
      </motion.p>
    </section>
  );
};
