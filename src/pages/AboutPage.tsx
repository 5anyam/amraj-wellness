
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>About Us | Life Harmony Wellness</title>
        <meta name="description" content="Learn about Life Harmony Wellness, our mission, values, and commitment to providing premium health supplements with science-backed ingredients." />
        <link rel="canonical" href="https://lifeharmonywellness.com/about" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-mint/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-gray-700">
                We're on a mission to help people feel their best through science-backed supplements using only the highest quality ingredients. We believe that wellness should be accessible, transparent, and tailored to modern life.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Life Harmony Wellness was born from a personal journey. Our founder, Dr. Sarah Chen, struggled for years with fatigue and health issues despite living what she thought was a healthy lifestyle. After discovering that nutritional deficiencies were at the root of many of her problems, she became passionate about creating supplements that actually delivered results.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  In 2018, she assembled a team of nutritionists, biochemists, and wellness experts to create formulations based on scientific research rather than marketing hype. The goal was simple: create supplements that work, using ingredients that matter, at concentrations that make a difference.
                </p>
                <p className="text-lg text-gray-700">
                  Today, Life Harmony has helped thousands of customers improve their wellness journey through our carefully crafted products and educational content focused on holistic health.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                  alt="Founder in laboratory"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-5 -right-5 bg-lavender w-24 h-24 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Science-Backed Formulations",
                  description: "Every ingredient is chosen based on peer-reviewed research and included at effective concentrations."
                },
                {
                  title: "Transparency",
                  description: "We clearly list all ingredients and their amounts. No proprietary blends or hidden fillers."
                },
                {
                  title: "Quality Sourcing",
                  description: "We carefully select suppliers who meet our strict standards for purity, potency, and sustainability."
                },
                {
                  title: "Education",
                  description: "We're committed to helping you understand what you're taking and why it matters."
                },
                {
                  title: "Sustainability",
                  description: "We're constantly working to reduce our environmental impact through packaging innovations and carbon offset programs."
                },
                {
                  title: "Accessibility",
                  description: "We believe quality supplements should be available to everyone who needs them."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Process</h2>
              <p className="text-lg text-gray-700">
                Creating exceptional supplements requires meticulous attention to detail at every stage. Here's how we ensure you receive the highest quality products.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Research & Development",
                  description: "Our team reviews hundreds of scientific papers to identify effective ingredients and optimal dosages."
                },
                {
                  step: "02",
                  title: "Sourcing",
                  description: "We partner with trusted suppliers who can provide the highest quality, purest ingredients with full traceability."
                },
                {
                  step: "03",
                  title: "Manufacturing",
                  description: "All products are made in cGMP-certified facilities in the USA under strict quality control protocols."
                },
                {
                  step: "04",
                  title: "Testing",
                  description: "Multiple rounds of testing verify ingredient identity, potency, and purity. We test for contaminants, heavy metals, and microbial safety."
                },
                {
                  step: "05",
                  title: "Customer Feedback",
                  description: "We continuously gather and incorporate user feedback to improve our formulations and develop new products."
                }
              ].map((process, index) => (
                <div key={index} className="flex mb-12 last:mb-0">
                  <div className="mr-8">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {process.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                    <p className="text-gray-700">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Chen",
                  role: "Founder & CEO",
                  bio: "PhD in Biochemistry with 15+ years of research experience in nutritional science.",
                  image: "https://i.pravatar.cc/300?img=26"
                },
                {
                  name: "Dr. Michael Rodriguez",
                  role: "Chief Scientific Officer",
                  bio: "Former research scientist specializing in nutraceuticals and bioavailability enhancement.",
                  image: "https://i.pravatar.cc/300?img=12"
                },
                {
                  name: "Emma Thompson",
                  role: "Head of Product",
                  bio: "Registered Dietitian with expertise in formulation development and clinical nutrition.",
                  image: "https://i.pravatar.cc/300?img=21"
                },
                {
                  name: "David Kim",
                  role: "Quality Assurance Director",
                  bio: "20+ years experience in pharmaceutical and supplement manufacturing compliance.",
                  image: "https://i.pravatar.cc/300?img=13"
                },
                {
                  name: "Lisa Patel",
                  role: "Customer Wellness Advocate",
                  bio: "Certified health coach dedicated to helping customers find the right supplements for their needs.",
                  image: "https://i.pravatar.cc/300?img=29"
                },
                {
                  name: "James Wilson",
                  role: "Sustainability Officer",
                  bio: "Environmental scientist working to minimize our ecological footprint while maximizing social impact.",
                  image: "https://i.pravatar.cc/300?img=15"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-w-3 aspect-h-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-lavender/40">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Wellness Journey</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Experience the difference that science-backed supplements can make in your daily life. Start your wellness journey with Life Harmony today.
            </p>
            <div className="flex justify-center">
              <a href="/shop" className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition">
                Shop Our Products
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
