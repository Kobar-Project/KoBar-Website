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
    classes: "bg-gradient-to-b from-secondary/20 to-transparent border-t-secondary/30"
  },
  {
    id: '2',
    src: "/Assets/Screenshots/screen.png",
    title: "Modular Interface",
    delay: 0.1,
    classes: "lg:translate-y-12 bg-gradient-to-b from-primary/20 to-transparent border-t-primary/30"
  },
  {
    id: '3',
    src: "/Assets/Screenshots/Color.png",
    title: "Personalized Style",
    delay: 0.2,
    classes: "md:col-span-2 lg:col-span-1 bg-gradient-to-b from-primary/20 to-transparent border-t-primary/30"
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
    <section className="max-w-6xl mx-auto mb-32 px-4" id="workflow">
      <Reveal className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
          Experience the Workflow
        </h3>
        <p className="text-lg font-medium text-on-surface-variant max-w-2xl mx-auto">
          See how KoBar's friendly utilities blend into your creative process.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {IMAGES.map((img) => (
          <Reveal key={img.id} delay={img.delay} className={`feature-card glass-panel p-3 rounded-[2.5rem] overflow-hidden shadow-2xl glow-effect cursor-pointer ${img.classes}`} >
            <div onClick={() => setSelectedImg(img.src)} className="w-full h-full block">
              <img
                alt={img.title}
                className="img-zoom w-full h-full object-cover rounded-[2rem] shadow-inner"
                src={img.src}
              />
              <p className="text-center py-5 font-mono text-[11px] uppercase text-on-surface font-bold tracking-widest">
                {img.title}
              </p>
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
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedImg(null)}
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="fixed top-4 right-4 md:top-8 md:right-8 z-[101] bg-surface/50 hover:bg-surface text-white p-2 rounded-full backdrop-blur-md transition-colors border border-white/10"
              >
                <X size={28} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-[1920px] w-full h-full flex items-center justify-center p-2 md:p-8"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <img
                  src={selectedImg}
                  className="max-w-full max-h-[95vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/10"
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
