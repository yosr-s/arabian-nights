
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-festival-blue">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/d296344f-8d67-47cb-b617-faf67fad5562.png" 
          alt="Arabian Night Festival" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-festival-blue/70 via-transparent to-festival-blue"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-festival-gold mb-6"
          >
            Arabian Night <br className="md:hidden" />
            <span className="text-white">&</span> Arabian Day
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-white text-xl md:text-2xl mb-8 font-light"
          >
            Festiwal Dannegoo 3.6
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="bg-festival-navy/30 backdrop-blur-sm p-6 rounded-lg inline-block"
          >
            <p className="text-white text-lg mb-2">
              Fri, May 16 at 5:00 PM GMT+2 - Sun, May 18 at 8:00 PM GMT+2
            </p>
            <p className="text-festival-gold font-medium">
              Wieża Bismarcka, Łagiewniki, Dolnośląskie
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a 
            href="#about" 
            className="flex flex-col items-center text-white hover:text-festival-gold transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-sm mb-2">Discover More</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
