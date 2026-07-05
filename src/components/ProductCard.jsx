import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

export default function ProductCard({ product, onQuickView }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useApp();
  const wished = isWishlisted(product.id);

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast(`${product.name} added to cart! 🛍️`);
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(wished ? 'Removed from wishlist' : `Added to wishlist ❤️`, wished ? 'info' : 'success');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {/* Image */}
      <div className="product-image-wrap">
        {!imgLoaded && <div className="skeleton product-img-skeleton" />}
        <img
          src={product.image}
          alt={product.name}
          className={`product-img ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        {/* Badges */}
        <div className="product-badges">
          {product.badge && (
            <span className={`product-badge ${product.badge === 'Best Seller' ? 'badge-gold' : product.badge === 'New' ? 'badge-new' : product.badge === 'Limited' ? 'badge-sale' : 'badge-gold'}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Side Actions (Wishlist & View) */}
        <div className="product-actions-side">
          <button className="card-btn-icon" onClick={handleWish} aria-label="Wishlist" title="Add to Wishlist">
            <Heart size={16} fill={wished ? 'var(--gold)' : 'none'} color={wished ? 'var(--gold)' : 'var(--charcoal-mid)'} />
          </button>
          <button className="card-btn-icon" onClick={handleQuickView} aria-label="Quick View" title="Quick View">
            <Eye size={16} color="var(--charcoal-mid)" />
          </button>
        </div>

        {/* Quick Add Bottom Bar */}
        <div className="product-quick-add">
          <button className="quick-add-btn" onClick={handleCart}>
            <ShoppingBag size={15} /> Add to Cart
          </button>
        </div>

        {/* Sparkles overlay */}
        <div className="card-sparkles">
          <span className="sparkle s1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
          </span>
          <span className="sparkle s2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--gold-light)" stroke="var(--gold-light)" strokeWidth="1"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
          </span>
          <span className="sparkle s3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
          </span>
          <span className="sparkle s4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold-light)" stroke="var(--gold-light)" strokeWidth="1"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating-minimal">
            <Star size={11} fill="#8B5A2B" color="#8B5A2B" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="product-name">{product.name}</h3>

        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
        </div>

        <div className="product-details-sub">
          <span>{product.purity} {product.metal}</span>
          <span>•</span>
          <span>{product.weight}g</span>
        </div>
      </div>
    </Link>
  );
}
