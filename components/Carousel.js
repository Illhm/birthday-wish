import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full max-w-2xl mx-auto my-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl shadow-pink-200/50">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.caption}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-colors text-pink-500"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-colors text-pink-500"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>

        {/* Caption */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-white/70 backdrop-blur-md px-6 py-2 rounded-full shadow-lg text-center transition-all duration-300">
          <p className="text-gray-800 font-medium italic text-lg sm:text-xl">
            {images[currentIndex].caption}
          </p>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-pink-500 w-8'
                : 'bg-pink-300 hover:bg-pink-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;