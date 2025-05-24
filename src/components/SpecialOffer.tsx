
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SpecialOffer = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-lavender/50 to-mint/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-6">
              GREAT OFFER · GREAT OFFER · GREAT OFFER
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-medium mb-2">A set of Dietary supplements</h3>
              <p className="text-gray-600 mb-4">Vitamin D3+K2 + Organic Collagen Peptides</p>
              <div className="flex items-baseline mb-4">
                <span className="text-gray-400 line-through mr-2">$46.99</span>
                <span className="text-2xl font-bold">$38.99</span>
              </div>
              <Button asChild className="w-full">
                <Link to="/product/bundle-1">Add to cart</Link>
              </Button>
            </div>
            <p className="text-gray-700">
              Whether you're an athlete, a busy professional, or just looking to boost your overall health, we have the perfect set for you. Buying a set of supplements is cost-effective and ensures you have a comprehensive wellness routine.
            </p>
          </div>
          <div className="lg:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1512207845348-9711f48b19b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Supplement Bundle" 
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-5 -right-5 bg-white rounded-full p-4 shadow-lg hidden md:block">
              <span className="text-lg font-bold text-primary">Save 15%</span>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/shop/bundles">
            <Button variant="outline" size="lg">
              View all sets
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
