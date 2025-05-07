import React from 'react';
import { motion } from 'framer-motion';

const Support = () => {
  return (
    <section id="support" className="py-20 bg-festival-peach bg-opacity-20"     
    style={{ backgroundImage: `url('/lovable-uploads/arab-bg-11.png')` }}
>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl text-festival-blue mb-6">
            Support the <span className="text-festival-gold">Festival</span>
          </h2>

          <p className="text-gray-700 text-lg mb-6">
            Festival expenses went a bit beyond what we expected. So if you’re unsure what to give — don’t worry! 
            You can simply support us with any amount you wish.
          </p>

          <div className="flex flex-col items-center space-y-4 mt-8">
            <div className="bg-white shadow-md px-6 py-4 rounded-lg">
              <p className="text-festival-blue font-semibold">BLIK number:</p>
              <p className="text-lg font-bold text-festival-gold mt-1">123 456 789</p>
            </div>

            <div className="text-center">
              <p className="text-festival-blue font-semibold mb-2">Revolut QR Code:</p>
              <img 
                src="/images/revolut-qr.png" 
                alt="Revolut QR code" 
                className="w-40 h-40 mx-auto border border-gray-300 rounded-md shadow-sm" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Support;
