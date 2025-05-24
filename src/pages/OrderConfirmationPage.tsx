
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Package, Check, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Order Confirmation | Amraj Nutrition</title>
        <meta name="description" content="Thank you for your order" />
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={48} className="text-green-600" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Thank You for Your Order!</h1>
            <p className="text-xl mb-8">Your order #{orderId} has been successfully placed</p>
            
            <div className="futuristic-border mb-12">
              <div className="grid md:grid-cols-3 gap-8 py-6">
                <div className="text-center">
                  <Package size={36} className="mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold text-lg">Order Processing</h3>
                  <p className="text-gray-600">We're preparing your order</p>
                </div>
                
                <div className="text-center">
                  <ShoppingBag size={36} className="mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold text-lg">Shipping Soon</h3>
                  <p className="text-gray-600">You'll receive a notification</p>
                </div>
                
                <div className="text-center">
                  <Check size={36} className="mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold text-lg">Payment Confirmed</h3>
                  <p className="text-gray-600">Your payment was successful</p>
                </div>
              </div>
            </div>
            
            <p className="mb-6">We've sent you a confirmation email with your order details.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-500">
                <Link to="/">Continue Shopping</Link>
              </Button>
              
              {/* For future: could add an order tracking button here */}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
