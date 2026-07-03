import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <main className="page-enter" style={{padding: 'var(--space-3xl) 0', minHeight: '80vh'}}>
      <div className="container">
        <h1 className="section-title" style={{marginBottom: 'var(--space-xl)'}}>My Wishlist</h1>
        
        {items.length === 0 ? (
          <div style={{textAlign: 'center', padding: '100px 0'}}>
            <p style={{marginBottom: 'var(--space-xl)', color: 'var(--charcoal-ghost)'}}>Your wishlist is empty.</p>
            <Link to="/catalog" className="btn btn-gold btn-lg">Explore Jewellery</Link>
          </div>
        ) : (
          <div className="products-grid">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
