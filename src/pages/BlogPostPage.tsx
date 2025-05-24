
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
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

// Sample blog posts (same as in BlogListPage)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Science Behind Vitamin D3+K2',
    excerpt: 'Learn how these two vitamins work synergistically for optimal bone and heart health.',
    content: `
      <p>Vitamin D3 and K2 are among the most important vitamins for overall health. While they're often discussed separately, their synergistic relationship is key to unlocking optimal health benefits, particularly for bone and cardiovascular health.</p>
      
      <h2>The Roles of Vitamin D3</h2>
      <p>Vitamin D3 (cholecalciferol) is often called the "sunshine vitamin" because our bodies produce it naturally when exposed to sunlight. Its primary functions include:</p>
      <ul>
        <li>Enhancing calcium absorption from the intestines</li>
        <li>Supporting immune function</li>
        <li>Promoting cell growth and reducing inflammation</li>
        <li>Helping regulate mood and warding off depression</li>
      </ul>
      
      <p>However, vitamin D alone isn't enough to ensure that calcium ends up where it's needed most - in your bones.</p>
      
      <h2>Enter Vitamin K2</h2>
      <p>Vitamin K2 (menaquinone) acts like a traffic director for calcium in your body. Its primary functions include:</p>
      <ul>
        <li>Activating proteins that direct calcium to bones and teeth</li>
        <li>Preventing calcium from depositing in soft tissues like arteries and organs</li>
        <li>Supporting bone density and strength</li>
        <li>Promoting cardiovascular health</li>
      </ul>
      
      <h2>The Synergy Between D3 and K2</h2>
      <p>When taken together, these vitamins create a powerful synergy:</p>
      <ol>
        <li><strong>Enhanced Calcium Management:</strong> D3 increases calcium absorption, while K2 ensures it's properly utilized.</li>
        <li><strong>Bone Health:</strong> The combination optimizes bone mineralization and may help prevent osteoporosis.</li>
        <li><strong>Cardiovascular Protection:</strong> K2 helps prevent arterial calcification that D3 might otherwise inadvertently promote.</li>
        <li><strong>Immune Support:</strong> Both vitamins play important roles in immune function.</li>
      </ol>
      
      <h2>Scientific Evidence</h2>
      <p>Research has increasingly supported the benefits of combining these vitamins:</p>
      <p>A 2017 study published in the Journal of Bone Metabolism found that the combination of vitamin D3 and K2 was more effective for bone health than either vitamin alone.</p>
      <p>A 2019 review in the International Journal of Molecular Sciences concluded that the D3-K2 combination may help prevent age-related diseases, particularly cardiovascular disease and osteoporosis.</p>
      
      <h2>Optimal Dosages</h2>
      <p>While individual needs may vary, research suggests these general guidelines:</p>
      <ul>
        <li>Vitamin D3: 1,000-5,000 IU daily (dependent on blood levels)</li>
        <li>Vitamin K2 (MK-7 form): 90-180 mcg daily</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>For those looking to optimize bone and heart health, the D3+K2 combination offers a scientifically-backed approach that addresses the shortcomings of supplementing with vitamin D alone. As with any supplement regimen, it's advisable to consult with a healthcare provider to determine the appropriate dosage for your specific needs.</p>
    `,
    image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: 'June 15, 2023',
    slug: 'science-behind-vitamin-d3-k2',
    category: 'Nutrition'
  },
  {
    id: 2,
    title: '5 Essential Supplements for Everyday Wellness',
    excerpt: 'Discover the key supplements that can help support your overall health and well-being.',
    content: `
      <p>In today's fast-paced world, getting all the nutrients we need from diet alone can be challenging. Even with the best intentions, factors like soil depletion, food processing, and busy lifestyles can lead to nutritional gaps. This is where thoughtfully chosen supplements can play a valuable role in supporting overall wellness.</p>
      
      <p>Here are five science-backed supplements that can help form the foundation of a comprehensive wellness routine:</p>
      
      <h2>1. High-Quality Multivitamin</h2>
      <p>A good multivitamin serves as nutritional insurance, filling potential gaps in your diet:</p>
      <ul>
        <li>Look for one containing methylated B vitamins (especially methylfolate and methylcobalamin) for better absorption</li>
        <li>Choose formulas with chelated minerals for enhanced bioavailability</li>
        <li>Consider gender and age-specific formulations that address particular needs</li>
      </ul>
      <p>While not a replacement for a healthy diet, a multivitamin can help ensure you're meeting basic micronutrient requirements.</p>
      
      <h2>2. Omega-3 Fatty Acids</h2>
      <p>These essential fatty acids provide fundamental support for:</p>
      <ul>
        <li>Brain health and cognitive function</li>
        <li>Heart health and healthy inflammatory response</li>
        <li>Skin integrity and moisture</li>
        <li>Joint comfort and mobility</li>
      </ul>
      <p>Look for supplements with both EPA and DHA, preferably from sustainable sources, with at least 1,000mg combined EPA and DHA daily.</p>
      
      <h2>3. Vitamin D3</h2>
      <p>Often called the "sunshine vitamin," D3 is actually a hormone that influences hundreds of processes in the body:</p>
      <ul>
        <li>Supports immune system function and regulation</li>
        <li>Promotes calcium absorption for bone health</li>
        <li>Influences mood and mental wellbeing</li>
        <li>Supports healthy inflammatory response</li>
      </ul>
      <p>With many people spending limited time outdoors and using sun protection, supplementation with 1,000-5,000 IU daily (ideally with K2) is often recommended, though blood testing is the best way to determine your optimal dosage.</p>
      
      <h2>4. Probiotics</h2>
      <p>These beneficial bacteria support gut health, which influences virtually every system in the body:</p>
      <ul>
        <li>Supports digestive function and nutrient absorption</li>
        <li>Helps maintain the intestinal barrier</li>
        <li>Influences immune system development and function</li>
        <li>Impacts mood and cognitive function via the gut-brain axis</li>
      </ul>
      <p>Look for supplements with multiple strains and at least 10-30 billion CFUs, and consider rotating different formulations periodically.</p>
      
      <h2>5. Magnesium</h2>
      <p>This mineral is involved in over 300 enzymatic reactions in the body but is commonly deficient in modern diets:</p>
      <ul>
        <li>Supports energy production and metabolism</li>
        <li>Promotes muscle relaxation and recovery</li>
        <li>Helps maintain healthy nerve function</li>
        <li>Supports sleep quality and stress management</li>
      </ul>
      <p>Forms like magnesium glycinate, malate, or threonate tend to be better absorbed and gentler on the stomach than oxide forms, with typical dosages ranging from 200-400mg daily.</p>
      
      <h2>Conclusion</h2>
      <p>While these five supplements form an excellent foundation for most people, individual needs vary based on diet, lifestyle, health conditions, medications, and genetic factors. It's always wise to consult with a healthcare professional before beginning any new supplement regimen, especially if you have existing health conditions or take medications.</p>
      
      <p>Remember that supplements should complement—not replace—a nutrient-dense diet, regular physical activity, quality sleep, and stress management practices. When these lifestyle factors are optimized and supported by thoughtfully selected supplements, you create a powerful foundation for lasting wellness.</p>
    `,
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

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-6">Blog Post Not Found</h1>
          <p className="mb-8">Sorry, the blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/blog">Return to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{post.title} | Life Harmony Wellness Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://lifeharmonywellness.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | Life Harmony Wellness Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow py-12">
        <article className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500">
            <ol className="flex flex-wrap">
              <li className="flex items-center">
                <Link to="/" className="hover:text-gray-700">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/blog" className="hover:text-gray-700">Blog</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">{post.title}</li>
            </ol>
          </nav>
          
          <div className="max-w-3xl mx-auto">
            {/* Post Header */}
            <header className="mb-8">
              <div className="flex items-center mb-4">
                <Link 
                  to={`/blog?category=${post.category}`}
                  className="text-primary text-sm font-medium"
                >
                  {post.category}
                </Link>
                <span className="mx-2">·</span>
                <time dateTime="2023-05-28" className="text-sm text-gray-500">
                  {post.date}
                </time>
              </div>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            </header>
            
            {/* Feature Image */}
            <div className="mb-10">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Author and Share */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-b border-gray-200 py-6 mb-12">
              <div className="flex items-center mb-4 sm:mb-0">
                <img 
                  src="https://i.pravatar.cc/150?img=12" 
                  alt="Author"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">Dr. Emma Wilson</p>
                  <p className="text-sm text-gray-500">Nutrition Specialist</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Share this article</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Email</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    to={`/blog/${relatedPost.slug}`}
                    key={relatedPost.id}
                    className="group"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-500">{relatedPost.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
