
import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingCart, User, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 bg-background border-b z-50 shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-orange-400 to-teal-400 py-2 px-4 text-center text-sm text-white">
        <p>Free shipping on orders over ₹500 | Use code WELCOME15 for 15% off your first order</p>
      </div>
      
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
          
          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start">
              <img 
                src="/lovable-uploads/62e36359-bbd2-4212-a016-0d25dd089ece.png" 
                alt="Amraj Logo" 
                className="h-16 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            <Link to="/" className="link-hover font-medium">Home</Link>
            <Link to="/shop" className="link-hover font-medium">Shop</Link>
            <Link to="/collections" className="link-hover font-medium">Collections</Link>
            <Link to="/blog" className="link-hover font-medium">Blog</Link>
            <Link to="/about" className="link-hover font-medium">About</Link>
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/wishlist" className="hidden sm:inline-flex">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute inset-0 bg-background p-4 z-50 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-medium">Search Products</span>
              <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Close search">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <form onSubmit={handleSearch} className="border border-border rounded-md flex overflow-hidden">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 outline-none bg-background text-foreground"
                autoFocus
              />
              <Button type="submit" className="rounded-none px-4">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-background z-50 p-4 flex flex-col md:hidden animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-medium">Menu</span>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="py-2 text-lg font-medium" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/shop" className="py-2 text-lg font-medium" onClick={toggleMobileMenu}>Shop</Link>
              <Link to="/collections" className="py-2 text-lg font-medium" onClick={toggleMobileMenu}>Collections</Link>
              <Link to="/blog" className="py-2 text-lg font-medium" onClick={toggleMobileMenu}>Blog</Link>
              <Link to="/about" className="py-2 text-lg font-medium" onClick={toggleMobileMenu}>About</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
