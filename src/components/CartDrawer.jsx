import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, total, removeFromCart, updateQty } = useCart();
  const { cartOpen, setCartOpen } = useApp();

  return (
    <>
      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)} />}
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3 className="cart-title">
            <ShoppingBag size={18} /> Shopping Bag ({items.length})
          </h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <h4>Your bag is empty</h4>
              <p>Add some precious pieces to get started</p>
              <Link to="/catalog" className="btn btn-gold btn-sm" onClick={() => setCartOpen(false)}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <Link to={`/product/${item.id}`} className="cart-item-img-wrap" onClick={() => setCartOpen(false)}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </Link>
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-meta">{item.purity} • {item.weight}g</p>
                    <div className="cart-item-row">
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeFromCart(item.id)}>
                          <Minus size={12} />
                        </button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary-row">
                <span>Making Charges</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}+</span>
              </div>
            </div>
            <Link to="/checkout" className="btn btn-gold w-full" onClick={() => setCartOpen(false)}>
              Proceed to Checkout
            </Link>
            <Link to="/cart" className="btn btn-outline w-full" style={{ marginTop: '8px' }} onClick={() => setCartOpen(false)}>
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
