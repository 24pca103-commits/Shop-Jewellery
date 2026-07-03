import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import './CategoryGrid.css';

export default function CategoryGrid() {
  return (
    <section className="section category-section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Shop by Category</span>
          <h2 className="section-title">Explore Our Collections</h2>
          <div className="gold-line gold-line-center" style={{marginTop: '12px'}} />
        </div>
        <div className="category-grid">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/catalog/${cat.id}`}
              className="category-card"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="category-card-img-wrap">
                <img src={cat.image} alt={cat.label} className="category-card-img" loading="lazy" />
                <div className="category-card-overlay"></div>
              </div>
              <div className="category-card-content">
                <h3 className="category-card-title">{cat.label}</h3>
                <span className="category-card-link">Explore <span style={{marginLeft:'4px'}}>→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
