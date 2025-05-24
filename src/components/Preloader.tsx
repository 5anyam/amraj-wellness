
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-900 to-teal-800"
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
              {/* Logo in preloader - updated to Amraj */}
              <div className="relative z-10 text-3xl font-bold text-white gradient-text animate-glow">
                AMRAJ
                <div className="text-sm text-center font-normal text-cyan mt-1">Nutrition</div>
              </div>
              
              {/* Animated circles with futuristic look */}
              <motion.div 
                className="absolute w-24 h-24 rounded-full border-4 border-blue-400 opacity-70"
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
                className="absolute w-32 h-32 rounded-full border-2 border-teal-300 opacity-40"
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
