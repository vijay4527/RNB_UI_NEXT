'use client'
import React, { useState, useRef } from 'react';
import { animated, useSpring } from 'react-spring';

const images = [
  // Replace with your actual image URLs or import statements here
  'https://source.unsplash.com/random/500x300?1',
  'https://source.unsplash.com/random/500x300?2',
  'https://source.unsplash.com/random/500x300?3',
  'https://source.unsplash.com/random/500x300?4',
  'https://source.unsplash.com/random/500x300?5',
];

function ImageScroller() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollAmount = useSpring(currentIndex * window.innerWidth, {
    tension: 350,
    friction: 40,
  });

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const imageWidth = scrollRef.current.clientWidth / images.length;
    const newIndex = Math.round(scrollLeft / imageWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-scroll-container" ref={scrollRef} onScroll={handleScroll}>
      {images.map((image, index) => (
        <animated.div key={index} style={{ transform: scrollAmount.interpolate((x) => `translateX(-${x}px)`) }}>
          <img src={image} alt={`Image ${index + 1}`} />
        </animated.div>
      ))}
    </div>
  );
}

export default ImageScroller;