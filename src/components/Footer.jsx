import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Award, RefreshCcw, Truck, Lock, HeadphonesIcon } from 'lucide-react';
import './Footer.css';
import logoImg from '../assets/image.png';

const footerLinks = {
  'Shop': [
    { label: 'Gold Jewellery', href: '/catalog/gold' },
    { label: 'Diamond Jewellery', href: '/catalog/diamond' },
    { label: 'Bridal Collection', href: '/catalog/bridal' },
    { label: 'Silver Jewellery', href: '/catalog/silver' },
    { label: 'Platinum', href: '/catalog/platinum' },
    { label: 'Coins & Bars', href: '/catalog/coins' },
  ],
  'Customer Care': [
    { label: 'Track Order', href: '/account' },
    { label: 'Return Policy', href: '/returns' },
    { label: 'Exchange Policy', href: '/exchange' },
    { label: 'Buyback Policy', href: '/buyback' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'FAQ', href: '/faq' },
  ],
  'Company': [
    { label: 'About Kriyaalaya Jewellery', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gold Saving Scheme', href: '/gold-scheme' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      {/* Trust Badges */}
      <div className="footer-trust">
        <div className="container">
          <div className="trust-grid">
            {[
              { icon: <ShieldCheck size={24} />, label: 'BIS Hallmarked', desc: 'All gold certified by BIS' },
              { icon: <Award size={24} />, label: 'GIA Certified', desc: 'Authentic diamond grading' },
              { icon: <RefreshCcw size={24} />, label: '30-Day Returns', desc: 'Easy hassle-free returns' },
              { icon: <Truck size={24} />, label: 'Free Shipping', desc: 'On orders above ₹10,000' },
              { icon: <Lock size={24} />, label: 'Secure Payments', desc: '256-bit SSL encryption' },
              { icon: <HeadphonesIcon size={24} />, label: '24/7 Support', desc: 'Always here to help you' },
            ].map(item => (
              <div key={item.label} className="trust-item">
                <span className="trust-icon">{item.icon}</span>
                <div>
                  <h4 className="trust-label">{item.label}</h4>
                  <p className="trust-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo" style={{ display: 'block' }}>
                <img src="/logo.png" alt="Kriyaalaya Jewellery" style={{height: '90px', objectFit: 'contain'}} />
              </div>
              <p className="footer-about">
                India's most trusted premium jewellery brand, crafting exquisite gold, diamond, 
                and bridal jewellery since 1975. Over 5 lakh happy customers across India.
              </p>
              <div className="footer-contact-items">
                <a href="tel:1800-102-9898" className="footer-contact-item">
                  <Phone size={14} /> 1800-102-9898
                </a>
                <a href="mailto:care@kriyaalayajewellery.com" className="footer-contact-item">
                  <Mail size={14} /> care@kriyaalayajewellery.com
                </a>
                <span className="footer-contact-item" style={{alignItems: 'flex-start'}}>
                  <MapPin size={14} style={{marginTop: '4px', flexShrink: 0}} />
                  <span style={{lineHeight: 1.4}}>
                    No.5, Jaya Complex, Thadagam Main Rd, PMR Nagar,<br/>TVS Nagar, Coimbatore, Tamil Nadu 641025
                  </span>
                </span>
              </div>
              <div className="footer-socials">
                {[
                  { label: 'IG', href: '#' },
                  { label: 'FB', href: '#' },
                  { label: 'YT', href: '#' },
                  { label: 'X', href: '#' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="social-btn" aria-label={label}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="footer-col">
                <h4 className="footer-col-title">{section}</h4>
                <ul className="footer-links">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link to={link.href} className="footer-link">
                        <ArrowRight size={12} /> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="footer-col">
              <h4 className="footer-col-title">Stay Updated</h4>
              <p className="footer-newsletter-desc">
                Subscribe for exclusive offers, new arrivals & jewellery care tips.
              </p>
              <form className="footer-newsletter" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="footer-email-input" />
                <button type="submit" className="footer-email-btn">
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© 2026 Kriyaalaya Jewellery. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
              <Link to="/sitemap" className="footer-bottom-link">Sitemap</Link>
            </div>
            <div className="footer-payment-icons">
              {['UPI', 'Visa', 'MC', 'Paytm', 'GPay'].map(p => (
                <span key={p} className="payment-icon">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
