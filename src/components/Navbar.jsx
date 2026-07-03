import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, MapPin, Phone, X, Menu, TrendingUp, TrendingDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import { GOLD_RATE } from '../data/products';
import { CATEGORIES } from '../data/categories';
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
            <span>1800-102-9898</span>
            <span className="topbar-sep">|</span>
            <MapPin size={12} />
            <span className="topbar-link" style={{cursor: 'default'}}>Coimbatore, TN</span>
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
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-emblem">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" stroke="#8B5A2B" strokeWidth="4">
                <path d="M50 10 C 20 45, 15 70, 30 85 C 40 95, 60 95, 70 85 C 85 70, 80 45, 50 10 Z" fill="rgba(139, 90, 43, 0.05)" />
                <path d="M50 40 C 45 55, 30 60, 30 60 C 40 65, 50 60, 50 60 C 50 60, 60 65, 70 60 C 70 60, 55 55, 50 40 Z" fill="rgba(139, 90, 43, 0.4)" strokeWidth="2" />
                <path d="M50 60 L50 80" strokeWidth="3" />
                <circle cx="50" cy="85" r="3" fill="#8B5A2B" />
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-brand" style={{textTransform: 'uppercase', fontSize: '1.2rem', letterSpacing: '0.05em'}}>Kriyaalaya Jewellery</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            {navLinks.map(link => (
              <div key={link.label} className="nav-item"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link to={link.href} className="nav-link">{link.label}</Link>
                {link.hasDropdown && activeDropdown === link.label && (
                  <div className="nav-megamenu">
                    <div className="megamenu-grid">
                      {CATEGORIES.slice(0, 12).map(cat => (
                        <Link key={cat.id} to={`/catalog/${cat.id}`} className="megamenu-item" onClick={() => setActiveDropdown(null)}>
                          <span className="megamenu-emoji">{cat.emoji}</span>
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
              <Link key={cat.id} to={`/catalog/${cat.id}`} className="mobile-cat-link" onClick={() => setMobileOpen(false)}>
                <span>{cat.emoji}</span> {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
