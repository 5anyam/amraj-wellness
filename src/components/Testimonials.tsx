
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "I've been using the Vitamin D3+K2 supplement for three months now, and my energy levels have significantly improved. My recent blood work also showed my vitamin D levels are optimal now!",
    product: "Vitamin D3+K2"
  },
  {
    id: 2,
    name: "Michael Torres",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "The Marine Collagen has been a game-changer for my skin. After six weeks of consistent use, I've noticed improved elasticity and hydration. My friends have even commented on how much my skin is glowing!",
    product: "Marine Collagen Peptides"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    text: "I love the Electrolytes supplement! Perfect for post-workout hydration and tastes great. I've noticed much better recovery times since adding this to my routine.",
    product: "Hydrate Electrolytes"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-mint/30">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">
            Don't just take our word for it. Hear from people who have transformed their health with our supplements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {testimonial.avatar && (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4">"{testimonial.text}"</blockquote>
              <p className="text-sm text-gray-500">Product: {testimonial.product}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
