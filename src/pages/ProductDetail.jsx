import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, Star, Shield, Award, PlayCircle, Maximize2, Zap, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, COLLECTIONS } from '../data/categories';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const collectionData = product ? COLLECTIONS.find(c => c.id === product.collection) : null;
  const categoryData = product ? CATEGORIES.find(c => c.id === product.category) : null;
  const breadcrumbPath = collectionData ? `/catalog/${product.collection}` : `/catalog/${product.category}`;
  const breadcrumbLabel = collectionData ? collectionData.label : (categoryData ? categoryData.label : product.category);

  const [activeImg, setActiveImg] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useApp();
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, show: false });
  const [selectedSize, setSelectedSize] = useState('14');
  const [selectedSizeMen, setSelectedSizeMen] = useState('18');
  const [selectedSizeWomen, setSelectedSizeWomen] = useState('12');

  if (!product) {
    return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}>Product not found</div>;
  }

  const wished = isWishlisted(product.id);
  const images = product.images || [product.image];

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this beautiful ${product.name} at Thodoo!`,
        url: window.location.href,
      }).catch((err) => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard! 🔗', 'success');
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomPos({ x: 50, y: 50, show: false });
  };

  const handleCart = () => {
    addToCart(product);
    addToast(`${product.name} added to cart! 🛍️`);
  };

  const handleWish = () => {
    toggleWishlist(product);
    addToast(wished ? 'Removed from wishlist' : 'Added to wishlist ❤️', wished ? 'info' : 'success');
  };

  return (
    <main className="product-detail-page page-enter">
      <div className="container">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/catalog">Collections</Link> <span>/</span>
          <Link to={breadcrumbPath}>{breadcrumbLabel}</Link> <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchStart={handleTouchMove}
              onTouchEnd={handleMouseLeave}
              style={{ cursor: 'zoom-in', overflow: 'hidden', touchAction: 'none' }}
            >
              {activeImg === 'video' && product.video ? (
                <video src={product.video} controls autoPlay loop className="gallery-main-img" style={{ backgroundColor: '#000' }} />
              ) : (
                <img 
                  src={images[activeImg]} 
                  alt={product.name} 
                  className="gallery-main-img" 
                  style={{ 
                    transform: zoomPos.show ? 'scale(2.5)' : 'scale(1)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: zoomPos.show ? 'none' : 'transform 0.3s ease, transform-origin 0.3s ease'
                  }} 
                />
              )}
            </div>
            {(images.length > 1 || product.video) && (
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <button key={i} className={`gallery-thumb ${i === activeImg ? 'active' : ''}`} onClick={() => { setActiveImg(i); }}>
                    <img src={img} alt={`Thumb ${i+1}`} />
                  </button>
                ))}
                {product.video && (
                  <button className={`gallery-thumb video-thumb ${activeImg === 'video' ? 'active' : ''}`} onClick={() => { setActiveImg('video'); }}>
                    <PlayCircle size={24} />
                    <span>Video</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-info-block">
            <div className="meta-row">
              <span className="badge badge-gold">{product.category}</span>
              <span className="sku">SKU: VJ{product.id}982</span>
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="review-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#8B5A2B' : 'none'} color="#8B5A2B" />)}
              </div>
              <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="price-block">
              <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="tax-info">Inclusive of all taxes</span>
            </div>

            <div className="product-description" style={{ fontSize: '0.9rem', color: 'var(--charcoal-mid)', margin: '16px 0', lineHeight: 1.6 }}>
              {product.description || "A beautifully crafted piece of jewellery designed to elevate your style. Perfect for special occasions and everyday elegance."}
            </div>

            {(['rings', 'chains', 'bangles', 'bracelets', 'kada'].includes(product.category.toLowerCase()) || product.name.toLowerCase().includes('band') || product.name.toLowerCase().includes('ring')) && (
              <div className="size-selector">
                {product.name.toLowerCase().includes('couple') ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)' }}>Select Men's Size</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline' }}>Size Guide</span>
                    </div>
                    <div className="size-options" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {['16', '18', '20', '22'].map(size => (
                        <button 
                          key={`men-${size}`}
                          className={`size-btn ${selectedSizeMen === size ? 'active' : ''}`}
                          onClick={() => setSelectedSizeMen(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)' }}>Select Women's Size</span>
                    </div>
                    <div className="size-options" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {['10', '12', '14', '16'].map(size => (
                        <button 
                          key={`women-${size}`}
                          className={`size-btn ${selectedSizeWomen === size ? 'active' : ''}`}
                          onClick={() => setSelectedSizeWomen(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)' }}>Select Size</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gold)', cursor: 'pointer', textDecoration: 'underline' }}>Size Guide</span>
                    </div>
                    <div className="size-options" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {['10', '12', '14', '16'].map(size => (
                        <button 
                          key={size}
                          className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="action-buttons">
              <button className="btn btn-gold btn-lg flex-1" onClick={handleCart}>
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button className={`btn btn-lg btn-icon ${wished ? 'btn-outline' : 'btn-ghost'}`} onClick={handleWish} style={{ width: '54px', height: '54px', padding: '0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: wished ? 'var(--gold)' : 'var(--charcoal-mid)', borderColor: wished ? 'var(--gold)' : 'rgba(0,0,0,0.1)' }} title="Add to Wishlist">
                <Heart size={20} fill={wished ? 'var(--gold)' : 'none'} />
              </button>
              <button className="btn btn-lg btn-icon btn-ghost" onClick={handleShare} style={{ width: '54px', height: '54px', padding: '0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal-mid)', borderColor: 'rgba(0,0,0,0.1)' }} title="Share">
                <Share2 size={20} />
              </button>
            </div>

            <div className="secondary-actions">
              <button className="btn btn-outline flex-1">
                Book Video Consultation
              </button>
            </div>

            <div className="trust-badges">
              <div className="trust-badge">
                <Shield size={18} />
                <span>BIS Hallmarked Gold</span>
              </div>
              {product.diamondWeight && (
                <div className="trust-badge">
                  <Award size={18} />
                  <span>GIA Certified Diamonds</span>
                </div>
              )}
              <div className="trust-badge">
                <RotateCcw size={18} />
                <span>Lifetime Exchange</span>
              </div>
            </div>

            <div className="product-specs">
              <h3 className="specs-title">Product Details</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Metal</span>
                  <span className="spec-val">{product.metal}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Purity</span>
                  <span className="spec-val">{product.purity}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Gross Weight</span>
                  <span className="spec-val">{product.weight}g</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Making Charges</span>
                  <span className="spec-val">₹{product.makingCharges?.toLocaleString('en-IN') || 'N/A'}</span>
                </div>
                {product.diamondWeight && (
                  <div className="spec-item">
                    <span className="spec-label">Diamond Weight</span>
                    <span className="spec-val">{product.diamondWeight} Carat</span>
                  </div>
                )}
                {product.stone && (
                  <div className="spec-item">
                    <span className="spec-label">Stone Type</span>
                    <span className="spec-val" style={{textTransform: 'capitalize'}}>{product.stone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const Sparkles = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </svg>
);
