import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DJLineup: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const downloadLineup = async () => {
    try {
      const response = await fetch('/lovable-uploads/dj-lineup.pdf');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "dj-lineup.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("❌ Failed to download lineup:", err);
    }
  };

  return (
    <section id="djlineup" className="py-20 bg-festival-blue relative overflow-hidden">
      <div className="decor-pattern absolute inset-0 opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-festival-gold mb-4">
            Get Ready for the <span className="text-white">Night 🎧</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Description à gauche */}
          <div className="text-white space-y-6 order-2 md:order-1">
            <p className="text-lg text-gray-200 leading-relaxed">
             From indie dance techno to soulful melodic house, our music sets will be curated to elevate your spirit and move your feet. Whether you're jumping under the stars or vibing at dawn, these DJs will keep your energy soaring.

            </p>

            <p className="text-sm text-festival-gold italic font-bold">
              Check out the full lineup and set times. Don’t miss your favorite beat! 🔥
            </p>

            <Button
              onClick={downloadLineup}
              className="bg-festival-gold text-festival-blue hover:bg-festival-gold/80"
            >
              ⬇️ Download Lineup
            </Button>
          </div>

          {/* Image à droite avec clic pour modal */}
          <div
            className="rounded-lg overflow-hidden shadow-lg order-1 md:order-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src="/lovable-uploads/dj.png"
              alt="DJ Lineup Poster"
              className="w-full h-auto max-h-[700px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-black bg-opacity-90 border-none">
          <img
            src="/lovable-uploads/dj.png"
            alt="DJ Lineup Poster"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DJLineup;
