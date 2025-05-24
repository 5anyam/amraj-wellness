
import React, { useState, useEffect } from 'react';
import ProductCard, { Product } from './ProductCard';
import { getRelatedProducts } from '@/lib/api';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

interface RelatedProductsProps {
  productId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (productId) {
          setLoading(true);
          const products = await getRelatedProducts(productId);
          setRelatedProducts(products);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  if (relatedProducts.length === 0 && !loading) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl my-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center relative">
            <span className="inline-block gradient-text relative">
              Related Products
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-teal-400"></span>
            </span>
          </h2>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
