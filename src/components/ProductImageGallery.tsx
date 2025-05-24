
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '/placeholder.svg');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <AspectRatio ratio={1}>
          <img 
            src="/placeholder.svg" 
            alt={productName} 
            className="rounded-md object-cover w-full h-full" 
          />
        </AspectRatio>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZooming) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
    setZoomLevel(2); // Zoom level on hover
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomLevel(1); // Reset zoom level
  };

  return (
    <div className="space-y-4">
      <div 
        className="relative w-full overflow-hidden rounded-lg cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ aspectRatio: '1' }}
      >
        <div 
          className="w-full h-full bg-no-repeat transition-transform duration-100"
          style={{ 
            backgroundImage: `url(${selectedImage})`,
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition: isZooming 
              ? `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%` 
              : 'center',
            transform: `scale(${isZooming ? 1 : 1})`,
          }}
        >
          {/* Only show the image when not zooming */}
          {!isZooming && (
            <img 
              src={selectedImage} 
              alt={productName} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          )}
        </div>
      </div>

      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <Card 
              key={index}
              className={`cursor-pointer border-2 overflow-hidden ${
                selectedImage === image ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <AspectRatio ratio={1}>
                <img 
                  src={image} 
                  alt={`${productName} - Image ${index + 1}`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </AspectRatio>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
