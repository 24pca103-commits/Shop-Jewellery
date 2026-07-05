import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, MapPin, Phone, X, Menu, TrendingUp, TrendingDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import { GOLD_RATE } from '../data/products';
import { CATEGORIES } from '../data/categories';
import logoImg from '../assets/image.png';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { searchOpen, setSearchOpen, setCartOpen } = useApp();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/', dropdown: null },
    { label: 'Gold', href: '/catalog/gold', dropdown: null },
    { label: 'Diamond', href: '/catalog/diamond', dropdown: null },
    { label: 'Bridal', href: '/catalog/bridal', dropdown: null },
    { label: 'Collections', href: '/catalog', hasDropdown: true },
    { label: 'Gold Scheme', href: '/gold-scheme', dropdown: null },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="navbar-topbar">
        <div className="navbar-topbar-inner">
          <div className="flex items-center gap-md">
            <Phone size={12} />
            <span>+91 98765 43210</span>
            <span className="topbar-sep">|</span>
            <MapPin size={12} />
            <span className="topbar-link" style={{ cursor: 'default' }}>Bengaluru, KA</span>
          </div>
          <div className="gold-ticker">
            <span className="ticker-label">Live Gold Rate:</span>
            {Object.entries(GOLD_RATE).filter(([k]) => ['24K', '22K', '18K'].includes(k)).map(([k, v]) => (
              <span key={k} className="ticker-item">
                <span className="ticker-purity">{k}</span>
                <span className="ticker-price">₹{v.toLocaleString()}/g</span>
              </span>
            ))}
            <span className={`ticker-change ${GOLD_RATE.trend === 'up' ? 'up' : 'down'}`}>
              {GOLD_RATE.trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {GOLD_RATE.change}
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" style={{ padding: '2px 0', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Thodoo" style={{ height: '54px', objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '900', color: '#FFD700', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Thodoo</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.65rem', fontWeight: '800', color: '#FFE566', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '2px', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Jewellery</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            {navLinks.map(link => (
              <div key={link.label} className="nav-item"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link 
                  to={link.href} 
                  className="nav-link"
                  onClick={(e) => {
                    if (link.hasDropdown) {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === link.label ? null : link.label);
                    }
                  }}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && activeDropdown === link.label && (
                  <div className="nav-megamenu">
                    <div className="megamenu-grid">
                      {CATEGORIES.slice(0, 12).map(cat => (
                        <Link key={cat.id} to={`/catalog/${cat.id}`} className="megamenu-item" onClick={() => setActiveDropdown(null)}>
                          <img src={cat.image} alt={cat.label} className="megamenu-img" />
                          <span>{cat.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button className="nav-action-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/account" className="nav-action-btn" aria-label="Account">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="nav-action-btn has-badge" aria-label="Wishlist">
              <Heart size={20} />
              {wishCount > 0 && <span className="nav-badge">{wishCount}</span>}
            </Link>
            <button className="nav-action-btn has-badge cart-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </button>
            <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}>
          <div className="search-box">
            <form onSubmit={handleSearch} className="search-form">
              <Search size={20} className="search-icon" />
              <input
                ref={searchRef}
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search gold rings, diamond necklace, bridal sets…"
                className="search-input"
              />
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
                <X size={20} />
              </button>
            </form>
            <div className="search-suggestions">
              {['Bridal Necklace', 'Diamond Rings', 'Gold Bangles', 'Mangalsutra', 'Jhumka Earrings'].map(s => (
                <button key={s} className="suggestion-pill" onClick={() => { navigate(`/catalog?search=${s}`); setSearchOpen(false); }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <span className="mobile-title">Menu</span>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <div className="mobile-menu-inner">
          {navLinks.map(link => (
            <Link key={link.label} to={link.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="mobile-divider" />
          <div className="mobile-categories">
            {CATEGORIES.slice(0, 8).map(cat => (
              <Link key={cat.id} to={`/catalog/${cat.id}`} className="mobile-cat-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setMobileOpen(false)}>
                <img src={cat.image} alt={cat.label} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
