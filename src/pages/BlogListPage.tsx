
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  slug: string;
  category: string;
}

// Sample blog posts
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Science Behind Vitamin D3+K2',
    excerpt: 'Learn how these two vitamins work synergistically for optimal bone and heart health.',
    content: 'Vitamin D3 and K2 are among the most important vitamins for overall health. Vitamin D3 helps your body absorb calcium, while K2 ensures that calcium is properly utilized in bones rather than accumulating in arteries. Together, they form a powerful combination for bone and cardiovascular health.',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'June 15, 2023',
    slug: 'science-behind-vitamin-d3-k2',
    category: 'Nutrition'
  },
  {
    id: 2,
    title: '5 Essential Supplements for Everyday Wellness',
    excerpt: 'Discover the key supplements that can help support your overall health and well-being.',
    content: 'In our fast-paced world, getting all necessary nutrients from diet alone can be challenging. This guide covers five essential supplements that can help fill nutritional gaps: a quality multivitamin, omega-3 fatty acids, vitamin D, probiotics, and magnesium.',
    image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'May 28, 2023',
    slug: 'essential-supplements-everyday-wellness',
    category: 'Wellness'
  },
  {
    id: 3,
    title: 'The Benefits of Marine Collagen for Skin and Joints',
    excerpt: 'Explore how marine collagen can support skin elasticity, joint health, and more.',
    content: 'Marine collagen, derived from fish, is highly bioavailable and rich in types I and III collagen. These collagen types are abundant in skin, bones, and connective tissues, making marine collagen supplements particularly beneficial for skin elasticity, joint health, and wound healing.',
    image: 'https://images.unsplash.com/photo-1573496782646-e8d943a4bdd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'April 12, 2023',
    slug: 'benefits-marine-collagen-skin-joints',
    category: 'Skincare'
  },
  {
    id: 4,
    title: 'Understanding Electrolytes: Why They Matter for Hydration',
    excerpt: 'Learn about the crucial role electrolytes play in hydration and overall health.',
    content: 'Electrolytes are minerals that carry an electrical charge and are essential for various bodily functions. They regulate nerve and muscle function, hydrate the body, balance blood acidity and pressure, and help rebuild damaged tissue. Key electrolytes include sodium, potassium, calcium, and magnesium.',
    image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'March 5, 2023',
    slug: 'understanding-electrolytes-hydration',
    category: 'Hydration'
  },
  {
    id: 5,
    title: 'How to Build a Sustainable Wellness Routine',
    excerpt: 'Tips for creating a wellness routine you can maintain for long-term health benefits.',
    content: "Building a sustainable wellness routine is about creating habits that support your health without feeling overwhelmed. Start small, focus on consistency rather than perfection, and incorporate activities you enjoy. This article provides practical tips for nutrition, physical activity, sleep hygiene, and stress management that you can maintain for years to come.",
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'February 20, 2023',
    slug: 'build-sustainable-wellness-routine',
    category: 'Lifestyle'
  },
  {
    id: 6,
    title: 'Immune Support: Beyond Vitamin C',
    excerpt: 'Discover other key nutrients and supplements that can boost your immune system.',
    content: 'While vitamin C gets most of the attention for immune support, many other nutrients play crucial roles. This comprehensive guide explores the immune-boosting properties of vitamin D, zinc, elderberry, echinacea, and probiotics, with evidence-based recommendations for supplementation.',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'January 8, 2023',
    slug: 'immune-support-beyond-vitamin-c',
    category: 'Immunity'
  }
];

const categories = [
  'All',
  'Nutrition',
  'Wellness',
  'Skincare',
  'Hydration',
  'Lifestyle',
  'Immunity'
];

const BlogListPage = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Blog | Life Harmony Wellness</title>
        <meta name="description" content="Explore our wellness blog for the latest articles on nutrition, supplements, health tips, and more from Life Harmony Wellness." />
        <link rel="canonical" href="https://lifeharmonywellness.com/blog" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Life Harmony Blog</h1>
            <p className="text-xl text-gray-600 mb-12">
              Stay informed, stay healthy! Our blog is your go-to source for the latest information on wellness, nutrition, and the power of vitamins & supplements.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Featured Post */}
          {activeCategory === 'All' && (
            <div className="mb-16">
              <Link 
                to={`/blog/${blogPosts[0].slug}`}
                className="grid md:grid-cols-2 gap-8 group"
              >
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ maxHeight: '500px' }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-primary font-medium mb-2">{blogPosts[0].category}</span>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{blogPosts[0].date}</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
          
          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(activeCategory === 'All' ? 1 : 0).map((post) => (
              <Link 
                to={`/blog/${post.slug}`}
                key={post.id}
                className="group"
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-primary text-sm font-medium mb-2 block">{post.category}</span>
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogListPage;
