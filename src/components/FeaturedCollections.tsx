
import React from 'react';
import { Link } from 'react-router-dom';

interface Collection {
  id: number;
  title: string;
  image: string;
  link: string;
}

const collections: Collection[] = [
  {
    id: 1,
    title: 'Organic Collagen Peptides',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    link: '/collections/collagen'
  },
  {
    id: 2,
    title: 'Hydrate Electrolytes',
    image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    link: '/collections/hydration'
  },
  {
    id: 3,
    title: 'Energy & Immunity',
    image: 'https://images.unsplash.com/photo-1612431435852-9f5bdde2dbb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    link: '/collections/energy'
  }
];

const FeaturedCollections = () => {
  return (
    <section className="py-16 bg-lightGray">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Featured Collections</h2>
          <Link to="/collections" className="text-primary hover:underline font-medium">
            View all collections →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link 
              to={collection.link} 
              key={collection.id}
              className="group relative block overflow-hidden rounded-lg shadow-sm"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-xl font-medium">{collection.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
