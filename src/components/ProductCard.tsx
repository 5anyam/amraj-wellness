import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { createProductSlug } from '@/lib/slugUtils';

// Export the Product interface so it can be used by other components
export interface Product {
  id: number;
  name: string;
  price: number;
  regular_price?: number;
  sale_price?: number;
  image: string;
  gallery?: string[];
  description?: string;
  short_description?: string;
  category?: string;
  tag?: string;
  related_ids?: number[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Calculate discount percentage if both regular and sale prices exist
  const discountPercentage = product.regular_price && product.price < product.regular_price
    ? Math.round(((product.regular_price - product.price) / product.regular_price) * 100)
    : 0;

  const hasDiscount = discountPercentage > 0;

  const productSlug = createProductSlug(product);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-card overflow-hidden relative bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200/30 hover:border-blue-300/50 transition-all duration-300">
        {hasDiscount && (
          <Badge 
            className="absolute top-2 right-2 z-10 text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500 py-1 px-2"
          >
            {discountPercentage}% OFF
          </Badge>
        )}
        <Link to={`/product/${productSlug}`}>
          <div className="aspect-w-4 aspect-h-3 bg-gradient-to-b from-white/50 to-blue-50/30 overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full p-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <CardContent className="p-4 bg-white/70 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-bold text-blue-600">₹{product.price.toFixed(2)}</p>
              {hasDiscount && (
                <p className="text-sm text-gray-500 line-through">₹{product.regular_price?.toFixed(2)}</p>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
