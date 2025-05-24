
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Science Behind Vitamin D3+K2',
    excerpt: 'Learn how these two vitamins work synergistically for optimal bone and heart health.',
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    date: 'June 15, 2023',
    slug: 'science-behind-vitamin-d3-k2'
  },
  {
    id: 2,
    title: '5 Essential Supplements for Everyday Wellness',
    excerpt: 'Discover the key supplements that can help support your overall health and well-being.',
    image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    date: 'May 28, 2023',
    slug: 'essential-supplements-everyday-wellness'
  },
  {
    id: 3,
    title: 'The Benefits of Marine Collagen for Skin and Joints',
    excerpt: 'Explore how marine collagen can support skin elasticity, joint health, and more.',
    image: 'https://images.unsplash.com/photo-1573496782646-e8d943a4bdd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    date: 'April 12, 2023',
    slug: 'benefits-marine-collagen-skin-joints'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">OUR BLOG</h2>
            <p className="text-gray-600">Stay informed, stay healthy! Our Life Harmony Blog is your go-to source for the latest information on wellness, nutrition, and the power of vitamins & supplements.</p>
          </div>
          <Link to="/blog" className="mt-4 md:mt-0">
            <Button variant="outline">Go to Blog</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <h3 className="font-medium text-xl mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
