import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const SLIDES = [
  {
    id: 1,
    badge: 'New Bridal Collection 2025',
    title: 'Where Every Jewel\nTells a Story',
    subtitle: 'Exquisite gold, diamond & bridal jewellery crafted for India\'s most precious moments.',
    cta1: { label: 'Shop Bridal', href: '/catalog/bridal' },
    cta2: { label: 'Explore Diamonds', href: '/catalog/diamond' },
    bg: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1600&q=85',
    accent: '#8B5A2B',
    align: 'left',
  },
  {
    id: 2,
    badge: 'Diamond Jewellery',
    title: 'Diamonds That\nCapture Eternity',
    subtitle: 'Certified solitaires, tennis bracelets & statement pieces that define luxury.',
    cta1: { label: 'Shop Diamonds', href: '/catalog/diamond' },
    cta2: { label: 'View Collection', href: '/catalog' },
    bg: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=1600&q=85',
    accent: '#7BA3C8',
    align: 'center',
  },
  {
    id: 3,
    badge: 'Temple Jewellery',
    title: 'Heritage Crafted\nWith Devotion',
    subtitle: 'Ancient temple art traditions woven into breathtaking gold jewellery.',
    cta1: { label: 'Shop Temple', href: '/catalog/temple' },
    cta2: { label: 'Antique Collection', href: '/catalog/antique' },
    bg: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=85',
    accent: '#8B5A2B',
    align: 'left',
  },
  {
    id: 4,
    badge: 'Gold Investment',
    title: 'Pure 24K Gold\nFor Every Occasion',
    subtitle: 'BIS hallmarked coins, bars & gifting solutions — invest in timeless gold.',
    cta1: { label: 'Shop Gold', href: '/catalog/coins' },
    cta2: { label: 'Gold Scheme', href: '/gold-scheme' },
    bg: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=1600&q=85',
    accent: '#8B5A2B',
    align: 'right',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((idx + SLIDES.length) % SLIDES.length);
      setAnimating(false);
    }, 200);
  };

  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="hero">
      {/* Background */}
      <div className={`hero-bg ${animating ? 'fading' : ''}`}>
        <img src={slide.bg} alt={slide.title} />
        <div className="hero-overlay" />
        <div className="hero-grain" />
      </div>

      {/* Floating Particles */}
      <div className="hero-particles">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div className={`hero-content hero-align-${slide.align} ${animating ? 'hero-exit' : 'hero-enter'}`}>
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {slide.badge}
        </div>
        <h1 className="hero-title">
          {slide.title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className="hero-subtitle">{slide.subtitle}</p>
        <div className="hero-ctas">
          <Link to={slide.cta1.href} className="btn btn-gold btn-lg hero-cta">{slide.cta1.label}</Link>
          <Link to={slide.cta2.href} className="btn btn-ghost btn-lg hero-cta">{slide.cta2.label}</Link>
        </div>

        {/* Quick Category Pills */}
        <div className="hero-quick-links">
          {['Rings', 'Necklace', 'Bangles', 'Earrings'].map(cat => (
            <Link key={cat} to={`/catalog/${cat.toLowerCase()}`} className="hero-quick-pill">{cat}</Link>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button className="hero-arrow hero-arrow-left" onClick={prev} aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={next} aria-label="Next">
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Slide ${i+1}`} />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
