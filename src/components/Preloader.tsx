
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  children: React.ReactNode;
}

const Preloader: React.FC<PreloaderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time (can be removed in production)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top when route changes and loading is complete
    if (!loading) {
      window.scrollTo(0, 0);
    }
    
    // Prevent scrolling when preloader is active
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-orange-100 dark:bg-orange-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 0, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex items-center justify-center"
            >
              {/* Your logo in preloader */}
              <motion.img
                src="/lovable-uploads/62e36359-bbd2-4212-a016-0d25dd089ece.png"
                alt="Amraj Logo"
                className="h-24 w-auto z-10"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated circles with brand colors */}
              <motion.div 
                className="absolute w-32 h-32 rounded-full border-4 border-orange-400 opacity-70"
                animate={{ 
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute w-40 h-40 rounded-full border-2 border-teal-300 opacity-40"
                animate={{ 
                  scale: [1.2, 1.7, 1.2],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default Preloader;
