
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { uploadWishes, fetchWishes } from '../services/wishesService';
import { useEffect } from 'react';



import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Image, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';


const WishesUpload = () => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [wishes, setWishes] = useState([]);
  const [selectedWish, setSelectedWish] = useState(null);
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
const [secretInput, setSecretInput] = useState('');
const [isUnlocked, setIsUnlocked] = useState(false);
const SECRET_CODE = 'PstrągTęczowy'; 




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
      toast.error("Erreur lors du téléchargement.");
      console.error('Download error:', error);
    }
  };
  
  

  useEffect(() => {
   
  
    loadWishes();
  }, []);
  
  const loadWishes = async () => {
    try {
      const data = await fetchWishes();
      console.log("retrieved wishes=",data)
      setWishes(data);
    } catch (err) {
      toast.error('Could not load wishes.');
    }
  };
  
 
  
  // Calculate pagination
  const totalPages = Math.ceil(wishes.length / itemsPerPage);
  const currentWishes = wishes.slice(  
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;
      
      if (mediaType === 'photo' && fileType.includes('image/')) {
        setMediaFile(file);
      } else if (mediaType === 'video' && fileType.includes('video/')) {
        setMediaFile(file);
      } else {
        toast.error(`Please upload a valid ${mediaType} file.`);
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
  
    if (!wish.trim() && !mediaFile) {
      toast.error('Please enter a wish or upload a photo/video.');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('wish', wish);
      formData.append('mediaType', mediaFile ? mediaType : '');
      if (mediaFile) {
        formData.append('media', mediaFile);
      }
  
      /*const response = await fetch('http://localhost:5000/api/wishes', {
        method: 'POST',
        body: formData,
      });*/
      await uploadWishes({
        name,
        wish,
        mediaType,
        mediaFile
      });
      toast.success('Your wish has been submitted successfully!');

    // Reset form
    setName('');
    setWish('');
    setMediaFile(null);
    await loadWishes();

  
     
    } catch (err) {
      toast.error('Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  return (
    <section id="wishes" className="py-20 bg-white"     style={{ backgroundImage: `url('/lovable-uploads/arab-bg-11.png')` }}
>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-festival-blue mb-6">
              Share Your <span className="text-festival-gold">Wishes</span>
            </h2>
            
            <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
              Leave a special message or upload a photo or video to share your thoughts and well-wishes for this celebration.
            </p>
          </div>
          
          <div className="bg-festival-sand bg-opacity-30 p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-festival-blue">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="border-festival-gold/30 focus:border-festival-gold focus:ring-festival-gold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-festival-blue">Upload Media (Optional)</Label>
                  <Tabs 
                    defaultValue="photo" 
                    className="w-full" 
                    onValueChange={(value) => setMediaType(value as 'photo' | 'video')}
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-2">
                      <TabsTrigger value="photo" className="flex items-center gap-1">
                        <Image className="h-4 w-4" />
                        Photo
                      </TabsTrigger>
                      <TabsTrigger value="video" className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        Video
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="photo">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleMediaChange}
                        className="border-festival-gold/30 focus:border-festival-gold focus:ring-festival-gold"
                      />
                      <p className="text-xs text-gray-500 mt-1">Max size: 10MB</p>
                    </TabsContent>
                    <TabsContent value="video">
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleMediaChange}
                        className="border-festival-gold/30 focus:border-festival-gold focus:ring-festival-gold"
                      />
                      <p className="text-xs text-gray-500 mt-1">Max size: 50MB, Max duration: 30 seconds</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wish" className="text-festival-blue">Your Message</Label>
                <Textarea
                  id="wish"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Type your wishes or message here..."
                  className="min-h-[120px] border-festival-gold/30 focus:border-festival-gold focus:ring-festival-gold"
                />
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-festival-gold hover:bg-festival-gold/80 text-festival-blue font-medium px-8 py-2 rounded-md"
                >
                  {isSubmitting ? 'Submitting...' : 'Share Your Wish'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Display wishes with pagination */}
          
          <div className="mt-16 space-y-6">
  {!isUnlocked ? (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-semibold text-festival-blue">
        🔐 To preview my <em>top secret</em> wishes...
      </h3>
      <p className="text-gray-600 italic">
        ...type the ultra confidential keyword whispered by a drunken camel on a desert rave night.
      </p>
      <Input
        value={secretInput}
        onChange={(e) => setSecretInput(e.target.value)}
        placeholder="Enter the secret word"
        className="w-full max-w-sm mx-auto border-festival-gold text-center"
      />
      <Button
        onClick={() => {
          if (secretInput.trim() === SECRET_CODE) {
            setIsUnlocked(true);
            toast.success('🧞 Access granted. Welcome to the magic lamp.');
          } else {
            toast.error("❌ That's not it. Try again, brave soul.");
          }
        }}
        className="bg-festival-blue text-white hover:bg-festival-gold"
      >
        Unlock Wishes
      </Button>
    </div>
  ) : (
    <>
      <h3 className="font-display text-2xl text-center text-festival-blue mb-8">
        Recent Wishes
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {currentWishes.map((item, index) => (
          <div
            key={item._id || item.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-festival-gold/20 flex flex-col items-center text-center space-y-3"
          >
            <h4 className="font-medium text-festival-blue text-lg">{item.name}</h4>
            <p className="text-gray-700 text-sm">{item.wish}</p>

            {item.mediaUrl && (
              <div className="mt-4 space-y-2">
                {item.mediaType === 'photo' ? (
                  <>
                    <img
                      src={item.mediaUrl}
                      alt="wish media"
                      className="rounded max-h-48 w-full object-cover"
                      onClick={() => {
                        setSelectedWish(item);
                        setSelectedIndex((currentPage - 1) * itemsPerPage + index);
                      }}
                    />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        downloadFile(item.mediaUrl);
                      }}
                      className="btn btn-primary inline-block px-4 py-2 bg-festival-blue text-white rounded hover:bg-festival-gold transition"
                    >
                      📥 Download
                    </a>
                  </>
                ) : item.mediaType === 'video' ? (
                  <>
                    <video
                      src={item.mediaUrl}
                      controls
                      className="rounded max-h-64 w-full object-cover"
                      onClick={() => {
                        setSelectedWish(item);
                        setSelectedIndex((currentPage - 1) * itemsPerPage + index);
                      }}
                    />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        downloadFile(item.mediaUrl);
                      }}
                      className="btn btn-primary inline-block px-4 py-2 bg-festival-blue text-white rounded hover:bg-festival-gold transition"
                    >
                      📥 Download
                    </a>
                  </>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Dialog
        open={!!selectedWish}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedWish(null);
            setSelectedIndex(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-4xl bg-black bg-opacity-90 border-none">
          {selectedWish && (
            <div className="p-4">
              {selectedWish.mediaType === 'photo' ? (
                <img
                  src={selectedWish.mediaUrl}
                  alt={selectedWish.name}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              ) : (
                <video
                  src={selectedWish.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              )}

              <div className="text-center mt-4 text-white">
                <h4 className="text-lg font-semibold">{selectedWish.name}</h4>
                <p className="text-sm mt-1">{selectedWish.wish}</p>
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={() =>
                    selectedWish.mediaUrl && downloadFile(selectedWish.mediaUrl)
                  }
                  className="bg-festival-gold text-festival-blue hover:bg-festival-gold/80"
                >
                  ⬇️ Download
                </Button>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  disabled={selectedIndex === 0}
                  onClick={() => {
                    const newIndex = selectedIndex! - 1;
                    if (newIndex >= 0) {
                      setSelectedIndex(newIndex);
                      setSelectedWish(wishes[newIndex]);
                    }
                  }}
                >
                  ← Prev
                </Button>

                <Button
                  disabled={selectedIndex === wishes.length - 1}
                  onClick={() => {
                    const newIndex = selectedIndex! + 1;
                    if (newIndex < wishes.length) {
                      setSelectedIndex(newIndex);
                      setSelectedWish(wishes[newIndex]);
                    }
                  }}
                >
                  Next →
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(index + 1);
                }}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )}
</div>

        </motion.div>
      </div>
      
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default WishesUpload;
