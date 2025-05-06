
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { uploadGalleryMedia } from '@/services/galleryService';


const PhotoUpload = ({ onUploadSuccess }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  const handleFiles = (files: File[]) => {
    const validFiles: File[] = [];
    const validPreviews: string[] = [];
  
    files.forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      }
    });
  
    if (validFiles.length === 0) {
      toast.error('Please upload valid image or video files.');
      return;
    }
  
    setImages(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...validPreviews]);
  
    toast.success(`${validFiles.length} file(s) added`);
  };
  
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = () => {
    setDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setPreviews(newPreviews);
  };
  
  const handleUpload = async () => {
    if (images.length === 0) {
      toast.error('Veuillez ajouter au moins une image à uploader');
      return;
    }
  
    const formData = new FormData();
    images.forEach((file) => {
      formData.append('media', file); // Le backend attend un champ 'media'
    });
  
    setUploading(true);
  
    try {
      await uploadGalleryMedia(formData);
      toast.success('Vos photos ont été envoyées avec succès !');
  
      previews.forEach(preview => URL.revokeObjectURL(preview));
      setImages([]);
      setPreviews([]);
      if (onUploadSuccess) onUploadSuccess();

    } catch (error) {
      toast.error('Erreur lors de l’envoi. Réessayez.');
    } finally {
      setUploading(false);
    }
  };
  
  
  return (
    
//     <section id="upload" className="py-20 bg-festival-peach bg-opacity-20">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="max-w-4xl mx-auto"
//         >
//           <div className="text-center mb-12">
//             <h2 className="font-display text-4xl md:text-5xl text-festival-blue mb-6">
//               Share Your <span className="text-festival-gold">Moments</span>
//             </h2>
            
//             <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
//               Upload your favorite photos from the festival to share with our community.
//             </p>
//           </div>
          
//           <div 
//             className={cn(
//               "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
//               dragging 
//                 ? "border-festival-gold bg-festival-gold/10" 
//                 : "border-gray-300 hover:border-festival-gold"
//             )}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             <div className="space-y-6">
//               <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-festival-gold/20">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-festival-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
              
//               <div>
//                 <p className="text-lg font-medium text-festival-blue">
//                   Drag and drop your media here
//                 </p>
//                 <p className="text-gray-500 text-sm mt-1">
//                   Or click to browse your files
//                 </p>
//               </div>
              
//               <div className="flex justify-center">
//                 <Label 
//                   htmlFor="media" 
//                   className="cursor-pointer bg-festival-gold hover:bg-festival-gold/80 text-festival-blue font-medium px-5 py-2 rounded-md"
//                 >
//                   Browse Media
//                 </Label>
//                 <Input 
//   id="media" 
//   type="file" 
//   accept="image/*,video/*" 
//   multiple
//   onChange={handleFileChange}
//   className="sr-only"
// />
//               </div>
              
//               <p className="text-xs text-gray-500">
//                 Supported formats: JPEG, PNG, GIF, etc. | Max size per image: 10MB
//               </p>
//             </div>
//           </div>
          
//           {/* Preview uploaded images */}
//           {previews.length > 0 && (
//             <div className="mt-8">
//               <h3 className="font-display text-xl text-festival-blue mb-4">
//                 Selected Media ({previews.length})
//               </h3>
              
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {previews.map((preview, index) => (
//                   <div key={index} className="relative group aspect-square">
//                    {images[index].type.startsWith('image/') ? (
//   <img src={preview} alt={`Preview ${index + 1}`} className="..." />
// ) : (
//   <video src={preview} className="w-full h-full object-cover rounded-md" muted />
// )}

//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                       aria-label="Remove image"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-6 flex justify-center">
//                 <Button
//                   onClick={handleUpload}
//                   disabled={uploading}
//                   className="bg-festival-blue hover:bg-festival-blue/80 text-white font-medium px-8 py-2 rounded-md"
//                 >
//                   {uploading ? (
//                     <span className="flex items-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Uploading...
//                     </span>
//                   ) : 'Upload Media'}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>
      
//       <div className="section-divider mt-20"></div>
//     </section>
<section id="upload" className="py-20 bg-festival-peach bg-opacity-20">
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
        Share Your <span className="text-festival-gold">Moments</span>
      </h2>
      <p className="text-gray-700 text-lg mb-8 max-w-3xl mx-auto">
        Upload your favorite photos from the festival to share with our community.
      </p>
    </div>

    <div 
      className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300 hover:border-festival-gold transition-colors"
    >
      <div className="space-y-6">
        <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-festival-gold/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-festival-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

     

        <div className="flex justify-center">
          <a 
            href="https://drive.google.com/drive/folders/1d8srPZYdCzdN3ZzsKNaPVyeEuHZcDPvW?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-festival-gold hover:bg-festival-gold/80 text-festival-blue font-medium px-5 py-2 rounded-md"
          >
            Upload Media
          </a>
        </div>

       
      </div>
    </div>
  </motion.div>
</div>

<div className="section-divider mt-20"></div>
</section>
  );
};

export default PhotoUpload;
