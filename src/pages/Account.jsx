import { useState } from 'react';
import { User, Package, MapPin, Heart, CreditCard, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Account.css';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');

  const TABS = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  ];

  return (
    <main className="account-page page-enter">
      <div className="container">
        <h1 className="section-title" style={{marginBottom: 'var(--space-2xl)'}}>My Account</h1>
        
        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="user-profile-summary">
              <div className="user-avatar">JD</div>
              <div>
                <h3 className="user-name">John Doe</h3>
                <p className="user-email">john.doe@example.com</p>
              </div>
            </div>
            
            <nav className="account-nav">
              {TABS.map(tab => (
                <button 
                  key={tab.id}
                  className={`account-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
              <Link to="/wishlist" className={`account-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}>
                <Heart size={18} /> View Wishlist
              </Link>
              <button className="account-nav-btn logout-btn">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>
          
          <div className="account-content">
            {activeTab === 'profile' && (
              <div className="account-section">
                <h2>Profile Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue="John" className="input" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue="Doe" className="input" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue="john.doe@example.com" className="input" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="input" />
                  </div>
                </div>
                <button className="btn btn-gold" style={{marginTop: 'var(--space-lg)'}}>Save Changes</button>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="account-section">
                <h2>Order History</h2>
                <div className="empty-state">
                  <Package size={48} color="var(--charcoal-ghost)" style={{marginBottom: '16px'}} />
                  <h3>No orders yet</h3>
                  <p>When you place an order, it will appear here.</p>
                  <Link to="/catalog" className="btn btn-gold mt-lg">Start Shopping</Link>
                </div>
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="account-section">
                <h2>Saved Addresses</h2>
                <div className="address-card">
                  <h4>Home</h4>
                  <p>John Doe<br/>123 Luxury Lane, Jubilee Hills<br/>Hyderabad, Telangana 500033<br/>India</p>
                  <div style={{marginTop: '12px', display: 'flex', gap: '12px'}}>
                    <button className="btn btn-outline btn-sm">Edit</button>
                    <button className="btn btn-ghost btn-sm" style={{borderColor: 'var(--error)', color: 'var(--error)'}}>Delete</button>
                  </div>
                </div>
                <button className="btn btn-outline" style={{marginTop: 'var(--space-lg)'}}>+ Add New Address</button>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div className="account-section">
                <h2>Payment Methods</h2>
                <p style={{color: 'var(--charcoal-ghost)'}}>Save your payment methods for faster checkout.</p>
                <button className="btn btn-outline" style={{marginTop: 'var(--space-lg)'}}>+ Add Payment Method</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
