import { createContext, useContext, useReducer, useCallback } from 'react';

const WishlistContext = createContext(null);

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.items.find(i => i.id === action.product.id);
      if (exists) return { ...state, items: state.items.filter(i => i.id !== action.product.id) };
      return { ...state, items: [...state.items, action.product] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  const toggleWishlist = useCallback((product) => dispatch({ type: 'TOGGLE', product }), []);
  const removeFromWishlist = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
  const isWishlisted = useCallback((id) => state.items.some(i => i.id === id), [state.items]);

  return (
    <WishlistContext.Provider value={{ items: state.items, count: state.items.length, toggleWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
