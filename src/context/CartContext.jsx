import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, items: action.items || [] };
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.product.id);
      if (exists) {
        return { 
          ...state, 
          items: state.items.map(i => 
            i.id === action.product.id 
              ? { ...i, qty: Number(i.qty) + (Number(action.qty) || 1) } 
              : i
          ) 
        };
      }
      return { ...state, items: [...state.items, { ...action.product, qty: (Number(action.qty) || 1) }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, Number(action.qty)) } : i) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Initialize from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shopjj_cart');
      if (saved) {
        dispatch({ type: 'INIT', items: JSON.parse(saved) });
      }
    } catch (e) {
      console.error('Failed to load cart from local storage', e);
    }
  }, []);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem('shopjj_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product, qty = 1) => dispatch({ type: 'ADD', product, qty }), []);
  const removeFromCart = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
  const updateQty = useCallback((id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const total = state.items.reduce((sum, i) => sum + (i.price * Number(i.qty)), 0);
  const count = state.items.reduce((sum, i) => sum + Number(i.qty), 0);

  return (
    <CartContext.Provider value={{ items: state.items, total, count, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
