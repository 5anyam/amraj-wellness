import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;

    emailjs.send(
      'service_djbxkqp',
      'template_fswl1w4',
      { user_email: email, user_phone: phone },
      'jBYQJ_mBUGbXPqVR3'
    ).then(() => {
      setIsSubscribed(true);
      setEmail('');
      setPhone('');
    }).catch(() => {
      alert("Email send failed, try again later.");
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-orange-200"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-teal-200"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-orange-300"
        />
        <motion.div
          animate={{
            x: [-15, 15, -15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-1/2 w-20 h-20 rounded-full bg-teal-300"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img 
            src="/lovable-uploads/62e36359-bbd2-4212-a016-0d25dd089ece.png" 
            alt="Amraj Logo" 
            className="h-24 w-auto mx-auto"
          />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-orange-500">Something</span>{' '}
            <span className="text-teal-500">Amazing</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            is Coming Soon
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're crafting premium health solutions that will revolutionize your wellness journey. 
            Get ready for science-backed supplements with real results.
          </p>
        </motion.div>

        {/* Email subscription */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-md mx-auto mb-12"
        >
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <h3 className="text-xl font-medium text-foreground mb-4">
                Be the first to know when we launch!
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-orange-500 bg-background text-foreground"
                  required
                />
                 <input
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-orange-500 bg-background text-foreground"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Notify Me <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-teal-100 dark:bg-teal-900 border border-teal-300 dark:border-teal-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-2" />
                <span className="text-teal-700 dark:text-teal-300 font-medium">Thank you!</span>
              </div>
              <p className="text-teal-600 dark:text-teal-400">
                You'll be the first to know when we launch our premium health solutions.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Features preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <Star className="h-8 w-8 text-orange-500" />,
              title: "Premium Quality",
              description: "Science-backed formulas with certified ingredients",
              bgColor: "bg-orange-100 dark:bg-orange-900/30",
              borderColor: "border-orange-300 dark:border-orange-700"
            },
            {
              icon: <Sparkles className="h-8 w-8 text-teal-500" />,
              title: "Real Results",
              description: "Proven effectiveness for your wellness journey",
              bgColor: "bg-teal-100 dark:bg-teal-900/30",
              borderColor: "border-teal-300 dark:border-teal-700"
            },
            {
              icon: <Star className="h-8 w-8 text-orange-600" />,
              title: "Expert Crafted",
              description: "Developed by health and nutrition experts",
              bgColor: "bg-orange-50 dark:bg-orange-950/30",
              borderColor: "border-orange-200 dark:border-orange-800"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className={`text-center p-6 rounded-lg ${feature.bgColor} border ${feature.borderColor}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
