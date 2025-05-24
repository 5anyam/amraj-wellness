
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const { toast } = useToast();
  const { items, removeFromCart, addToCart, getCartTotal, clearCart } = useCart();
  
  // Calculate cart totals
  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const discount = promoApplied ? subtotal * 0.15 : 0; // 15% discount if promo applied
  const total = subtotal + shipping - discount;
  
  const updateQuantity = (product, newQuantity) => {
    if (newQuantity < 1) return;
    // First remove the product
    removeFromCart(product.id);
    // Then add it with the new quantity
    addToCart(product, newQuantity);
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
  };
  
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME15') {
      setPromoApplied(true);
      toast({
        title: "Promo code applied",
        description: "15% discount has been applied to your order."
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive"
      });
    }
  };

  const handleCheckout = () => {
    // This will be replaced with Razorpay integration
    toast({
      title: "Processing checkout",
      description: "Redirecting to payment gateway..."
    });
    
    // We'll implement Razorpay here shortly
    initiateRazorpayPayment();
  };

  const initiateRazorpayPayment = () => {
    // Mock function for Razorpay integration
    // Will be fully implemented with WooCommerce API
    toast({
      title: "Razorpay integration",
      description: "This function will integrate with Razorpay using the WooCommerce API once connected."
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Your Cart | Life Harmony Wellness</title>
        <meta name="description" content="Review and checkout items in your shopping cart at Life Harmony Wellness." />
        <link rel="canonical" href="https://lifeharmonywellness.com/cart" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <ShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild size="lg">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="hidden sm:grid sm:grid-cols-5 p-4 bg-gray-50 text-gray-500 text-sm font-medium">
                    <div className="col-span-2">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total</div>
                  </div>
                  
                  {items.map(item => (
                    <div key={item.product.id} className="border-t border-gray-200 first:border-t-0">
                      <div className="p-4 sm:p-6 sm:grid sm:grid-cols-5 sm:gap-4">
                        {/* Mobile: Product + Remove button */}
                        <div className="flex justify-between sm:hidden mb-4">
                          <h3 className="text-lg font-medium">{item.product.name}</h3>
                          <button 
                            onClick={() => handleRemoveItem(item.product.id)} 
                            className="text-gray-400 hover:text-gray-500"
                            aria-label="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        {/* Product (Image + Name) */}
                        <div className="flex sm:col-span-2 items-center">
                          <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-base sm:text-lg font-medium hidden sm:block">
                              {item.product.name}
                            </h3>
                            <Link 
                              to={`/product/${item.product.id}`}
                              className="text-primary hover:underline text-sm"
                            >
                              View product
                            </Link>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center mt-4 sm:mt-0">
                          <span className="sm:hidden text-gray-500 mr-2">Price:</span>
                          <span>${item.product.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="flex items-center mt-4 sm:mt-0">
                          <span className="sm:hidden text-gray-500 mr-2">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => updateQuantity(item.product, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => updateQuantity(item.product, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Total + Remove (desktop) */}
                        <div className="flex items-center justify-between mt-4 sm:mt-0">
                          <div>
                            <span className="sm:hidden text-gray-500 mr-2">Total:</span>
                            <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.product.id)} 
                            className="text-gray-400 hover:text-gray-500 hidden sm:block"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Continue Shopping Link */}
                <div className="mt-6">
                  <Link to="/shop" className="text-primary hover:underline flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-primary">
                        <span>Discount (15%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium text-lg mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label htmlFor="promo" className="block text-sm font-medium mb-2">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={promoApplied}
                      />
                      <Button
                        onClick={applyPromoCode}
                        className="rounded-l-none"
                        disabled={promoApplied || !promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-green-600 text-sm mt-1">
                        15% discount applied!
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Try "WELCOME15" for 15% off your order.
                    </p>
                  </div>
                  
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Secure checkout. SSL encrypted.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
