import { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, Grid2X2, List, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, COLLECTIONS } from '../data/categories';
import './Catalog.css';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
];

const PRICE_RANGES = [
  { label: 'Under ₹25,000', min: 0, max: 25000 },
  { label: '₹25,000 – ₹75,000', min: 25000, max: 75000 },
  { label: '₹75,000 – ₹1.5L', min: 75000, max: 150000 },
  { label: '₹1.5L – ₹3L', min: 150000, max: 300000 },
  { label: 'Above ₹3L', min: 300000, max: Infinity },
];

export default function Catalog() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQ = searchParams.get('search') || '';

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState('newest');
  const [gridView, setGridView] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [filters, setFilters] = useState({ metals: [], occasions: [], priceRange: null, purity: [], stones: [] });

  useEffect(() => {
    setFilters({ metals: [], occasions: [], priceRange: null, purity: [], stones: [] });
  }, [category]);

  const toggleFilter = (key, val) => {
    setFilters(prev => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const products = useMemo(() => {
    let p = [...PRODUCTS];
    if (category) {
      const lowerCat = category.toLowerCase();
      const targetCat = lowerCat === 'wedding' ? 'bridal' : lowerCat;
      
      const isKnownCollection = COLLECTIONS.some(c => c.id === targetCat);
      const isKnownCategory = CATEGORIES.some(c => c.id === targetCat);
      
      if (isKnownCollection) {
        if (targetCat === 'featured') {
          p = p.filter(x => x.featured === true || (x.collection && x.collection.toLowerCase() === 'featured'));
        } else {
          p = p.filter(x => x.collection && x.collection.toLowerCase() === targetCat);
        }
      } else if (isKnownCategory) {
        p = p.filter(x => x.category && x.category.toLowerCase() === targetCat);
      } else {
        p = p.filter(x => 
          (x.category && x.category.toLowerCase() === targetCat) || 
          (x.collection && x.collection.toLowerCase() === targetCat) || 
          (x.metal && x.metal.toLowerCase() === targetCat) ||
          (x.stone && x.stone.toLowerCase() === targetCat)
        );
      }
    }
    if (searchQ) p = p.filter(x => x.name.toLowerCase().includes(searchQ.toLowerCase()) || x.category.includes(searchQ.toLowerCase()));
    if (filters.metals.length) p = p.filter(x => filters.metals.includes(x.metal));
    if (filters.occasions.length) p = p.filter(x => filters.occasions.includes(x.occasion));
    if (filters.priceRange) p = p.filter(x => x.price >= filters.priceRange.min && x.price <= filters.priceRange.max);
    if (filters.stones.length) p = p.filter(x => filters.stones.includes(x.stone));
    switch (sort) {
      case 'price_low': return p.sort((a, b) => a.price - b.price);
      case 'price_high': return p.sort((a, b) => b.price - a.price);
      case 'popular': return p.sort((a, b) => b.reviews - a.reviews);
      case 'rating': return p.sort((a, b) => b.rating - a.rating);
      default: return p.sort((a, b) => b.id - a.id);
    }
  }, [category, searchQ, filters, sort]);

  const targetCat = category?.toLowerCase() === 'wedding' ? 'bridal' : category?.toLowerCase();
  const catInfo = COLLECTIONS.find(c => c.id === targetCat) || CATEGORIES.find(c => c.id === targetCat);
  const pageTitle = catInfo?.label || (searchQ ? `Results for "${searchQ}"` : 'Collections');

  const filterSection = (title, key, options) => (
    <div className="filter-group">
      <h4 className="filter-group-title">{title}</h4>
      <div className="filter-options">
        {options.map(opt => (
          <label key={opt} className="filter-option">
            <input
              type="checkbox"
              checked={filters[key].includes(opt)}
              onChange={() => toggleFilter(key, opt)}
              className="filter-checkbox"
            />
            <span className="filter-option-label">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="catalog-page page-enter">
      {/* Header */}
      <div className="catalog-header" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${catInfo?.image || 'https://i.pinimg.com/564x/14/b0/1f/14b01f22b8e37b4ac4481def661e9f28.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}>
        <div className="container">
          <div className="catalog-breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            {category && <><Link to="/catalog">Collections</Link> <span>/</span></>}
            <span>{pageTitle}</span>
          </div>
          <h1 className="catalog-title">{pageTitle}</h1>
          {catInfo && <p className="catalog-subtitle">{catInfo.description} — {products.length} designs available</p>}
        </div>
      </div>

      <div className="container">
        <div className="catalog-layout">
          {/* Sidebar */}
          <aside className={`catalog-sidebar ${filtersOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <SlidersHorizontal size={16} /> Filters
              </h3>
              <button className="sidebar-close" onClick={() => setFiltersOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {filters.metals.length + filters.occasions.length + (filters.priceRange ? 1 : 0) > 0 && (
              <button className="clear-filters" onClick={() => setFilters({ metals: [], occasions: [], priceRange: null, purity: [], stones: [] })}>
                Clear All Filters ×
              </button>
            )}

            {/* Price Range */}
            <div className="filter-group">
              <h4 className="filter-group-title">Price Range</h4>
              <div className="filter-options">
                {PRICE_RANGES.map(r => (
                  <label key={r.label} className="filter-option">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange?.label === r.label}
                      onChange={() => setFilters(prev => ({ ...prev, priceRange: filters.priceRange?.label === r.label ? null : r }))}
                      className="filter-checkbox"
                    />
                    <span className="filter-option-label">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {filterSection('Metal', 'metals', ['gold', 'silver', 'platinum'])}
            {filterSection('Occasion', 'occasions', ['wedding', 'daily', 'office', 'party', 'festival', 'gifting'])}
            {filterSection('Stone Type', 'stones', ['diamond', 'ruby', 'emerald', 'kundan', 'polki', 'meenakari'])}
          </aside>

          {/* Main */}
          <div className="catalog-main">
            <div className="catalog-toolbar">
              <span className="catalog-count">{products.length} designs found</span>
              <div className="catalog-controls">
                <div className="sort-select-wrap">
                  <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown size={14} className="sort-icon" />
                </div>
                <div className="view-toggles">
                  <button className={`view-btn ${gridView ? 'active' : ''}`} onClick={() => setGridView(true)}><Grid2X2 size={16} /></button>
                  <button className={`view-btn ${!gridView ? 'active' : ''}`} onClick={() => setGridView(false)}><List size={16} /></button>
                </div>
                <button className="filter-toggle-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
                  <SlidersHorizontal size={16} /> Filters
                </button>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="catalog-empty">
                <div className="empty-icon">💍</div>
                <h3>No jewellery found</h3>
                <p>Try adjusting your filters or search for something else</p>
                <button className="btn btn-gold" onClick={() => setFilters({ metals: [], occasions: [], priceRange: null, purity: [], stones: [] })}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`catalog-products ${gridView ? 'grid-view' : 'list-view'}`}>
                {products.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuickView} fromCategory={category} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} fromCategory={category} />}
    </div>
  );
}
