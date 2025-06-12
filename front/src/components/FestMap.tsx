import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const FestMap: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const downloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/").pop() || "map.png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="festmap"
      className="py-20 bg-festival-navy relative overflow-hidden"
      style={{ backgroundImage: `url('/lovable-uploads/arab-bg-11.png')` }}
    >
      <div className="decor-pattern absolute inset-0 opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-festival-blue mb-6">
            Mbappe Mapakempu
          </h2>
        </motion.div>

        {/* Grid image + description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Image à gauche avec modal trigger */}
          <div
            className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src="/lovable-uploads/map.png"
              alt="Festival Map"
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Description à droite */}
          <div className="text-white space-y-6">
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Here’s your golden guide to never getting lost between the dancefloor and the
              tea tent. Follow the signs, trust your instincts, and remember:
              the toilets are closer than you think — but only if you check this map first.
            </p>

            <p className="text-md text-festival-gold italic font-bold">
              NB: Check it *before* the sunset, not while sprinting mid-bellydance
            </p>

            <Button
              onClick={() => downloadFile("/lovable-uploads/map.png")}
              className="bg-festival-gold text-festival-navy hover:bg-festival-gold/80"
            >
              ⬇️ Download Map
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Modal image viewer */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-black bg-opacity-90 border-none">
          <img
            src="/lovable-uploads/map.png"
            alt="Festival Map"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FestMap;
