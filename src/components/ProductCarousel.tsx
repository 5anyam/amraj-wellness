
import React, { useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const ProductCarousel = () => {
  const products = [
    {
      id: 1,
      image: '/lovable-uploads/e0d23c74-f6cc-4c8c-bcbf-040eed572165.png',
      title: 'Weight Management Pro',
      subtitle: 'Garcinia Cambogia & Green Coffee Bean Extract'
    },
    {
      id: 2,
      image: '/lovable-uploads/712ef5bc-5fc8-485f-a7fc-2ba1b7d469ab.png',
      title: 'Advanced Liver Detox',
      subtitle: 'Milk Thistle & TUDCA Complex'
    },
    {
      id: 3,
      image: '/lovable-uploads/dad692f1-eef7-4876-8b87-a31207ad9fcc.png',
      title: 'Advanced Prostate Care',
      subtitle: 'Saw Palmetto & Beta Sitosterol'
    }
  ];

  const autoplayOptions = {
    delay: 3500,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  };

  return (
    <section className="py-2 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <Carousel 
          className="w-full mx-auto"
          plugins={[Autoplay(autoplayOptions)]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-4"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-orange-200 dark:border-orange-800">
                    <div className="aspect-w-16 aspect-h-9 bg-teal-50 dark:bg-teal-950/20">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="bg-orange-500 hover:bg-orange-600 text-white border-0" />
          <CarouselNext className="bg-teal-500 hover:bg-teal-600 text-white border-0" /> */}
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
