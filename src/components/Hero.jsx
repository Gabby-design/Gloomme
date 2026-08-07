import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.2]);
  const starRotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <motion.video
        style={{ scale: heroScale }}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2000&auto=format&fit=crop"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-red-dress-41619-large.mp4" type="video/mp4" />
      </motion.video>

      {/* Rotating 4-Point Star */}
      <motion.div
        className="absolute top-1/4 right-12 md:right-32 z-20 text-foreground"
        style={{ rotate: starRotate }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z" />
        </svg>
      </motion.div>
      <div className="absolute bottom-12 left-6 md:bottom-20 md:left-20 z-50 text-left text-white mix-blend-difference max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[-0.05em] leading-[0.9] mb-6"
        >
          Defined by details.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans text-[0.9rem] tracking-[0.25em] uppercase font-medium"
        >
          Elevated essentials crafted from premium heavyweight cotton and silk blends.
        </motion.p>
      </div>
    </section>
  );
}
