"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/images/hero/homepage-hero.png',
  '/images/hero/hero_1.jpeg',
  '/images/hero/hero_2.jpeg',
  // '/images/hero/hero_3.jpeg',
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES[index]})` }}
        />
      </AnimatePresence>
      
      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-primary-950/40 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-10 bg-primary-900/50 mix-blend-overlay"></div>
    </div>
  );
}
