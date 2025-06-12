
import React, { useEffect,useState  } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Location from '@/components/Location';
import WishesUpload from '@/components/WishesUpload';
import PhotoUpload from '@/components/PhotoUpload';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import Support from '@/components/Support';
import FestMap from "@/components/FestMap"; 
import DJLineup from "@/components/DJLineup";


const Index = () => {
  const [refreshGallery, setRefreshGallery] = useState(false);
  const handleUploadSuccess = () => {
    setRefreshGallery(prev => !prev); 
  };

  useEffect(() => {
    // Update the page title
    document.title = "Arabian Night & Arabian Day Festival";
  }, []);

  return (
    <AnimatePresence>
      <div className="relative overflow-x-hidden">
        <Navigation />
        <Hero />
        <About />
        <Location />
        <FestMap />
        <DJLineup />
        <WishesUpload />
        <PhotoUpload onUploadSuccess={handleUploadSuccess} />
        <Gallery refresh={refreshGallery} />
        <Support/>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default Index;
