import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Zap, Award } from 'lucide-react';
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
    addToCart(product);
    addToast(`${product.name} added to cart! 🛍️`);
  };

  const handleWish = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    addToast(wished ? 'Removed from wishlist' : `Added to wishlist ❤️`, wished ? 'info' : 'success');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    onQuickView?.(product);
  };

  const goldRate = 5890;
  const goldValue = Math.round(product.weight * goldRate);

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
          {product.emi && <span className="product-emi-badge">EMI</span>}
        </div>
        {/* Actions overlay */}
        <div className="product-actions">
          <button className="product-action-btn" onClick={handleWish} aria-label="Wishlist" title="Add to Wishlist">
            <Heart size={16} fill={wished ? '#8B5A2B' : 'none'} color={wished ? '#8B5A2B' : 'currentColor'} />
          </button>
          <button className="product-action-btn" onClick={handleQuickView} aria-label="Quick View" title="Quick View">
            <Eye size={16} />
          </button>
          <button className="product-action-btn" onClick={handleCart} aria-label="Add to Cart" title="Add to Cart">
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-purity">{product.purity} {product.metal}</span>
        </div>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill={i < Math.floor(product.rating) ? '#8B5A2B' : 'none'} color="#8B5A2B" />
            ))}
          </div>
          <span className="rating-val">{product.rating}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.diamondWeight && (
            <span className="product-diamond">
              <Zap size={11} /> {product.diamondWeight}ct
            </span>
          )}
        </div>

        <div className="product-details-row">
          <span className="product-weight">
            <Award size={11} /> {product.weight}g
          </span>
          <span className="product-gold-val">Gold value ₹{goldValue.toLocaleString('en-IN')}</span>
        </div>

        <button className="product-cart-btn" onClick={handleCart}>
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
