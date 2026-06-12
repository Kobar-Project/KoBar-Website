import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Reveal } from './Reveal';

const IMAGES = [
  {
    id: '1',
    src: "/Assets/Screenshots/AI-hub.png",
    title: "Intelligent Assistant",
    delay: 0,
    span: "lg:col-span-4"
  },
  {
    id: '2',
    src: "/Assets/Screenshots/screen.png",
    title: "Modular Interface",
    delay: 0.1,
    span: "lg:col-span-5 lg:translate-y-12"
  },
  {
    id: '3',
    src: "/Assets/Screenshots/Color.png",
    title: "Personalized Style",
    delay: 0.2,
    span: "md:col-span-2 lg:col-span-3 lg:-translate-y-8"
  }
];

export default function Workflow() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImg]);

  return (
    <section className="w-full max-w-7xl mx-auto mb-24 md:mb-40 px-4 md:px-8" id="workflow">
      <Reveal className="mb-16 md:mb-24 flex flex-col items-center text-center">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6 tracking-tight leading-[1.1]">
          Experience the Workflow
        </h3>
        <p className="text-lg md:text-xl font-medium text-on-surface-variant max-w-2xl leading-relaxed">
          See how KoBar's friendly utilities blend into your creative process without taking over your screen.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
        {IMAGES.map((img) => (
          <Reveal key={img.id} delay={img.delay} className={`glass-panel p-2 rounded-[2rem] overflow-hidden group cursor-pointer ${img.span}`} >
            <div onClick={() => setSelectedImg(img.src)} className="w-full h-full block relative overflow-hidden rounded-[1.5rem] bg-surface">
              <img
                alt={img.title}
                className="img-zoom w-full h-full object-cover shadow-inner opacity-90 group-hover:opacity-100"
                src={img.src}
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/50 to-transparent">
                <p className="font-mono text-xs uppercase text-on-surface font-bold tracking-widest translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {img.title}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-container-lowest/90 backdrop-blur-xl"
              onClick={() => setSelectedImg(null)}
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="fixed top-6 right-6 md:top-10 md:right-10 z-[101] bg-surface-container/50 hover:bg-surface-container-high text-on-surface p-4 rounded-full backdrop-blur-md transition-colors border border-white/10 flex items-center justify-center group"
              >
                <X size={24} className="group-hover:scale-110 transition-transform" />
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative max-w-[1920px] w-full h-full flex items-center justify-center p-4 md:p-12"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <img
                  src={selectedImg}
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] border border-white/5"
                  alt="Enlarged view"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
