import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, MapPin, Phone, X, Menu, TrendingUp, TrendingDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import { GOLD_RATE } from '../data/products';
import { CATEGORIES, COLLECTIONS } from '../data/categories';
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
            <span>+91 93854 11051</span>
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
            <img src="/logo-transparent.png" alt="Thodoo" className="navbar-logo-img" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            {navLinks.map(link => (
              <div key={link.label} className="nav-item"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link to={link.href} className="nav-link">
                  {link.label}
                </Link>
                {link.hasDropdown && activeDropdown === link.label && (
                  <div className="nav-megamenu" style={{ width: '560px', left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '8px', paddingLeft: '8px', borderLeft: '2px solid var(--gold)' }}>Categories</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px' }}>
                          {CATEGORIES.slice(0, 9).map(cat => (
                            <Link key={cat.id} to={`/catalog/${cat.id}`} className="megamenu-item" onClick={() => setActiveDropdown(null)}>
                              <img src={cat.image} alt={cat.label} className="megamenu-img" />
                              <span>{cat.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: '8px', paddingLeft: '8px', borderLeft: '2px solid var(--gold)' }}>Collections</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px' }}>
                          {COLLECTIONS.map(col => (
                            <Link key={col.id} to={`/catalog/${col.id}`} className="megamenu-item" onClick={() => setActiveDropdown(null)}>
                              <img src={col.image} alt={col.label} className="megamenu-img" />
                              <span>{col.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
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
          <div className="mobile-categories" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold-dark)', margin: '8px 0 4px 4px' }}>Categories</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {CATEGORIES.slice(0, 8).map(cat => (
                <Link key={cat.id} to={`/catalog/${cat.id}`} className="mobile-cat-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setMobileOpen(false)}>
                  <img src={cat.image} alt={cat.label} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>
            <div className="mobile-divider" style={{ margin: '4px 0' }} />
            <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold-dark)', margin: '4px 0 4px 4px' }}>Collections</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {COLLECTIONS.map(col => (
                <Link key={col.id} to={`/catalog/${col.id}`} className="mobile-cat-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setMobileOpen(false)}>
                  <img src={col.image} alt={col.label} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span>{col.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
