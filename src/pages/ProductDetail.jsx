import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, Star, Shield, Award, PlayCircle, Maximize2, Zap, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useApp();

  if (!product) {
    return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}>Product not found</div>;
  }

  const wished = isWishlisted(product.id);
  const images = product.images || [product.image];

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
          <Link to="/catalog">Jewellery</Link> <span>/</span>
          <Link to={`/catalog/${product.category}`}>{product.category}</Link> <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main">
              {activeImg === 'video' && product.video ? (
                <video src={product.video} controls autoPlay loop className="gallery-main-img" style={{ backgroundColor: '#000' }} />
              ) : (
                <img src={images[activeImg]} alt={product.name} className="gallery-main-img" />
              )}
              <button className="gallery-action-btn view-360-btn" title="360 View">
                <RotateCcw size={16} /> 360° View
              </button>
              <button className="gallery-action-btn view-zoom-btn" title="Zoom">
                <Maximize2 size={16} />
              </button>
            </div>
            {(images.length > 1 || product.video) && (
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <button key={i} className={`gallery-thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={img} alt={`Thumb ${i+1}`} />
                  </button>
                ))}
                {product.video && (
                  <button className={`gallery-thumb video-thumb ${activeImg === 'video' ? 'active' : ''}`} onClick={() => setActiveImg('video')}>
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

            <div className="action-buttons">
              <button className="btn btn-gold btn-lg flex-1" onClick={handleCart}>
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button className={`btn btn-lg btn-icon ${wished ? 'btn-outline' : 'btn-ghost'}`} onClick={handleWish} style={{ width: '54px', height: '54px', padding: '0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: wished ? 'var(--gold)' : 'var(--charcoal-mid)', borderColor: wished ? 'var(--gold)' : 'rgba(0,0,0,0.1)' }} title="Add to Wishlist">
                <Heart size={20} fill={wished ? 'var(--gold)' : 'none'} />
              </button>
              <button className="btn btn-lg btn-icon btn-ghost" style={{ width: '54px', height: '54px', padding: '0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal-mid)', borderColor: 'rgba(0,0,0,0.1)' }} title="Share">
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

            {/* EMI Banner */}
            {product.emi && (
              <div className="emi-banner">
                <div className="emi-icon"><Zap size={20} color="var(--gold-dark)" /></div>
                <div className="emi-info">
                  <h4>EMI Options Available</h4>
                  <p>Starting from ₹{(product.price / 12).toFixed(0).toLocaleString('en-IN')}/month. View options at checkout.</p>
                </div>
              </div>
            )}
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
