
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import NewArrivals from '@/components/NewArrivals';
import Testimonials from '@/components/Testimonials';
import InfoBanner from '@/components/InfoBanner';
import MostSellingProducts from '@/components/MostSellingProducts';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Amraj | Premium Health Supplements</title>
        <meta name="description" content="Shop premium health supplements, vitamins, and wellness products at Amraj. Quality ingredients, science-backed formulas, and real results." />
        <meta property="og:title" content="Amraj | Premium Health Supplements" />
        <meta property="og:description" content="Shop premium health supplements, vitamins, and wellness products at Amraj. Quality ingredients, science-backed formulas, and real results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amraj.in" />
        <meta property="og:image" content="/lovable-uploads/62e36359-bbd2-4212-a016-0d25dd089ece.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amraj | Premium Health Supplements" />
        <meta name="twitter:description" content="Shop premium health supplements, vitamins, and wellness products at Amraj. Quality ingredients, science-backed formulas, and real results." />
        <meta name="twitter:image" content="/lovable-uploads/62e36359-bbd2-4212-a016-0d25dd089ece.png" />
        <link rel="canonical" href="https://amraj.in" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <ProductCarousel />
        <InfoBanner />
        <NewArrivals />
        <MostSellingProducts />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
