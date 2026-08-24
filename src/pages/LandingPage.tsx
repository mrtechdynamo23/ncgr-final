import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NCGRLogo from '../components/common/NCGRLogo';
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Server,
  Shield,
  Users,
  Sparkles,
  Monitor,
  Activity,
  Layers,
  ChevronDown,
  CheckCircle2,
  Lock,
  Cpu,
  TrendingUp,
  Globe,
  Radio,
  FileCheck,
} from 'lucide-react';
import './LandingPage.css';

/* ─── Hero Cinematic Image Carousel Data ──────────────────────── */
interface HeroSlide {
  id: string;
  image: string;
  category: string;
  location: string;
  objectPositionDesktop: string;
  objectPositionMobile: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/assets/landing/hero-riyadh-digital-city-02.jpg',
    category: 'Saudi Digital Infrastructure',
    location: 'Riyadh Digital Tech Hub',
    objectPositionDesktop: 'center 40%',
    objectPositionMobile: 'center center',
  },
  {
    id: 'slide-2',
    image: '/assets/landing/hero-riyadh-skyline-01.jpg',
    category: 'National Scale Technology',
    location: 'Connected Capital Skyline',
    objectPositionDesktop: 'center 45%',
    objectPositionMobile: 'center center',
  },
  {
    id: 'slide-3',
    image: '/assets/landing/hero-kafd-02.jpg',
    category: 'Executive Institutional District',
    location: 'King Abdullah Financial District (KAFD)',
    objectPositionDesktop: 'center 35%',
    objectPositionMobile: 'center center',
  },
  {
    id: 'slide-4',
    image: '/assets/landing/hero-saudi-technology-01.jpg',
    category: 'Enterprise Innovation',
    location: 'Saudi National Digital Transformation',
    objectPositionDesktop: 'center 40%',
    objectPositionMobile: 'center center',
  },
  {
    id: 'slide-5',
    image: '/assets/landing/hero-digital-infrastructure-01.jpg',
    category: 'Operational Telemetry & Core Systems',
    location: 'Mission-Critical Digital Fabric',
    objectPositionDesktop: 'center 45%',
    objectPositionMobile: 'center center',
  },
];

/* ─── Capability Domain Data ─────────────────────────────────── */
interface CapabilityDomain {
  id: string;
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  items: Array<{ name: string; nameAr: string }>;
}

const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    id: 'service-operations',
    title: 'Service Operations',
    titleAr: 'عمليات الخدمات',
    tagline: 'Applications, infrastructure, tools and multi-vendor SIAM delivery ecosystem.',
    taglineAr: 'التطبيقات والبنية التحتية والأدوات وبيئة إدارة موردي الخدمات المتعددة.',
    icon: Server,
    accentColor: '#4AA6DC',
    accentBg: 'rgba(74, 166, 220, 0.08)',
    accentBorder: 'rgba(74, 166, 220, 0.25)',
    items: [
      { name: 'Application Services & Health', nameAr: 'صحة وخدمات التطبيقات' },
      { name: 'Infrastructure & Network Operations', nameAr: 'عمليات البنية التحتية والشبكات' },
      { name: 'IT Support Tool Management', nameAr: 'إدارة أدوات الدعم التقني' },
      { name: 'Vendor Governance & SIAM Delivery', nameAr: 'حوكمة الموردين وإدارة SIAM' },
    ],
  },
  {
    id: 'governance-assurance',
    title: 'Governance & Assurance',
    titleAr: 'الحوكمة وضمان الأداء',
    tagline: 'Deterministic SLA assurance, audit compliance, and program portfolio milestones.',
    taglineAr: 'ضمان مستويات الخدمة الحتمي والامتثال الرقابي ومحفظة المشاريع.',
    icon: Shield,
    accentColor: '#40904F',
    accentBg: 'rgba(64, 144, 79, 0.08)',
    accentBorder: 'rgba(64, 144, 79, 0.25)',
    items: [
      { name: 'Audit & Regulatory Compliance', nameAr: 'المراجعة والامتثال التنظيمي' },
      { name: 'Contractual SLA Management & Forecasts', nameAr: 'إدارة وتوقعات اتفاقيات مستوى الخدمة' },
      { name: 'Program Management & Milestones', nameAr: 'إدارة البرامج والمعالم الرئيسية' },
      { name: 'License & Entitlement Health', nameAr: 'صحة التراخيص والاستحقاقات' },
    ],
  },
  {
    id: 'people-resources',
    title: 'People & Resources',
    titleAr: 'الكوادر والموارد البشرية',
    tagline: 'National workforce empowerment, Saudization benchmarks, and talent enablement.',
    taglineAr: 'تمكين الكوادر الوطنية ومؤشرات التوطين وتطوير الكفاءات.',
    icon: Users,
    accentColor: '#671E75',
    accentBg: 'rgba(103, 30, 117, 0.08)',
    accentBorder: 'rgba(103, 30, 117, 0.25)',
    items: [
      { name: 'Saudization Tracker & Tier Metrics', nameAr: 'مؤشر التوطين ونسب التوطين' },
      { name: 'Saudi Empowerment & Academy', nameAr: 'أكاديمية التمكين والتدريب' },
      { name: 'Team Capacity & Roster Allocation', nameAr: 'توزيع الكوادر وجداول العمل' },
    ],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation & AI',
    titleAr: 'التحول الرقمي والذكاء الاصطناعي',
    tagline: 'Continuous automation, intelligent operational insights, and modern cloud architecture.',
    taglineAr: 'الأتمتة المستمرة ورؤى العمليات الذكية وبنية السحابة الحديثة.',
    icon: Sparkles,
    accentColor: '#1FBBB0',
    accentBg: 'rgba(31, 187, 176, 0.08)',
    accentBorder: 'rgba(31, 187, 176, 0.25)',
    items: [
      { name: 'AI Operational Automation', nameAr: 'أتمتة العمليات بالذكاء الاصطناعي' },
      { name: 'Cloud Modernization Workflows', nameAr: 'مسارات التحديث السحابي' },
      { name: 'Cross-Tower Efficiency Initiatives', nameAr: 'مبادرات كفاءة القطاعات التقنية' },
    ],
  },
  {
    id: 'command-control',
    title: 'Command & Control',
    titleAr: 'القيادة والسيطرة التنفيذية',
    tagline: 'Executive Control Towers, 24/7 Command Center, and unified situational awareness.',
    taglineAr: 'أبراج المراقبة التنفيذية ومركز العمليات والوعي الشامل بالوضع التشغيلي.',
    icon: Monitor,
    accentColor: '#074A76',
    accentBg: 'rgba(7, 74, 118, 0.08)',
    accentBorder: 'rgba(7, 74, 118, 0.25)',
    items: [
      { name: 'Executive Control Towers', nameAr: 'أبراج المراقبة والتحكم التنفيذية' },
      { name: 'Integrated Command Center', nameAr: 'مركز القيادة والعمليات الموحد' },
      { name: 'Incident War-Room Orchestration', nameAr: 'إدارة غرف العمليات للبلاغات' },
    ],
  },
];

/* ─── Connected Ecosystem Node Data ──────────────────────────── */
const ECOSYSTEM_DOMAINS = [
  { id: 'ops', label: 'Service Operations', labelAr: 'العمليات التقنية', icon: Server, color: '#4AA6DC' },
  { id: 'gov', label: 'Governance & SLA', labelAr: 'الحوكمة والاتفاقيات', icon: Shield, color: '#40904F' },
  { id: 'people', label: 'National Workforce', labelAr: 'الكوادر الوطنية', icon: Users, color: '#671E75' },
  { id: 'trans', label: 'Transformation', labelAr: 'التحول والابتكار', icon: Sparkles, color: '#1FBBB0' },
  { id: 'control', label: 'Executive Control', labelAr: 'القيادة التنفيذية', icon: Monitor, color: '#074A76' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exiting, setExiting] = useState(false);

  const SLIDE_DURATION = 6500; // 6.5s per slide

  /* Preload hero images to avoid flicker */
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  /* Header scroll background toggle */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Auto-advancing cinematic carousel */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlideIndex((curr) => (curr + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSlideSelect = useCallback((idx: number) => {
    setActiveSlideIndex(idx);
  }, []);

  /* Intersection Observer for scroll-triggered reveals */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.landing-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* Portal Entry Handler */
  const handleEnterPortal = () => {
    setExiting(true);
    setTimeout(() => {
      navigate('/', { replace: false });
    }, 400);
  };

  /* Language Switcher */
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <div className={`landing-root ${isRtl ? 'rtl' : 'ltr'} ${exiting ? 'landing-exit' : ''}`}>
      {/* ─── INSTITUTIONAL HEADER ─────────────────────────────────────── */}
      <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="landing-header-container">
          <div className="landing-header-left">
            <div className="landing-header-logo-wrap">
              <NCGRLogo height={34} variant="full" />
            </div>
            <div className="landing-header-divider" />
            <span className="landing-header-portal-title">
              {isRtl ? 'بوابة إدارة تقنية المعلومات الموحدة' : 'Unified IT Management Portal'}
            </span>
          </div>

          <div className="landing-header-right">
            <div className="landing-secure-indicator" title="Enterprise Access Layer Verified">
              <Lock size={12} />
              <span>{isRtl ? 'جلسة قيادية مؤمنة' : 'Secure Executive Session'}</span>
            </div>

            <button
              className="landing-lang-toggle"
              onClick={toggleLanguage}
              aria-label={isRtl ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe size={14} />
              <span>{isRtl ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── 1. HERO SECTION (PRIMARY CINEMATIC VISUAL EXPERIENCE) ────── */}
      <section
        className="landing-hero"
        aria-label="Welcome Hero"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Layered Cinematic Slides Container */}
        <div className="landing-hero-backdrop" aria-hidden="true">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === activeSlideIndex;
            return (
              <div
                key={slide.id}
                className={`landing-hero-image-layer ${isActive ? 'active' : ''}`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundPosition: slide.objectPositionDesktop,
                }}
              />
            );
          })}

          {/* Controlled Atmospheric Gradient Overlays (Institutional NCGR Blue) */}
          <div className="landing-hero-vignette" />
          <div className="landing-hero-overlay-dark" />
          <div className="landing-hero-overlay-blue" />
          <div className="landing-hero-vector-grid" />
        </div>

        {/* Stable Hero Content (Text remains fixed and calm) */}
        <div className="landing-hero-container">
          <div className="landing-hero-content">
            {/* Institutional Eyebrow Badge */}
            <div className="landing-hero-eyebrow">
              <span className="landing-hero-eyebrow-dot" />
              <ShieldCheck size={14} />
              <span>
                {isRtl
                  ? 'المركز الوطني لنظم الموارد الحكومية • البيئة التشغيلية التنفيذية'
                  : 'National Center for Government Resources • Executive Operating Environment'}
              </span>
            </div>

            {/* Anchored Headline */}
            <h1 className="landing-hero-headline">
              <span className="landing-hero-headline-light">
                {isRtl ? 'إدارة تقنية موحدة،' : 'Unified IT Management,'}
              </span>
              <br />
              <span className="landing-hero-headline-strong">
                {isRtl ? 'رؤية تنفيذية واحدة.' : 'One Executive View.'}
              </span>
            </h1>

            {/* Authoritative Subtext */}
            <p className="landing-hero-subtext">
              {isRtl
                ? 'بيئة تنفيذية متكاملة لعمليات تقنية المعلومات، وضمان الخدمات، والحوكمة المؤسسية، وشفافية الكوادر الوطنية، والامتثال، والتحول الرقمي.'
                : 'An integrated executive environment for IT operations, service assurance, governance, workforce visibility, compliance and transformation.'}
            </p>

            {/* Primary Action Button */}
            <div className="landing-hero-cta-group">
              <button
                className="landing-cta-primary"
                onClick={handleEnterPortal}
                aria-label={isRtl ? 'الدخول إلى برج المراقبة والتحكم التنفيذي' : 'Enter the Executive Control Tower'}
              >
                <span>
                  {isRtl ? 'الدخول إلى برج المراقبة والتحكم التنفيذي' : 'Enter the Executive Control Tower'}
                </span>
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>

              <a href="#operational-domains" className="landing-cta-secondary">
                <span>{isRtl ? 'استعراض المنظومة' : 'Explore the Platform'}</span>
                <ChevronDown size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Segmented Cinematic Visual Indicators */}
        <div className="landing-hero-controls" aria-label="Carousel navigation">
          <div className="landing-hero-location-badge">
            <Radio size={12} className="landing-pulse-icon" />
            <span>{currentSlide.location}</span>
          </div>

          <div className="landing-hero-indicators">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSlideSelect(idx)}
                  className={`landing-indicator-seg ${isActive ? 'active' : ''}`}
                  aria-label={`Slide ${idx + 1}: ${slide.category}`}
                >
                  <span className="landing-indicator-num">0{idx + 1}</span>
                  <div className="landing-indicator-bar">
                    <div
                      key={`${slide.id}-${isActive ? 'active' : 'idle'}`}
                      className={`landing-indicator-fill ${isActive ? 'animating' : idx < activeSlideIndex ? 'filled' : ''}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 2. SECOND SECTION: ONE ENVIRONMENT. MULTIPLE OPERATIONAL DOMAINS ─── */}
      <section id="operational-domains" className="landing-section landing-domains-split">
        <div className="landing-container">
          <div className="landing-split-grid">
            {/* Left: Strategic Editorial Narrative */}
            <div className="landing-split-text landing-reveal">
              <div className="landing-section-eyebrow">
                <Layers size={14} />
                <span>{isRtl ? 'بيئة تشغيلية متكاملة' : 'Connected Operating Environment'}</span>
              </div>

              <h2 className="landing-section-title">
                {isRtl ? 'منظومة واحدة.' : 'One Environment.'}
                <br />
                <span className="landing-text-gradient">{isRtl ? 'قطاعات تشغيلية متعددة.' : 'Multiple Operational Domains.'}</span>
              </h2>

              <p className="landing-section-description">
                {isRtl
                  ? 'توحيد عمليات الخدمات، والحوكمة، والكوادر البشرية، وضمان الأداء، والتحول الرقمي في بيئة تشغيلية رقمية مترابطة على مستوى المملكة.'
                  : 'Bringing service operations, governance, workforce, assurance and transformation into one connected operating environment.'}
              </p>

              {/* 3 Core Highlights */}
              <div className="landing-split-pillars">
                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon">
                    <Activity size={18} color="#074A76" />
                  </div>
                  <div>
                    <h4>{isRtl ? 'مراقبة شاملة ومباشرة للخدمات' : 'Real-time Service Observability'}</h4>
                    <p>{isRtl ? 'رؤية فورية لصحة التطبيقات والبنى التحتية والبلاغات الحرجة.' : 'End-to-end visibility into application health, infrastructure telemetry, and service desk queues.'}</p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon">
                    <ShieldCheck size={18} color="#40904F" />
                  </div>
                  <div>
                    <h4>{isRtl ? 'ضمان الحوكمة ومستويات الخدمة' : 'Deterministic Governance Assurance'}</h4>
                    <p>{isRtl ? 'متابعة دقيقة لاتفاقيات مستوى الخدمة الـ 123 والامتثال الرقابي دون افتراضات.' : 'Auditable tracking across 123 contract SLAs, regulatory compliance, and multi-vendor delivery.'}</p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon">
                    <Users size={18} color="#671E75" />
                  </div>
                  <div>
                    <h4>{isRtl ? 'تمكين ورؤية الكوادر الوطنية' : 'Empowered National Workforce'}</h4>
                    <p>{isRtl ? 'متابعة نسب التوطين والتطوير المهني وجداول العمل المشتركة.' : 'Tracking Saudization milestones, specialized certifications, and multi-tower capacity mobilization.'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Architectural Feature Visual */}
            <div className="landing-split-visual landing-reveal">
              <div className="landing-feature-card">
                <div
                  className="landing-feature-image"
                  style={{ backgroundImage: `url('/assets/landing/hero-riyadh-architecture.jpg')` }}
                >
                  <div className="landing-feature-overlay" />
                  
                  {/* Non-sensitive telemetry frame */}
                  <div className="landing-feature-telemetry">
                    <div className="landing-telemetry-badge">
                      <Cpu size={14} />
                      <span>{isRtl ? 'المنظومة الرقمية الوطنية' : 'Saudi National IT Fabric'}</span>
                    </div>
                    <div className="landing-telemetry-status">
                      <span className="landing-status-dot" />
                      <span>{isRtl ? '9 قطاعات تشغيلية متصلة' : '9 Unified Operational Towers'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. THIRD SECTION: CONNECTED ENTERPRISE ECOSYSTEM ─────────── */}
      <section className="landing-section landing-ecosystem-section">
        <div className="landing-container">
          <div className="landing-section-header landing-reveal">
            <div className="landing-section-eyebrow">
              <TrendingUp size={14} />
              <span>{isRtl ? 'الترابط المؤسسي' : 'Connected Architecture'}</span>
            </div>
            <h2 className="landing-section-title">
              {isRtl ? 'منظومة مترابطة لإدارة العمليات' : 'Connected Enterprise Ecosystem'}
            </h2>
            <p className="landing-section-description">
              {isRtl
                ? 'ربط مباشر وسلس بين كافة محاور المنظومة لضمان تدفق البيانات والقرارات التنفيذية السريعة.'
                : 'Direct linkage between operational telemetry, governance controls, and executive leadership.'}
            </p>
          </div>

          {/* Connected Topology Diagram */}
          <div className="landing-ecosystem-wrapper landing-reveal">
            <div className="landing-ecosystem-hub">
              {/* Animated Connection Rings */}
              <div className="landing-hub-ring ring-outer" />
              <div className="landing-hub-ring ring-inner" />

              {/* Central NCGR Core Node */}
              <div className="landing-hub-center">
                <div className="landing-hub-center-icon">
                  <Layers size={28} color="#FFFFFF" />
                </div>
                <span className="landing-hub-center-title">NCGR ITMS</span>
                <span className="landing-hub-center-sub">
                  {isRtl ? 'البيئة الموحدة' : 'Unified Operating Core'}
                </span>
              </div>

              {/* Outer Connected Nodes */}
              <div className="landing-hub-nodes">
                {ECOSYSTEM_DOMAINS.map((domain, idx) => {
                  const NodeIcon = domain.icon;
                  return (
                    <div key={domain.id} className={`landing-hub-node node-${idx + 1}`}>
                      <div className="landing-node-icon" style={{ color: domain.color, borderColor: domain.color }}>
                        <NodeIcon size={20} />
                      </div>
                      <span className="landing-node-label">{isRtl ? domain.labelAr : domain.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. FOURTH SECTION: CAPABILITY DOMAINS ─────────────────────── */}
      <section className="landing-section landing-capabilities-section">
        <div className="landing-container">
          <div className="landing-section-header landing-reveal">
            <div className="landing-section-eyebrow">
              <FileCheck size={14} />
              <span>{isRtl ? 'القدرات المؤسسية' : 'Platform Capabilities'}</span>
            </div>
            <h2 className="landing-section-title">
              {isRtl ? 'خمسة محاور رئيسية، في منصة واحدة' : 'Five Operational Domains, One Platform'}
            </h2>
            <p className="landing-section-description">
              {isRtl
                ? 'هيكلية متماسكة تغطي كافة متطلبات تشغيل تقنية المعلومات الحكومية وحوكمتها.'
                : 'A structured architecture covering enterprise services, compliance, human capital and transformation.'}
            </p>
          </div>

          {/* 5 Capability Domain Panels */}
          <div className="landing-capabilities-grid landing-reveal">
            {CAPABILITY_DOMAINS.map((domain) => {
              const DomainIcon = domain.icon;
              return (
                <div
                  key={domain.id}
                  className="landing-capability-card"
                  style={{
                    borderTopColor: domain.accentColor,
                  }}
                >
                  <div className="landing-capability-card-header">
                    <div
                      className="landing-capability-icon-wrap"
                      style={{ background: domain.accentBg, color: domain.accentColor, borderColor: domain.accentBorder }}
                    >
                      <DomainIcon size={22} />
                    </div>
                    <div>
                      <h3 className="landing-capability-name">{isRtl ? domain.titleAr : domain.title}</h3>
                      <span className="landing-capability-tagline">{isRtl ? domain.taglineAr : domain.tagline}</span>
                    </div>
                  </div>

                  <ul className="landing-capability-list">
                    {domain.items.map((item, i) => (
                      <li key={i} className="landing-capability-item">
                        <CheckCircle2 size={13} color={domain.accentColor} />
                        <span>{isRtl ? item.nameAr : item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. FIFTH SECTION: EXECUTIVE CONTROL TOWER GATEWAY ────────── */}
      <section className="landing-section landing-gateway-section">
        <div className="landing-container">
          <div className="landing-gateway-box landing-reveal">
            <div className="landing-gateway-backdrop" />
            
            <div className="landing-gateway-content">
              <div className="landing-section-eyebrow" style={{ color: '#4AA6DC', borderColor: 'rgba(74, 166, 220, 0.3)' }}>
                <Monitor size={14} />
                <span>{isRtl ? 'القيادة والتحكم' : 'Executive Command'}</span>
              </div>

              <h2 className="landing-gateway-title">
                {isRtl ? 'من الرؤية الشاملة إلى اتخاذ القرار.' : 'From Visibility to Action.'}
              </h2>

              <p className="landing-gateway-text">
                {isRtl
                  ? 'الانتقال المباشر من الصورة التشغيلية الكلية إلى برج المراقبة والتحكم التنفيذي لمتابعة مؤشرات الأداء الحية والتنبؤ الاستباقي بمستويات الخدمة.'
                  : 'Move from the integrated operational picture into the Executive Control Tower for real-time situational control, multi-tower assurance, and predictive operational insights.'}
              </p>

              {/* Abstract Layered Control Tower Silhouette Preview */}
              <div className="landing-preview-silhouette" aria-hidden="true">
                <div className="landing-silhouette-card">
                  <div className="landing-silhouette-header">
                    <span className="landing-silhouette-dot" />
                    <span className="landing-silhouette-dot" />
                    <span className="landing-silhouette-dot" />
                    <span className="landing-silhouette-title">EXECUTIVE CONTROL TOWER • LIVE</span>
                  </div>
                  <div className="landing-silhouette-grid">
                    <div className="landing-silhouette-kpi">
                      <span className="kpi-label">SLA Assurance</span>
                      <span className="kpi-val" style={{ color: '#22A06B' }}>99.3%</span>
                      <span className="kpi-sub">Target 98.0%</span>
                    </div>
                    <div className="landing-silhouette-kpi">
                      <span className="kpi-label">Active Incidents</span>
                      <span className="kpi-val" style={{ color: '#074A76' }}>24 In-Flight</span>
                      <span className="kpi-sub">0 P1 Critical</span>
                    </div>
                    <div className="landing-silhouette-kpi">
                      <span className="kpi-label">Saudization Ratio</span>
                      <span className="kpi-val" style={{ color: '#671E75' }}>88.4%</span>
                      <span className="kpi-sub">Platinum Tier</span>
                    </div>
                    <div className="landing-silhouette-kpi">
                      <span className="kpi-label">Audit Controls</span>
                      <span className="kpi-val" style={{ color: '#40904F' }}>100% Valid</span>
                      <span className="kpi-sub">NCA Certified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Entry CTA */}
              <div className="landing-gateway-action">
                <button
                  className="landing-cta-primary large"
                  onClick={handleEnterPortal}
                  aria-label={isRtl ? 'الدخول إلى برج المراقبة والتحكم التنفيذي' : 'Enter the Executive Control Tower'}
                >
                  <span>
                    {isRtl ? 'الدخول إلى برج المراقبة والتحكم التنفيذي' : 'Enter the Executive Control Tower'}
                  </span>
                  {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. SIXTH SECTION: FINAL CTA ─────────────────────────────── */}
      <section className="landing-section landing-final-cta-section">
        <div className="landing-container landing-reveal">
          <h2 className="landing-final-headline">
            {isRtl ? 'رؤية تنفيذية واحدة.' : 'One Executive View.'}
            <br />
            <span className="landing-text-gradient">{isRtl ? 'بيئة تشغيلية موحدة.' : 'One Connected Environment.'}</span>
          </h2>
          <p className="landing-final-subtext">
            {isRtl
              ? 'المركز الوطني لنظم الموارد الحكومية — المنظومة التشغيلية المتكاملة لتقنية المعلومات.'
              : 'National Center for Government Resources — The Unified IT Management Environment.'}
          </p>

          <button
            className="landing-cta-primary"
            onClick={handleEnterPortal}
            aria-label={isRtl ? 'الدخول إلى برج المراقبة والتحكم التنفيذي' : 'Enter the Executive Control Tower'}
          >
            <span>
              {isRtl ? 'الدخول إلى برج المراقبة والتحكم التنفيذي' : 'Enter the Executive Control Tower'}
            </span>
            {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </section>

      {/* ─── 7. MINIMAL INSTITUTIONAL FOOTER ─────────────────────────── */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-inner">
            <div className="landing-footer-brand">
              <NCGRLogo height={28} variant="full" />
              <div className="landing-footer-copy">
                <span>{isRtl ? 'المركز الوطني لنظم الموارد الحكومية © 2026' : 'National Center for Government Resources (NCGR) © 2026'}</span>
                <span className="landing-footer-dot">•</span>
                <span>{isRtl ? 'بوابة إدارة تقنية المعلومات الموحدة' : 'Unified IT Management Portal'}</span>
              </div>
            </div>

            <div className="landing-footer-meta">
              <div className="landing-footer-badge">
                <ShieldCheck size={13} />
                <span>{isRtl ? 'طبقة التحقق والوصول المؤسسي' : 'Enterprise Access Assurance Layer'}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
