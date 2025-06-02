
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-background to-teal-50 dark:from-orange-950/20 dark:via-background dark:to-teal-950/20 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <h1 className="font-bold text-foreground mb-4">
              HEALTHCARE. REAL RESULTS
            </h1>
            <p className="text-lg mb-6 text-muted-foreground">
              Take the step towards a healthier, more vibrant life – shop now and fuel your body with the best!
            </p>
            <p className="text-muted-foreground mb-8">
              Our products are made with science-backed ingredients. Raw from certified sources that meet the highest standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600">
                <Link to="/shop">
                  Shop now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                <Link to="/about">
                  Learn more
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square relative z-10">
              <img 
                src="/lovable-uploads/4f70e174-097d-4881-add3-76ac11967f12.png" 
                alt="Health Supplement" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-teal-400 rounded-full -z-10 opacity-60"></div>
            <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-orange-400 rounded-full -z-10 opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
