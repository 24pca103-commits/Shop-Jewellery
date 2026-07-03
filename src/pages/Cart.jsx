import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import './Cart.css';

export default function Cart() {
  const { items, total, removeFromCart, updateQty } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart-page page-enter">
        <div className="container" style={{textAlign: 'center', padding: '100px 0'}}>
          <h1 className="section-title">Your Bag is Empty</h1>
          <p style={{marginBottom: 'var(--space-xl)', color: 'var(--charcoal-ghost)'}}>Looks like you haven't added anything to your bag yet.</p>
          <Link to="/catalog" className="btn btn-gold btn-lg">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page page-enter">
      <div className="container">
        <h1 className="section-title" style={{marginBottom: 'var(--space-2xl)'}}>Shopping Bag</h1>
        
        <div className="cart-layout">
          <div className="cart-main">
            <div className="cart-items-full">
              {items.map(item => (
                <div key={item.id} className="cart-item-full">
                  <img src={item.image} alt={item.name} className="cart-img-full" />
                  <div className="cart-info-full">
                    <h3 className="cart-name-full">{item.name}</h3>
                    <p className="cart-meta-full">{item.purity} {item.metal} • {item.weight}g</p>
                    <p className="cart-price-full">₹{item.price.toLocaleString('en-IN')}</p>
                    
                    <div className="cart-actions-full">
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeFromCart(item.id)}><Minus size={14}/></button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={14}/></button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}><Trash2 size={16}/> Remove</button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    ₹{(item.price * item.qty).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span style={{color: 'var(--success)'}}>Free</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <Link to="/checkout" className="btn btn-gold btn-lg w-full" style={{marginTop: 'var(--space-lg)'}}>
                Proceed to Checkout <ArrowRight size={18}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
