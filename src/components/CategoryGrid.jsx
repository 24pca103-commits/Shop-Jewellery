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
              <div className="category-card-inner">
                <div className="category-emoji">{cat.emoji}</div>
                <div className="category-shine" />
                <div className="category-info">
                  <h3 className="category-label">{cat.label}</h3>
                  <p className="category-desc">{cat.description}</p>
                  <span className="category-count">{cat.count} designs</span>
                </div>
                <div className="category-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
