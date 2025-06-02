import { Product } from '@/components/ProductCard';
import { generateSlug } from './slugUtils';
import { 
  fetchWooCommerceProducts,
  fetchWooCommerceProduct,
  fetchWooCommerceProductsByCategory,
  fetchPaginatedWooCommerceProducts,
  fetchWooCommerceCategories,
  fetchRelatedProducts,
  fetchMostSellingProducts,
  fetchNewArrivals
} from './woocommerce';

// Define the WooCommerce REST API endpoint
const BASE_URL = 'https://atulyamedilinkpvtltd.shop/wp-json/wc/v3';

// Interface for API response formats
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// Function to fetch all products
export const getProducts = async (): Promise<Product[]> => {
  // Use WooCommerce API to fetch products
  return fetchWooCommerceProducts();
};

// Function to fetch a single product by slug or ID
export const getProduct = async (slugOrId: string | number): Promise<Product | null> => {
  let productId: number;
  
  if (typeof slugOrId === 'string') {
    // If it's a string slug, try to find product by name match
    const products = await fetchWooCommerceProducts();
    const product = products.find(p => 
      slugOrId === generateSlug(p.name) || 
      slugOrId.includes(generateSlug(p.name))
    );
    if (!product) return null;
    productId = product.id;
  } else {
    productId = slugOrId;
  }
  
  // Use WooCommerce API to fetch single product
  return fetchWooCommerceProduct(productId);
};

// Function to fetch products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // Use WooCommerce API to fetch products by category
  return fetchWooCommerceProductsByCategory(category);
};

// Function to fetch paginated products
export const getPaginatedProducts = async (
  page: number = 1,
  perPage: number = 10,
  category?: string,
  search?: string
): Promise<PaginatedResponse<Product>> => {
  // Use WooCommerce API to fetch paginated products
  return fetchPaginatedWooCommerceProducts(page, perPage, category, search);
};

// Function to fetch all categories
export const getCategories = async (): Promise<{id: string, name: string, parent: number}[]> => {
  // Use WooCommerce API to fetch categories
  return fetchWooCommerceCategories();
};

// Function to fetch related products
export const getRelatedProducts = async (productId: number): Promise<Product[]> => {
  return fetchRelatedProducts(productId);
};

// Function to fetch most selling products
export const getMostSellingProducts = async (limit: number = 4): Promise<Product[]> => {
  return fetchMostSellingProducts(limit);
};

// Function to fetch new arrivals
export const getNewArrivals = async (limit: number = 4): Promise<Product[]> => {
  return fetchNewArrivals(limit);
};
