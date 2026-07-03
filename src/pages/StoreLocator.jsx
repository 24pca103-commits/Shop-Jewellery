import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, ArrowRight } from 'lucide-react';
import { STORES } from '../data/stores';
import './StoreLocator.css';

export default function StoreLocator() {
  const [activeStore, setActiveStore] = useState(STORES[0]);

  return (
    <main className="stores-page page-enter">
      <div className="stores-header">
        <div className="container text-center">
          <h1 className="section-title">Our Boutiques</h1>
          <p className="stores-subtitle">Experience the luxury of Vaibhav Jewels in person. Find a store near you.</p>
        </div>
      </div>

      <div className="container">
        <div className="stores-layout">
          {/* List */}
          <div className="stores-list-wrap">
            <div className="stores-search">
              <input type="text" placeholder="Search by city or zip code" className="input" />
            </div>
            <div className="stores-list">
              {STORES.map(store => (
                <div 
                  key={store.id} 
                  className={`store-card ${activeStore.id === store.id ? 'active' : ''}`}
                  onClick={() => setActiveStore(store)}
                >
                  <h3 className="store-name">{store.name}</h3>
                  <div className="store-info-row">
                    <MapPin size={14} className="store-icon" />
                    <span>{store.address}</span>
                  </div>
                  <div className="store-info-row">
                    <Phone size={14} className="store-icon" />
                    <span>{store.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details / Map area */}
          <div className="store-detail-wrap">
            <div className="store-detail-card">
              <div className="store-detail-header">
                <h2>{activeStore.name}</h2>
                <span className="badge badge-gold">Open Now</span>
              </div>
              
              <div className="store-detail-grid">
                <div className="detail-col">
                  <h4>Address</h4>
                  <p>{activeStore.address}</p>
                  
                  <h4 style={{marginTop: '16px'}}>Contact</h4>
                  <p>{activeStore.phone}<br/>{activeStore.email}</p>
                </div>
                
                <div className="detail-col">
                  <h4>Store Timings</h4>
                  <p className="flex items-center gap-sm"><Clock size={14}/> {activeStore.hours}</p>
                  
                  <h4 style={{marginTop: '16px'}}>Features</h4>
                  <div className="store-features">
                    {activeStore.features.map(f => (
                      <span key={f} className="feature-pill">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="store-actions">
                <button className="btn btn-gold flex-1">
                  <MapPin size={16} /> Get Directions
                </button>
                <button className="btn btn-outline flex-1">
                  <Calendar size={16} /> Book Appointment
                </button>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="store-map">
              <div className="map-placeholder">
                <MapPin size={48} color="var(--gold)" />
                <p>Interactive map centered on {activeStore.city}</p>
                <span className="map-coords">{activeStore.lat}, {activeStore.lng}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
