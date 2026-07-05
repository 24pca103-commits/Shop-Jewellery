import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Gift, Star, ArrowRight, Shield, Award } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedCollections from '../components/FeaturedCollections';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { PRODUCTS, GOLD_RATE } from '../data/products';
import './Home.css';

const TABS = ['New Arrivals', 'Best Sellers', 'Trending', 'Limited Edition'];
const filterMap = {
  'New Arrivals': p => p.badge === 'New' || p.id <= 8,
  'Best Sellers': p => p.badge === 'Best Seller' || p.reviews > 200,
  'Trending': p => p.rating >= 4.8,
  'Limited Edition': p => p.badge === 'Limited' || p.badge === 'Premium',
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('New Arrivals');
  const [quickView, setQuickView] = useState(null);

  const filtered = PRODUCTS.filter(filterMap[activeTab] || (() => true)).slice(0, 8);

  return (
    <main className="page-enter">
      <HeroSlider />

      {/* Gold Rate Banner */}
      <div className="gold-rate-banner">
        <div className="container">
          <div className="gold-rate-inner">
            <div className="gold-rate-label">
              <TrendingUp size={14} />
              <span>Today's Gold Rate</span>
            </div>
            {[['24K', GOLD_RATE['24K']], ['22K', GOLD_RATE['22K']], ['18K', GOLD_RATE['18K']]].map(([k, v]) => (
              <div key={k} className="gold-rate-item">
                <span className="gold-rate-purity">{k}</span>
                <span className="gold-rate-price">₹{v.toLocaleString()}/g</span>
              </div>
            ))}
            <div className={`gold-rate-change ${GOLD_RATE.trend}`}>
              {GOLD_RATE.change} today
            </div>
            <Link to="/gold-scheme" className="gold-rate-cta">
              Start Gold Scheme <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <CategoryGrid />

      <FeaturedCollections />

      {/* Product Showcase */}
      <section className="section product-showcase">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Handpicked for You</span>
            <h2 className="section-title">Exquisite Jewellery</h2>
            <div className="gold-line gold-line-center" style={{marginTop:'12px'}} />
          </div>
          {/* Tabs */}
          <div className="product-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`product-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >{tab}</button>
            ))}
          </div>
          {/* Grid */}
          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
          <div className="showcase-cta">
            <Link to="/catalog" className="btn btn-gold btn-lg">
              View All Collections <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Jewellery Shop */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="section-title">The Jewellery Shop Promise</h2>
          </div>
          <div className="why-grid">
            {[
              { icon: Shield, title: 'BIS Hallmarked', desc: 'Every piece certified by Bureau of Indian Standards for guaranteed gold purity.' },
              { icon: Award, title: 'GIA Diamonds', desc: 'All diamonds come with GIA/IGI certification for complete transparency.' },
              { icon: Star, title: '4.9★ Rated', desc: 'Over 5 lakh satisfied customers across India trust Jewellery Shop.' },
              { icon: Gift, title: 'Lifetime Exchange', desc: 'Exchange your jewellery at current gold value — no questions asked.' },
              { icon: Sparkles, title: 'Master Craftsmen', desc: 'Handcrafted by skilled artisans with decades of jewellery-making expertise.' },
              { icon: TrendingUp, title: 'Best Gold Rate', desc: 'Transparent pricing with live gold rates. No hidden charges, ever.' },
            ].map(item => (
              <div key={item.title} className="why-card">
                <div className="why-icon-wrap">
                  <item.icon size={24} />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Gold Scheme Teaser */}
      <section className="section gold-scheme-teaser">
        <div className="container">
          <div className="scheme-teaser-inner">
            <div className="scheme-teaser-content">
              <span className="eyebrow">Save Smarter</span>
              <h2 className="section-title">Gold Saving Scheme</h2>
              <p style={{color:'var(--charcoal-light)',marginBottom:'var(--space-lg)'}}>
                Save monthly in gold and get a bonus on completion. The smartest way to invest for your daughter's wedding or your dream jewellery purchase.
              </p>
              <div className="scheme-benefits">
                {['Up to 5% bonus on maturity', 'Start from ₹1,000/month', 'Buy jewellery at best rates', 'No processing fee'].map(b => (
                  <div key={b} className="scheme-benefit">
                    <span className="scheme-benefit-dot" /> {b}
                  </div>
                ))}
              </div>
              <Link to="/gold-scheme" className="btn btn-gold" style={{marginTop:'var(--space-md)'}}>
                Join the Scheme
              </Link>
            </div>
            <div className="scheme-teaser-stats">
              {[['₹500Cr+', 'Total Savings'], ['2.8L+', 'Active Members'], ['5%', 'Bonus on Maturity'], ['50+', 'Stores Across India']].map(([v, l]) => (
                <div key={l} className="stat-card">
                  <span className="stat-value">{v}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Customer Stories</span>
            <h2 className="section-title">Words of Love</h2>
            <div className="gold-line gold-line-center" style={{marginTop:'12px'}} />
          </div>
          <div className="testimonials-grid">
            {[
              { name: 'Priya Sharma', location: 'Hyderabad', text: 'Bought my bridal set from Jewellery Shop and it was absolutely breathtaking. The quality and craftsmanship are unmatched. Got so many compliments at my wedding!', rating: 5, occasion: 'Wedding Jewellery' },
              { name: 'Sneha Reddy', location: 'Bangalore', text: 'The diamond mangalsutra I bought is stunning. The hallmarking certificate gave us so much confidence. Will definitely shop again for all my jewellery needs.', rating: 5, occasion: 'Mangalsutra' },
              { name: 'Kavitha Iyer', location: 'Chennai', text: 'Virtual try-on feature is a game changer! Tried multiple necklaces from home and chose the perfect one. Delivery was also super fast and beautifully packed.', rating: 5, occasion: 'Diamond Necklace' },
            ].map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#8B5A2B" color="#8B5A2B" />)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-location">{t.location} · {t.occasion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </main>
  );
}
