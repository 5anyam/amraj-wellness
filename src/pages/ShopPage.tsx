
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getPaginatedProducts, getCategories } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All Products', parent: 0 }
  ]);
  
  const categoryParam = searchParams.get('category') || 'all';
  
  useEffect(() => {
    // Fetch categories from WooCommerce
    const fetchCategories = async () => {
      try {
        const wooCategories = await getCategories();
        
        // Filter to only include parent categories (parent = 0)
        const parentCategories = wooCategories.filter(cat => cat.parent === 0);
        
        // Always include All Products
        setCategories([
          { id: 'all', name: 'All Products', parent: 0 },
          ...parentCategories,
          { id: 'new', name: 'New Arrivals', parent: 0 }
        ]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const category = categoryParam !== 'all' ? categoryParam : undefined;
        const search = searchParams.get('search') || undefined;
        
        const response = await getPaginatedProducts(
          currentPage,
          12,
          category,
          search
        );
        
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [currentPage, categoryParam, searchParams]);
  
  const handleCategoryChange = (categoryId) => {
    setCurrentPage(1);
    setSearchParams({ category: categoryId });
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    
    setSearchParams(params);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Determine page title based on category
  let pageTitle = 'All Products';
  const selectedCategory = categories.find(cat => cat.id === categoryParam);
  if (selectedCategory) {
    pageTitle = selectedCategory.name;
  }
  
  const searchParamValue = searchParams.get('search');
  if (searchParamValue) {
    pageTitle = `Search Results: "${searchParamValue}"`;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{pageTitle} | Life Harmony Wellness</title>
        <meta name="description" content={`Shop our collection of ${pageTitle.toLowerCase()} at Life Harmony Wellness. Premium quality, science-backed health supplements.`} />
        <link rel="canonical" href={`https://lifeharmonywellness.com${location.pathname}${location.search}`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" className="rounded-l-none">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={categoryParam === category.id ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.id)}
                  className="mb-2"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">No products found</h2>
              <p className="text-gray-500 mb-8">Try adjusting your search or filter to find what you're looking for.</p>
              <Button onClick={() => {
                setSearchParams({});
                setSearchQuery('');
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopPage;
