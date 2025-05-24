
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/components/ProductCard';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  updateQuantity: (productId: number, quantity: number) => void;
  cartItems: CartItem[]; // Add this property
  totalPrice: number; // Add this property
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage key
const CART_STORAGE_KEY = 'lifeharmony-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Create a new array to trigger re-render
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      } else {
        // Add new item
        return [...currentItems, { product, quantity }];
      }
    });
    
    // Show toast notification for feedback
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) added to your cart`,
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems => 
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setItems(currentItems => 
      currentItems.filter(item => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Calculate total price once
  const totalPrice = getCartTotal();

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount,
      updateQuantity,
      cartItems: items, // Add this property
      totalPrice // Add this property
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
