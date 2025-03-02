import { useState, useEffect, useRef } from "react";

const CustomCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTranslateX(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTranslateX(0);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);

    // Prevent default behavior for mouse events
    if (e.type !== "touchstart") {
      e.preventDefault();
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);

    // Prevent default only for touch events to allow scrolling
    if (e.type === "touchmove" && Math.abs(diff) > 10) {
      e.preventDefault();
    }
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;

    setIsDragging(false);

    // If dragged more than 100px or 20% of carousel width, change slide
    const threshold = Math.min(100, carouselRef.current.offsetWidth * 0.2);

    if (translateX > threshold) {
      prevSlide();
    } else if (translateX < -threshold) {
      nextSlide();
    } else {
      // Reset position if not dragged far enough
      setTranslateX(0);
    }
  };

  // Render dots for navigation
  const renderDots = () => {
    return (
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="overflow-hidden relative rounded-lg shadow-lg cursor-grab"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Images container */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? "none" : "transform 300ms ease-out",
          }}
        >
          {/* Current image */}
          <div className="flex-shrink-0 w-full aspect-square">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Left/right buttons */}
        <button
          className="absolute invisible left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className="absolute invisible right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Navigation dots */}
      {renderDots()}
    </div>
  );
};

export default CustomCarousel;
