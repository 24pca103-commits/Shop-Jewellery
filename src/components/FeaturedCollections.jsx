import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/categories';
import './FeaturedCollections.css';

export default function FeaturedCollections() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="section featured-section">
      <div className="container">
        <div className="featured-header">
          <div>
            <span className="eyebrow">Curated for You</span>
            <h2 className="section-title">Featured Collections</h2>
          </div>
          <div className="featured-controls">
            <button className="scroll-btn" onClick={() => scroll(-1)} aria-label="Prev">
              <ChevronLeft size={18} />
            </button>
            <button className="scroll-btn" onClick={() => scroll(1)} aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="featured-scroll" ref={scrollRef}>
          {COLLECTIONS.map((col, i) => (
            <Link key={col.id} to={`/catalog/${col.id}`} className="collection-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="collection-img-wrap">
                <img src={col.image} alt={col.label} className="collection-img" loading="lazy" />
                <div className="collection-overlay" />
              </div>
              <div className="collection-content">
                <h3 className="collection-name">{col.label}</h3>
                <span className="collection-cta">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
