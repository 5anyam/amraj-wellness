import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getProduct } from '@/lib/api';
import { Product } from '@/components/ProductCard';
import { createProductSlug } from '@/lib/slugUtils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ProductImageGallery from '@/components/ProductImageGallery';
import RelatedProducts from '@/components/RelatedProducts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Tag, Gift, Percent, Check, ShoppingCart } from "lucide-react";
import { toast } from '@/hooks/use-toast';

// Discount tiers for subscription purchases
const DISCOUNT_TIERS = [
  { months: 2, discount: 10 },
  { months: 3, discount: 15 }
];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const [selectedMonths, setSelectedMonths] = useState<number>(1); // Default to 1 month
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [offerActive, setOfferActive] = useState<boolean>(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (slug) {
        const fetchedProduct = await getProduct(slug);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setFinalPrice(fetchedProduct.price);
          
          // Update URL to canonical slug format if needed
          const canonicalSlug = createProductSlug(fetchedProduct);
          if (slug !== canonicalSlug) {
            navigate(`/product/${canonicalSlug}`, { replace: true });
          }
        }
        window.scrollTo(0, 0);
      }
      setLoading(false);
    };
    
    fetchProduct();
  }, [slug, navigate]);
  
  // Update discount based on quantity changes
  useEffect(() => {
    if (product) {
      // Determine offer based on quantity
      let months = quantity;
      let discount = 0;
      
      if (quantity >= 3) {
        discount = 15;
        months = quantity;
      } else if (quantity === 2) {
        discount = 10;
        months = 2;
      } else {
        discount = 0;
        months = 1;
      }
      
      // Update state with new values
      setSelectedMonths(months);
      setDiscountPercent(discount);
      
      if (discount > 0) {
        const discountedPrice = product.price * (1 - discount / 100);
        setFinalPrice(discountedPrice);
        setOfferActive(true);
      } else {
        setFinalPrice(product.price);
        setOfferActive(false);
      }
    }
  }, [quantity, product]);
  
  const handleAddToCart = () => {
    if (product) {
      // Create a modified product with subscription info if multi-month purchase
      const cartProduct = {
        ...product,
        price: finalPrice, // Use the discounted price
        subscription_info: quantity > 1 ? {
          months: quantity,
          discountApplied: discountPercent
        } : undefined
      };
      
      addToCart(cartProduct, quantity);

      // Show a toast notification with supply duration info
      const durationMessage = quantity > 1 
        ? `${quantity} month supply with ${discountPercent}% discount` 
        : "1 month supply";
        
      toast({
        title: "Added to cart",
        description: `${product.name} (${durationMessage}) added to your cart`
      });
    }
  };
  
  // Handle supply duration selection
  const handleSupplyDurationChange = (months: number) => {
    if (months === selectedMonths) return; // No change
    
    // Set quantity based on selected months
    setQuantity(months);
    
    toast({
      title: months === 1 ? "Standard pricing applied" : "Offer applied!",
      description: months === 1 
        ? "You've selected a single month supply." 
        : `${months} month supply selected with ${months >= 3 ? '15%' : '10%'} discount!`,
      variant: months === 1 ? "default" : "default"
    });
  };
  
  // Calculate standard discount percentage if both regular and sale prices exist
  const regularDiscountPercentage = product?.regular_price && product.price < product.regular_price
    ? Math.round(((product.regular_price - product.price) / product.regular_price) * 100)
    : 0;

  const hasDiscount = regularDiscountPercentage > 0;
  
  // Function to safely render HTML content
  const createMarkup = (html: string) => {
    return { __html: html };
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
            <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
            <Button asChild>
              <a href="/shop">Return to Shop</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{product?.name} | Amraj Nutrition</title>
        <meta name="description" content={product?.short_description || `${product?.name} - Health supplements for your wellbeing`} />
        <link rel="canonical" href={`${window.location.origin}/product/${product ? createProductSlug(product) : slug}`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image Gallery with Zoom */}
            <div>
              <ProductImageGallery 
                images={product.gallery || [product.image]} 
                productName={product.name} 
              />
            </div>
            
            {/* Product Details */}
            <div>
              {product.category && (
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              )}
              
              <h1 className="text-3xl font-bold mb-4 gradient-text">{product.name}</h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-primary">₹{finalPrice.toFixed(2)}</span>
                
                {hasDiscount && (
                  <>
                    <span className="text-muted-foreground line-through">₹{product.regular_price?.toFixed(2)}</span>
                    <Badge className="bg-gradient-to-r from-orange-500 to-teal-500">
                      {regularDiscountPercentage}% OFF
                    </Badge>
                  </>
                )}

                {offerActive && (
                  <Badge className="bg-gradient-to-r from-teal-500 to-orange-500 ml-2 animate-pulse">
                    <Percent className="w-3 h-3 mr-1" />
                    {discountPercent}% Subscription Discount
                  </Badge>
                )}
              </div>
              
              {product.short_description && (
                <div className="prose mb-8 text-foreground">
                  <div dangerouslySetInnerHTML={createMarkup(product.short_description)} />
                </div>
              )}

              {/* Enhanced Subscription Option with Better Design */}
              <div className="mb-8 bg-gradient-to-r from-orange-50 to-teal-50 dark:from-orange-950/20 dark:to-teal-950/20 rounded-lg overflow-hidden shadow-md">
                <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">Choose Supply Duration & Save</h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-5 gap-3">
                    <Button 
                      variant={selectedMonths === 1 ? "default" : "outline"} 
                      className={`relative h-auto py-3 transition-all duration-300 ${selectedMonths === 1 ? "bg-gradient-to-r from-orange-500 to-teal-500 shadow-md" : "hover:bg-orange-50 dark:hover:bg-orange-950/20"}`}
                      onClick={() => handleSupplyDurationChange(1)}
                    >
                      <div className="flex flex-col items-center">
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-xs md:text-sm font-medium">1 Month</span>
                        {selectedMonths === 1 && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </Button>
                    
                    <Button 
                      variant={selectedMonths === 2 ? "default" : "outline"}
                      className={`relative h-auto py-3 transition-all duration-300 ${selectedMonths === 2 ? "bg-gradient-to-r from-orange-500 to-teal-500 shadow-md" : "hover:bg-orange-50 dark:hover:bg-orange-950/20"}`}
                      onClick={() => handleSupplyDurationChange(2)}
                    >
                      <div className="flex flex-col items-center">
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-xs md:text-sm font-medium">2 Months</span>
                        <Badge className="mt-1 bg-orange-500/20 text-orange-700 dark:text-orange-300 border-0 text-xs">
                          Save 10%
                        </Badge>
                        {selectedMonths === 2 && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </Button>
                    
                    <Button 
                      variant={selectedMonths >= 3 && selectedMonths <= 3 ? "default" : "outline"}
                      className={`relative h-auto py-3 transition-all duration-300 ${selectedMonths >= 3 && selectedMonths <= 3 ? "bg-gradient-to-r from-orange-500 to-teal-500 shadow-md" : "hover:bg-teal-50 dark:hover:bg-teal-950/20"}`}
                      onClick={() => handleSupplyDurationChange(3)}
                    >
                      <div className="flex flex-col items-center">
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-xs md:text-sm font-medium">3 Months</span>
                        <Badge className="mt-1 bg-teal-500/20 text-teal-700 dark:text-teal-300 border-0 text-xs">
                          Save 15%
                        </Badge>
                        {selectedMonths >= 3 && selectedMonths <= 3 && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </Button>
                    
                    <Button 
                      variant={selectedMonths >= 4 && selectedMonths <= 4 ? "default" : "outline"}
                      className={`relative h-auto py-3 transition-all duration-300 ${selectedMonths >= 4 && selectedMonths <= 4 ? "bg-gradient-to-r from-orange-500 to-teal-500 shadow-md" : "hover:bg-teal-50 dark:hover:bg-teal-950/20"}`}
                      onClick={() => handleSupplyDurationChange(4)}
                    >
                      <div className="flex flex-col items-center">
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-xs md:text-sm font-medium">4 Months</span>
                        <Badge className="mt-1 bg-teal-500/20 text-teal-700 dark:text-teal-300 border-0 text-xs">
                          Save 15%
                        </Badge>
                        {selectedMonths >= 4 && selectedMonths <= 4 && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </Button>
                    
                    <Button 
                      variant={selectedMonths >= 5 ? "default" : "outline"}
                      className={`relative h-auto py-3 transition-all duration-300 ${selectedMonths >= 5 ? "bg-gradient-to-r from-orange-500 to-teal-500 shadow-md" : "hover:bg-teal-50 dark:hover:bg-teal-950/20"}`}
                      onClick={() => handleSupplyDurationChange(5)}
                    >
                      <div className="flex flex-col items-center">
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-xs md:text-sm font-medium">5+ Months</span>
                        <Badge className="mt-1 bg-teal-500/20 text-teal-700 dark:text-teal-300 border-0 text-xs">
                          Save 15%
                        </Badge>
                        {selectedMonths >= 5 && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </Button>
                  </div>
                  
                  {offerActive ? (
                    <div className="mt-4 bg-gradient-to-r from-orange-100/50 to-teal-100/50 dark:from-orange-950/30 dark:to-teal-950/30 p-3 rounded-md flex items-center">
                      <div className="bg-gradient-to-r from-orange-500 to-teal-500 rounded-full p-2 mr-3">
                        <Gift className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-orange-800 dark:text-orange-200">
                          <span className="text-teal-600 dark:text-teal-400 font-bold">{discountPercent}% discount</span> applied to your {quantity} month supply!
                        </p>
                        <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                          You're saving ₹{((product.price * quantity) - (finalPrice * quantity)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 bg-orange-50 dark:bg-orange-950/20 p-3 rounded-md text-sm text-orange-700 dark:text-orange-300 flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" />
                      <p>Choose a multi-month supply above and save up to 15% on your purchase!</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="quantity" className="font-medium text-foreground">
                    Quantity
                  </label>
                  {offerActive && (
                    <span className="text-sm text-primary">
                      Subscription quantity: {quantity}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-4 py-2 border border-border rounded-l-md bg-muted hover:bg-muted/80 transition-colors text-foreground"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-y border-border py-2 focus:outline-none focus:ring-1 focus:ring-primary bg-background text-foreground"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border border-border rounded-r-md bg-muted hover:bg-muted/80 transition-colors text-foreground"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                {quantity !== selectedMonths && selectedMonths > 1 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                    Note: Changing quantity may adjust your subscription discount.
                  </p>
                )}
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 transition-all hover:shadow-lg py-6 text-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                Add to Cart
              </Button>
              
              <Separator className="my-8" />
              
              {/* Product Description Tabs */}
              <Tabs defaultValue="description" className="w-full mt-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="additional">Additional Information</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-6">
                  {product.description ? (
                    <div className="prose max-w-none text-foreground" dangerouslySetInnerHTML={createMarkup(product.description)} />
                  ) : (
                    <p className="text-muted-foreground">No description available.</p>
                  )}
                </TabsContent>
                <TabsContent value="additional" className="pt-6">
                  <div className="space-y-4">
                    {product.tag && (
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Tags:</span>
                        <span className="col-span-2 text-foreground">{product.tag}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="col-span-2 text-foreground">{product.category || 'Uncategorized'}</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products Section */}
          {product.id && (
            <RelatedProducts productId={product.id} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
