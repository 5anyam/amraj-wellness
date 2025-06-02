import { toast } from '@/hooks/use-toast';
import { processRazorpayPayment } from './razorpay';
import { Product } from '@/components/ProductCard';

// Define types for WooCommerce API responses
interface WooCommerceProduct {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: { src: string }[];
  description: string;
  short_description: string;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  related_ids: number[];
}

interface WooCommerceOrder {
  id: number;
  status: string;
  total: string;
  line_items: {
    product_id: number;
    quantity: number;
    total: string;
  }[];
  payment_method: string;
  payment_method_title: string;
}

interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

// Configuration for WooCommerce REST API
export const WC_API_CONFIG = {
  url: "https://atulyamedilinkpvtltd.shop",
  consumerKey: "ck_85e8cd528fe7cc01b4776563635dcfdd1d4816d8",
  consumerSecret: "cs_2caab97bdc119fd281bbc1a28e7b2c9692d0667f",
  version: "wc/v3"
};

// Configuration for Razorpay
export const RAZORPAY_CONFIG = {
  keyId: "rzp_live_BuTLIdi7g6nzab",
  keySecret: "cvYVOPAx8K3Pmx6xAHR90nOe"
};

// Function to create authentication headers
const getAuthHeaders = () => {
  const token = btoa(`${WC_API_CONFIG.consumerKey}:${WC_API_CONFIG.consumerSecret}`);
  return {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`
  };
};

// Function to fetch all categories from WooCommerce
export const fetchWooCommerceCategories = async (): Promise<{id: string, name: string, parent: number}[]> => {
  try {
    const url = `${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/products/categories?per_page=100`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    const categories: WooCommerceCategory[] = await response.json();
    
    // Convert to the format we need
    return categories.map(cat => ({
      id: cat.slug,
      name: cat.name,
      parent: cat.parent
    }));
    
  } catch (error) {
    console.error('Error fetching WooCommerce categories:', error);
    toast({
      title: "Failed to fetch categories",
      description: "Couldn't connect to the WooCommerce store. Using default categories instead.",
      variant: "destructive"
    });
    
    // Return default "all" category if we can't fetch
    return [{ id: 'all', name: 'All Products', parent: 0 }];
  }
};

// Function to fetch products from WooCommerce
export const fetchWooCommerceProducts = async (page = 1, perPage = 12, category?: string, search?: string): Promise<Product[]> => {
  try {
    let url = `${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/products?page=${page}&per_page=${perPage}&status=publish`;
    
    if (category && category !== 'all' && category !== 'new') {
      url += `&category=${category}`;
    }
    
    if (category === 'new') {
      url += '&orderby=date&order=desc';
    }
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    console.log('Fetching products from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const wcProducts: WooCommerceProduct[] = await response.json();
    console.log('WooCommerce products:', wcProducts);
    
    // Convert WooCommerce products to our app's Product format
    return wcProducts.map(wcProduct => ({
      id: wcProduct.id,
      name: wcProduct.name,
      price: parseFloat(wcProduct.price || wcProduct.regular_price || "0"),
      regular_price: parseFloat(wcProduct.regular_price || "0"),
      sale_price: parseFloat(wcProduct.sale_price || "0"),
      image: wcProduct.images[0]?.src || 'placeholder.svg',
      gallery: wcProduct.images.map(img => img.src),
      description: wcProduct.description || '',
      short_description: wcProduct.short_description || '',
      category: wcProduct.categories[0]?.name || '',
      tag: wcProduct.tags[0]?.name,
      related_ids: wcProduct.related_ids || []
    }));
    
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error);
    toast({
      title: "Failed to fetch products",
      description: "Couldn't connect to the WooCommerce store. Please check your connection and try again.",
      variant: "destructive"
    });
    
    // Return empty array in case of failure
    return [];
  }
};

// Function to fetch a single product from WooCommerce
export const fetchWooCommerceProduct = async (productId: number): Promise<Product | null> => {
  try {
    const url = `${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/products/${productId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    const wcProduct: WooCommerceProduct = await response.json();
    
    return {
      id: wcProduct.id,
      name: wcProduct.name,
      price: parseFloat(wcProduct.price || wcProduct.regular_price || "0"),
      regular_price: parseFloat(wcProduct.regular_price || "0"),
      sale_price: parseFloat(wcProduct.sale_price || "0"),
      image: wcProduct.images[0]?.src || 'placeholder.svg',
      gallery: wcProduct.images.map(img => img.src),
      description: wcProduct.description || '',
      short_description: wcProduct.short_description || '',
      category: wcProduct.categories[0]?.name || '',
      tag: wcProduct.tags[0]?.name,
      related_ids: wcProduct.related_ids || []
    };
    
  } catch (error) {
    console.error('Error fetching WooCommerce product:', error);
    toast({
      title: "Failed to fetch product",
      description: "Couldn't retrieve the product details. Please try again later.",
      variant: "destructive"
    });
    
    return null;
  }
};

// Function to fetch WooCommerce products by category
export const fetchWooCommerceProductsByCategory = async (category: string, page = 1, perPage = 12): Promise<Product[]> => {
  return fetchWooCommerceProducts(page, perPage, category);
};

// Function to fetch paginated WooCommerce products with total pages info
export const fetchPaginatedWooCommerceProducts = async (
  page: number = 1,
  perPage: number = 12,
  category?: string,
  search?: string
): Promise<{data: Product[], total: number, totalPages: number, currentPage: number}> => {
  try {
    let url = `${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/products?page=${page}&per_page=${perPage}&status=publish`;
    
    if (category && category !== 'all' && category !== 'new') {
      url += `&category=${category}`;
    }
    
    if (category === 'new') {
      url += '&orderby=date&order=desc';
    }
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const wcProducts: WooCommerceProduct[] = await response.json();
    const total = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    
    // Convert WooCommerce products to our app's Product format
    const products = wcProducts.map(wcProduct => ({
      id: wcProduct.id,
      name: wcProduct.name,
      price: parseFloat(wcProduct.price || wcProduct.regular_price || "0"),
      regular_price: parseFloat(wcProduct.regular_price || "0"),
      sale_price: parseFloat(wcProduct.sale_price || "0"),
      image: wcProduct.images[0]?.src || 'placeholder.svg',
      gallery: wcProduct.images.map(img => img.src),
      description: wcProduct.description || '',
      short_description: wcProduct.short_description || '',
      category: wcProduct.categories[0]?.name || '',
      tag: wcProduct.tags[0]?.name,
      related_ids: wcProduct.related_ids || []
    }));
    
    return {
      data: products,
      total,
      totalPages,
      currentPage: page
    };
    
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    toast({
      title: "Failed to fetch products",
      description: "Couldn't connect to the WooCommerce store. Please try again later.",
      variant: "destructive"
    });
    
    return {
      data: [],
      total: 0,
      totalPages: 1,
      currentPage: page
    };
  }
};

// Function to fetch related products
export const fetchRelatedProducts = async (productId: number): Promise<Product[]> => {
  try {
    // First get the product to find related_ids
    const product = await fetchWooCommerceProduct(productId);
    
    if (!product || !product.related_ids || product.related_ids.length === 0) {
      return [];
    }
    
    // Fetch each related product
    const relatedProducts: Product[] = [];
    
    // Only get up to 4 related products to avoid too many requests
    const relatedIds = product.related_ids.slice(0, 4);
    
    for (const id of relatedIds) {
      const relatedProduct = await fetchWooCommerceProduct(id);
      if (relatedProduct) {
        relatedProducts.push(relatedProduct);
      }
    }
    
    return relatedProducts;
    
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
};

// Function to fetch most selling products (popular products)
export const fetchMostSellingProducts = async (limit: number = 4): Promise<Product[]> => {
  try {
    const url = `${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/products?orderby=popularity&order=desc&per_page=${limit}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch popular products: ${response.status}`);
    }
    
    const wcProducts: WooCommerceProduct[] = await response.json();
    
    // Convert WooCommerce products to our app's Product format
    return wcProducts.map(wcProduct => ({
      id: wcProduct.id,
      name: wcProduct.name,
      price: parseFloat(wcProduct.price || wcProduct.regular_price || "0"),
      regular_price: parseFloat(wcProduct.regular_price || "0"),
      sale_price: parseFloat(wcProduct.sale_price || "0"),
      image: wcProduct.images[0]?.src || 'placeholder.svg',
      gallery: wcProduct.images.map(img => img.src),
      description: wcProduct.description || '',
      short_description: wcProduct.short_description || '',
      category: wcProduct.categories[0]?.name || '',
      tag: wcProduct.tags[0]?.name,
      related_ids: wcProduct.related_ids || []
    }));
    
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return [];
  }
};

// Function to fetch new arrivals (latest products)
export const fetchNewArrivals = async (limit: number = 4): Promise<Product[]> => {
  try {
    const url = `${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/products?orderby=date&order=desc&per_page=${limit}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch new arrivals: ${response.status}`);
    }
    
    const wcProducts: WooCommerceProduct[] = await response.json();
    
    // Convert WooCommerce products to our app's Product format
    return wcProducts.map(wcProduct => ({
      id: wcProduct.id,
      name: wcProduct.name,
      price: parseFloat(wcProduct.price || wcProduct.regular_price || "0"),
      regular_price: parseFloat(wcProduct.regular_price || "0"),
      sale_price: parseFloat(wcProduct.sale_price || "0"),
      image: wcProduct.images[0]?.src || 'placeholder.svg',
      gallery: wcProduct.images.map(img => img.src),
      description: wcProduct.description || '',
      short_description: wcProduct.short_description || '',
      category: wcProduct.categories[0]?.name || '',
      tag: wcProduct.tags[0]?.name,
      related_ids: wcProduct.related_ids || []
    }));
    
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
};

// Function to create an order in WooCommerce
export const createWooCommerceOrder = async (
  items: { product_id: number; quantity: number }[],
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: {
      address_1: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
    }
  }
): Promise<WooCommerceOrder> => {
  try {
    const orderData = {
      payment_method: "razorpay",
      payment_method_title: "Razorpay",
      set_paid: false,
      customer_id: 0, // Guest checkout
      billing: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone || "",
        address_1: customer.address?.address_1 || "",
        city: customer.address?.city || "",
        state: customer.address?.state || "",
        postcode: customer.address?.postcode || "",
        country: customer.address?.country || "IN"
      },
      shipping: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        address_1: customer.address?.address_1 || "",
        city: customer.address?.city || "",
        state: customer.address?.state || "",
        postcode: customer.address?.postcode || "",
        country: customer.address?.country || "IN"
      },
      line_items: items
    };
    
    const response = await fetch(`${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error creating WooCommerce order:', error);
    toast({
      title: "Failed to create order",
      description: "There was a problem processing your order. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};

// Function to process payment with Razorpay
export const processPayment = async (
  order: WooCommerceOrder,
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    onSuccess?: () => void;
    onError?: (error: any) => void;
  }
) => {
  const { name, email, phone, address, onSuccess, onError } = customerInfo;
  const amount = parseFloat(order.total);
  
  try {
    await processRazorpayPayment(
      amount,
      {
        name,
        email,
        phone,
        address
      },
      async (payment) => {
        // On successful payment, update the order status
        await updateOrderPaymentStatus(order.id, payment.razorpay_payment_id);
        
        toast({
          title: "Payment successful",
          description: "Your order has been placed successfully!",
        });
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Fallback if no callback provided
          window.location.href = `/order-confirmation/${order.id}`;
        }
      },
      (error) => {
        // Call the onError callback if provided
        if (onError) {
          onError(error);
        } else {
          toast({
            title: "Payment failed",
            description: error.description || "There was a problem processing your payment.",
            variant: "destructive"
          });
        }
      }
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    toast({
      title: "Payment failed",
      description: "There was a problem processing your payment.",
      variant: "destructive"
    });
    
    // Call the onError callback if provided
    if (onError) {
      onError(error);
    }
  }
};

// Function to update order payment status
const updateOrderPaymentStatus = async (orderId: number, paymentId: string) => {
  try {
    const response = await fetch(`${WC_API_CONFIG.url}/wp-json/${WC_API_CONFIG.version}/orders/${orderId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        status: 'processing',
        transaction_id: paymentId,
        set_paid: true
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update order: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error updating order status:', error);
    // Still consider payment successful, just log the error
  }
};
