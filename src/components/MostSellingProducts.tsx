
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getMostSellingProducts } from '@/lib/api';
import { Product } from './ProductCard';

const MostSellingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const popularProducts = await getMostSellingProducts();
        setProducts(popularProducts);
      } catch (error) {
        console.error('Error fetching most selling products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // No products to show
  if (products.length === 0 && !loading) return null;

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold gradient-text mb-3">Best Sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most popular nutrition products that customers love
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border border-blue-500/30 text-blue-600 hover:bg-blue-50 group">
            <Link to="/shop">
              Shop All Best Sellers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MostSellingProducts;
