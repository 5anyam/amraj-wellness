
import { toast } from '@/hooks/use-toast';

// Define the Razorpay options type
interface RazorpayOptions {
  key: string;
  amount: number; // in smallest currency unit (paise for INR)
  currency: string;
  name: string;
  description: string;
  order_id: string; // This should come from your WooCommerce backend
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes: {
    [key: string]: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
}

// Function to initialize Razorpay
export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      toast({
        title: "Razorpay SDK failed to load",
        description: "Please check your internet connection or try again later.",
        variant: "destructive"
      });
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Function to open Razorpay checkout
export const createRazorpayOrder = async (
  amount: number, 
  currency: string = 'INR',
  orderData: any
) => {
  // This should be replaced with an actual API call to your WooCommerce backend
  // For now, we'll mock the response
  
  try {
    // Mock response - in real implementation, this would be an API call
    const orderResponse = {
      id: 'order_' + Math.random().toString(36).substring(7),
      currency: currency,
      amount: amount
    };
    
    return orderResponse;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create order. Please try again later.');
  }
};

// Main function to handle payment
export const processRazorpayPayment = async (
  amount: number,
  orderDetails: any,
  onSuccess: (payment: any) => void,
  onFailure: (error: any) => void
) => {
  // Initialize Razorpay
  const res = await initializeRazorpay();
  
  if (!res) {
    toast({
      title: "Razorpay Failed to Load",
      description: "Check your connection or try again later.",
      variant: "destructive"
    });
    return;
  }
  
  try {
    // Create order on server
    const order = await createRazorpayOrder(amount * 100, 'INR', orderDetails);
    
    // Configure Razorpay
    const options: RazorpayOptions = {
      key: "rzp_live_BuTLIdi7g6nzab", // Updated with provided key ID
      amount: order.amount,
      currency: order.currency,
      name: "Amraj Nutrition",
      description: "Payment for your order",
      order_id: order.id,
      prefill: {
        name: orderDetails.name || "",
        email: orderDetails.email || "",
        contact: orderDetails.phone || ""
      },
      notes: {
        address: orderDetails.address || ""
      },
      theme: {
        color: "#2196F3"
      },
      handler: function (response) {
        // Handle successful payment
        onSuccess(response);
      }
    };
    
    // Initialize Razorpay
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on('payment.failed', onFailure);
    paymentObject.open();
    
  } catch (error) {
    console.error('Error processing payment:', error);
    onFailure(error);
  }
};
