
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NewArrivals from '@/components/NewArrivals';
import SpecialOffer from '@/components/SpecialOffer';
import FeaturedCollections from '@/components/FeaturedCollections';
import BlogSection from '@/components/BlogSection';
import Testimonials from '@/components/Testimonials';
import InfoBanner from '@/components/InfoBanner';
import MostSellingProducts from '@/components/MostSellingProducts';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Life Harmony Wellness | Premium Health Supplements</title>
        <meta name="description" content="Shop premium health supplements, vitamins, and wellness products at Life Harmony. Quality ingredients, science-backed formulas, and real results." />
        <meta property="og:title" content="Life Harmony Wellness | Premium Health Supplements" />
        <meta property="og:description" content="Shop premium health supplements, vitamins, and wellness products at Life Harmony. Quality ingredients, science-backed formulas, and real results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lifeharmonywellness.com" />
        <meta property="og:image" content="/lovable-uploads/4f70e174-097d-4881-add3-76ac11967f12.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Life Harmony Wellness | Premium Health Supplements" />
        <meta name="twitter:description" content="Shop premium health supplements, vitamins, and wellness products at Life Harmony. Quality ingredients, science-backed formulas, and real results." />
        <meta name="twitter:image" content="/lovable-uploads/4f70e174-097d-4881-add3-76ac11967f12.png" />
        <link rel="canonical" href="https://lifeharmonywellness.com" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <InfoBanner />
        <NewArrivals />
        <MostSellingProducts />
        <SpecialOffer />
        <FeaturedCollections />
        <Testimonials />
        <BlogSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
