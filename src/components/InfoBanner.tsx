
import React from 'react';
import { ShoppingCart, Package, CreditCard, Truck } from 'lucide-react';

const features = [
  {
    icon: ShoppingCart,
    title: 'Free Shipping',
    description: 'On orders over $50'
  },
  {
    icon: Package,
    title: 'Premium Ingredients',
    description: 'Science-backed formulas'
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: '100% secure checkout'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: '2-5 business days'
  }
];

const InfoBanner = () => {
  return (
    <section className="py-10 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoBanner;
