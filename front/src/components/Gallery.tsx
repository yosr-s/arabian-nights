
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { fetchGalleryMedia } from '@/services/galleryService';


// Sample gallery items
const ITEMS_PER_PAGE = 6;



const Gallery = ({ refresh }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [filters, setFilters] = useState<{
    images: boolean;
    videos: boolean;
  }>({
    images: true,
    videos: true,
  });

  const downloadFile = async (url: string) => {
    try {
      const response = await fetch(url, { mode: 'cors' }); // Assure CORS permis
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'media';
  
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      //toast.error("Erreur lors du téléchargement.");
      console.error('Download error:', error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);

    const loadMedia = async () => {
      try {
        const items = await fetchGalleryMedia();
        setGalleryItems(items);
      } catch (error) {
        console.error('Erreur lors du chargement de la galerie :', error);
      }
    };
  
    loadMedia();
  }, [refresh,filters]);
  
   
  
  const filteredItems = galleryItems.filter(item => 
    (item.mediaType === 'photo' && filters.images) || 
    (item.mediaType === 'video' && filters.videos)
  );
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
const paginatedItems = filteredItems.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);
  
  
  const toggleFilter = (filterType: 'images' | 'videos') => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-festival-blue mb-6">
              Festival <span className="text-festival-gold">Gallery</span>
            </h2>
            
            <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
              Browse through moments captured at our Arabian Nights celebrations.
              Relive the magic and find yourself in these memories.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                onClick={() => toggleFilter('images')}
                variant={filters.images ? 'default' : 'outline'}
                className={filters.images ? 
                  'bg-festival-gold hover:bg-festival-gold/80 text-festival-blue' : 
                  'border-festival-gold text-festival-blue hover:bg-festival-gold/10'
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photos
              </Button>
              
              <Button 
                onClick={() => toggleFilter('videos')}
                variant={filters.videos ? 'default' : 'outline'}
                className={filters.videos ? 
                  'bg-festival-gold hover:bg-festival-gold/80 text-festival-blue' : 
                  'border-festival-gold text-festival-blue hover:bg-festival-gold/10'
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Videos
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedItems.map((item) => {
              const indexInFiltered = filteredItems.findIndex(i => i._id === item._id); // 🔥 CECI EST CLÉ
return (
  <motion.div 
    key={item._id}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.2 }}
    className="aspect-square relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
    onClick={() => {
      const index = filteredItems.findIndex(i => i._id === item._id);
      setSelectedIndex(index);
      setSelectedItem(item);
    }}
      >
    {item.mediaType === 'photo' ? (
      <img 
        src={item.mediaUrl} 
        alt={item.title || ''} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <video 
        src={item.mediaUrl}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        muted
      />
    )}

    {item.mediaType === 'video' && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 bg-white rounded-full bg-opacity-75 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-festival-gold" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    )}
    
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-white text-sm">{item.caption || item.title}</p>
    </div>
  </motion.div>
)
  
})}

          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center p-12 bg-gray-100 rounded-lg">
              <p className="text-gray-600">No items match the current filters.</p>
              <Button 
                onClick={() => setFilters({ images: true, videos: true })}
                variant="link"
                className="text-festival-gold mt-2"
              >
                Reset filters
              </Button>
            </div>
            
          )}
{true && (
  <div className="flex justify-center mt-8 space-x-2">
    <Button 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2"
    >
      Prev
    </Button>
    {[...Array(totalPages)].map((_, index) => (
      <Button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        variant={index + 1 === currentPage ? 'default' : 'outline'}
        className={index + 1 === currentPage 
          ? 'bg-festival-gold text-festival-blue' 
          : 'text-festival-blue border-festival-gold'}
      >
        {index + 1}
      </Button>
    ))}
    <Button 
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-4 py-2"
    >
      Next
    </Button>
  </div>
)}
        </motion.div>
        
        {/* Media viewer dialog */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => {
  if (!open) {
    setSelectedItem(null);
    setSelectedIndex(null);
  }
}}>
          <DialogContent className="sm:max-w-4xl bg-black bg-opacity-90 border-none">
            <div className="p-1 sm:p-4">
            {selectedItem?.mediaType === 'photo' ? (
  <img 
    src={selectedItem.mediaUrl} 
    alt={selectedItem.title} 
    className="w-full h-auto max-h-[70vh] object-contain"
  />
) : selectedItem?.mediaType === 'video' ? (
  <video 
    src={selectedItem.mediaUrl} 
    controls 
    autoPlay 
    className="w-full h-auto max-h-[70vh] object-contain"
  />
) : null}
<div className="flex justify-center mt-6">
  <a 
    href={selectedItem?.mediaUrl}
    download
    target="_blank"
    rel="noopener noreferrer"
    
   
  >
    <Button className="bg-festival-gold text-festival-blue hover:bg-festival-gold/80"  >
      ⬇️ Download
    </Button>
  </a>
</div>


<div className="flex justify-between mt-4">
  <Button 
    disabled={selectedIndex === 0}
    onClick={() => {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }}
  >
    ← Prev
  </Button>

  <Button 
    disabled={selectedIndex === filteredItems.length - 1}
    onClick={() => {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedItem(filteredItems[newIndex]);
    }}
  >
    Next →
  </Button>
</div>
 
              {selectedItem?.caption && (
                
                <p className="mt-4 text-white text-center">{selectedItem.caption}</p>
              )}
            </div>
          
          </DialogContent>
        </Dialog>
      </div>
   

    </section>
  );
};

export default Gallery;
