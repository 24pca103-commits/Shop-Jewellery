import { useState, useRef } from 'react';
import { Camera, Upload, RefreshCcw, Download, Share2, Move, RotateCw, Image as ImageIcon } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import './TryOn.css';

export default function TryOn() {
  const [activeItem, setActiveItem] = useState(PRODUCTS[0]);
  const [modelImg, setModelImg] = useState('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&q=80');
  const [cameraActive, setCameraActive] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0 });
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert("Camera access denied or unavailable.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      setCameraActive(false);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelImg(url);
      stopCamera();
    }
  };

  const tryOnItems = PRODUCTS.filter(p => ['necklace', 'earrings', 'pendant', 'mangalsutra'].includes(p.category));

  return (
    <main className="tryon-page page-enter">
      <div className="tryon-header">
        <div className="container text-center">
          <span className="eyebrow">Experience the Magic</span>
          <h1 className="section-title">Virtual Try-On Studio</h1>
          <p className="tryon-subtitle">See how our exquisite pieces look on you before making a purchase.</p>
        </div>
      </div>

      <div className="tryon-workspace">
        <div className="tryon-controls-left">
          <div className="tryon-panel">
            <h3 className="panel-title">1. Choose Your Canvas</h3>
            <div className="canvas-options">
              <button className={`canvas-btn ${cameraActive ? 'active' : ''}`} onClick={startCamera}>
                <Camera size={20} /> Live Camera
              </button>
              <label className="canvas-btn">
                <Upload size={20} /> Upload Photo
                <input type="file" hidden accept="image/*" onChange={handleUpload} />
              </label>
              <button className={`canvas-btn ${!cameraActive && modelImg.includes('unsplash') ? 'active' : ''}`} onClick={() => { stopCamera(); setModelImg('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&q=80'); }}>
                <ImageIcon size={20} /> Use Model
              </button>
            </div>
          </div>

          <div className="tryon-panel">
            <h3 className="panel-title">2. Select Jewellery</h3>
            <div className="tryon-catalog">
              {tryOnItems.map(item => (
                <button
                  key={item.id}
                  className={`tryon-catalog-item ${activeItem.id === item.id ? 'active' : ''}`}
                  onClick={() => setActiveItem(item)}
                >
                  <img src={item.image} alt={item.name} />
                  <div className="tryon-catalog-info">
                    <span className="tryon-cat">{item.category}</span>
                    <span className="tryon-name">{item.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="tryon-canvas-area">
          <div className="tryon-canvas">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline muted className="canvas-bg video-bg" />
            ) : (
              <img src={modelImg} alt="Model" className="canvas-bg" />
            )}
            
            {/* Draggable Jewel Overlay (Simulated via CSS transforms for UI purposes) */}
            <div 
              className="jewel-overlay"
              style={{
                transform: `translate(calc(-50% + ${transform.x}px), calc(-50% + ${transform.y}px)) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
                top: activeItem.category === 'necklace' ? '65%' : '50%',
              }}
            >
              <img src={activeItem.image} alt="Jewel Overlay" />
            </div>

            {/* Fixed Control Bar (Prevents clipping/rotation issues) */}
            <div className="jewel-controls-bar">
              <button onClick={() => setTransform(p => ({...p, scale: p.scale + 0.15}))} title="Zoom In">+</button>
              <button onClick={() => setTransform(p => ({...p, scale: Math.max(0.5, p.scale - 0.15)}))} title="Zoom Out">-</button>
              <button onClick={() => setTransform(p => ({...p, rotate: p.rotate + 15}))} title="Rotate Right"><RotateCw size={12}/></button>
              <button onClick={() => setTransform(p => ({...p, rotate: p.rotate - 15}))} title="Rotate Left" style={{ transform: 'scaleX(-1)' }}><RotateCw size={12}/></button>
            </div>

            <div className="canvas-overlay-badge">
              <Sparkles size={14} /> AI Engine Active
            </div>
          </div>

          <div className="canvas-actions">
            <button className="btn btn-outline" onClick={() => setTransform({ x:0, y:0, scale:1, rotate:0 })}>
              <RefreshCcw size={16} /> Reset Position
            </button>
            <button className="btn btn-ghost" style={{borderColor:'var(--gold)', color:'var(--gold)'}}>
              <Download size={16} /> Save Preview
            </button>
            <button className="btn btn-ghost" style={{borderColor:'var(--gold)', color:'var(--gold)'}}>
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>

        <div className="tryon-controls-right">
          <div className="tryon-panel active-item-panel">
            <h3 className="panel-title">Currently Trying</h3>
            <img src={activeItem.image} alt={activeItem.name} className="active-item-img" />
            <h4 className="active-item-name">{activeItem.name}</h4>
            <p className="active-item-price">₹{activeItem.price.toLocaleString('en-IN')}</p>
            
            <div className="active-item-specs">
              <span>{activeItem.purity} {activeItem.metal}</span> • <span>{activeItem.weight}g</span>
            </div>

            <button className="btn btn-gold w-full" style={{marginTop: 'var(--space-md)'}}>
              Add to Cart
            </button>
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
