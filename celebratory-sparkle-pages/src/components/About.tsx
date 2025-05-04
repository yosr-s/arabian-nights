
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white decor-pattern">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl text-festival-blue mb-6">
            Welcome to the <span className="text-festival-gold">Arabian Experience</span>
          </h2>
          
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Join us for an extraordinary weekend of culture, music, and celebration as we transform 
            Górka Jurka into a magical Arabian oasis. From traditional dances to modern interpretations,
            from dawn till dusk, immerse yourself in the rich tapestry of Arabian culture.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-festival-peach bg-opacity-30 p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-festival-gold rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-festival-blue mb-2">Live Music</h3>
              <p className="text-gray-600">Traditional and modern Arabian melodies to move your spirit</p>
            </div>
            
            <div className="bg-festival-peach bg-opacity-30 p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-festival-gold rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-festival-blue mb-2">Cultural Feast</h3>
              <p className="text-gray-600">Authentic cuisine and refreshments for a complete sensory experience</p>
            </div>
            
            <div className="bg-festival-peach bg-opacity-30 p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-festival-gold rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-festival-blue mb-2">Community</h3>
              <p className="text-gray-600">Come together as one vibrant community to celebrate life and culture</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default About;
