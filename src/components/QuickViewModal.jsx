import { X, ShoppingBag, Heart, Shield, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import './QuickViewModal.css';

export default function QuickViewModal({ product, onClose, fromCategory }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useApp();

  if (!product) return null;

  const wished = isWishlisted(product.id);

  const handleCart = () => {
    addToCart(product);
    addToast(`${product.name} added to cart!`);
    onClose();
  };

  const handleWish = () => {
    toggleWishlist(product);
    addToast(wished ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-modal" onClick={e => e.stopPropagation()}>
        <button className="quickview-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="quickview-grid">
          <div className="quickview-img-wrap">
            <img src={product.image} alt={product.name} className="quickview-img" />
          </div>

          <div className="quickview-info">
            <div className="quickview-meta">
              <span className="badge badge-gold">{product.category}</span>
              <span className="quickview-purity">{product.purity} {product.metal}</span>
            </div>
            
            <h2 className="quickview-title">{product.name}</h2>
            
            <div className="quickview-price-row">
              <span className="quickview-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="quickview-tax">Inclusive of all taxes</span>
            </div>

            <div className="quickview-details">
              <div className="detail-item">
                <span className="detail-label">Weight</span>
                <span className="detail-val">{product.weight}g</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Making Charges</span>
                <span className="detail-val">₹{product.makingCharges?.toLocaleString('en-IN') || 'N/A'}</span>
              </div>
              {product.diamondWeight && (
                <div className="detail-item">
                  <span className="detail-label">Diamond</span>
                  <span className="detail-val">{product.diamondWeight} Carat</span>
                </div>
              )}
            </div>

            <div className="quickview-trust">
              <div className="trust-badge">
                <Shield size={14} /> BIS Hallmarked
              </div>
              <div className="trust-badge">
                <Award size={14} /> Lifetime Exchange
              </div>
            </div>

            <div className="quickview-actions">
              <button className="btn btn-gold flex-1" onClick={handleCart}>
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className={`btn ${wished ? 'btn-outline' : 'btn-ghost'}`} onClick={handleWish} style={{ width: '46px', height: '46px', padding: '0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: wished ? 'var(--gold)' : 'var(--charcoal-mid)', borderColor: wished ? 'var(--gold)' : 'rgba(0,0,0,0.1)' }} title="Add to Wishlist">
                <Heart size={18} fill={wished ? 'var(--gold)' : 'none'} />
              </button>
            </div>

            <div className="quickview-footer">
              <Link to={`/product/${product.id}`} state={{ fromCategory }} className="view-full-details">
                View Full Product Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
