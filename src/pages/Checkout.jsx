import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Lock } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      clearCart();
      alert('Order Placed Successfully! Your invoice has been sent to your email.');
      navigate('/');
    }
  };

  if (items.length === 0) return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}>Your cart is empty. <Link to="/catalog">Continue Shopping</Link></div>;

  return (
    <main className="checkout-page page-enter">
      <div className="container">
        <div className="checkout-header">
          <Link to="/" className="checkout-logo">
            <span style={{fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600}}>Vaibhav Jewels</span>
          </Link>
          <div className="secure-badge"><Lock size={14}/> Secure Checkout</div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            <div className="checkout-steps">
              <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
              <div className="step-line" />
              <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
              <div className="step-line" />
              <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3. Review</div>
            </div>

            <form onSubmit={handleCheckout} className="checkout-form">
              {step === 1 && (
                <div className="form-section">
                  <h2>Shipping Information</h2>
                  <div className="form-grid">
                    <input type="text" placeholder="First Name" required className="input" />
                    <input type="text" placeholder="Last Name" required className="input" />
                    <input type="email" placeholder="Email Address" required className="input" style={{gridColumn: '1 / -1'}} />
                    <input type="text" placeholder="Address Line 1" required className="input" style={{gridColumn: '1 / -1'}} />
                    <input type="text" placeholder="City" required className="input" />
                    <input type="text" placeholder="State" required className="input" />
                    <input type="text" placeholder="PIN Code" required className="input" />
                    <input type="tel" placeholder="Phone Number" required className="input" />
                  </div>
                  <button type="submit" className="btn btn-dark mt-lg">Continue to Payment</button>
                </div>
              )}

              {step === 2 && (
                <div className="form-section">
                  <h2>Payment Method</h2>
                  <div className="payment-options">
                    {['Credit / Debit Card', 'UPI / QR', 'Net Banking', 'EMI Options'].map((opt, i) => (
                      <label key={opt} className="payment-option">
                        <input type="radio" name="payment" defaultChecked={i===0} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  <div className="form-grid" style={{marginTop: 'var(--space-md)'}}>
                    <input type="text" placeholder="Card Number" className="input" style={{gridColumn: '1 / -1'}} />
                    <input type="text" placeholder="MM/YY" className="input" />
                    <input type="text" placeholder="CVV" className="input" />
                  </div>
                  <div className="form-actions mt-lg">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                    <button type="submit" className="btn btn-dark">Review Order</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-section">
                  <h2>Review Your Order</h2>
                  <div className="review-block">
                    <h4>Shipping To:</h4>
                    <p>John Doe<br/>123 Luxury Lane, Jubilee Hills<br/>Hyderabad, Telangana 500033</p>
                  </div>
                  <div className="review-block">
                    <h4>Payment Method:</h4>
                    <p>Credit Card ending in 4242</p>
                  </div>
                  <div className="form-actions mt-lg">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                    <button type="submit" className="btn btn-gold">Place Order (₹{total.toLocaleString('en-IN')})</button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary-box">
              <h3>Order Summary ({items.length} Items)</h3>
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="summary-item-info">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.qty}</p>
                      <p className="summary-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="trust-badges-checkout">
                <ShieldCheck size={18} color="var(--gold)" />
                <span>100% Safe & Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
