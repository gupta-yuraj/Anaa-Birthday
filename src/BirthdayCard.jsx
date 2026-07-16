import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayCard() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const audioRef = useRef(null);

  // --- REPLACE THESE WITH YOUR ACTUAL IMAGE PATHS OR URLS ---
  const photos = [
    { id: 1, url: '/public/pic/11.png', caption: 'Good Times🥰' },
    { id: 2, url: '/public/pic/2.png', caption: 'Memorable Moments' },
    { id: 3, url: '/public/pic/3.png', caption: 'Celebration' }
  ];

  useEffect(() => {
    if (hasEntered && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked:", err);
      });
    }
  }, [hasEntered]);

  // Immersive Master Screen Transitions
  const screenTransitionVariants = {
    initial: { 
      opacity: 0, 
      y: 100, 
      scale: 0.95,
      rotateX: -10 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth ease-out
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemTransitionVariants = {
    initial: { opacity: 0, y: 40, scale: 0.97 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 14 } 
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/public/bir.mp3" loop />

      {/* 1. Immersive Pre-loader Transition Cover */}
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div 
            key="loader-screen"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              y: "-100vh",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-md"
            >
              <motion.div 
                className="text-6xl inline-block"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                🎁
              </motion.div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                You Have a Special Message
              </h2>
              <p className="text-slate-400 text-sm">Turn your sound up and open the card.</p>
              <button
                onClick={() => setHasEntered(true)}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-8 py-4 rounded-xl shadow-2xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
              >
                Open Card ✨
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* 2. Main Site Layout with 3D Cascade Perspective Transition */
          <motion.div 
            key="main-card-screen"
            variants={screenTransitionVariants}
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 text-gray-100 flex flex-col justify-between font-sans relative overflow-x-hidden [perspective:1000px]"
          >
            {/* Background Floating Ambient Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl opacity-15"
                  initial={{ x: Math.random() * 100 + "%", y: "110vh" }}
                  animate={{ y: "-10vh", x: [null, `${Math.random() * 30 - 15}vw`, `${Math.random() * 30 - 15}vw`] }}
                  transition={{ duration: Math.random() * 4 + 8, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
                >
                  {['🎈', '✨', '🎂', '🎉'][i % 4]}
                </motion.div>
              ))}
            </div>

            <main className="max-w-2xl mx-auto px-6 py-12 flex-grow flex flex-col justify-center items-center text-center relative z-10 w-full">
              
              {/* Header Transition Block */}
              <motion.div variants={itemTransitionVariants} className="space-y-4 mb-8">
                <motion.div className="inline-block text-6xl mb-2" animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  🎉
                </motion.div>
                <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-500/30 inline-block">
                  To a Special Big Brother
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  Happy Birthday, Anna💕
                </h1>
              </motion.div>

              {/* 3D Tilt-Interactive Card Transition Container */}
              <motion.div 
                variants={itemTransitionVariants}
                whileHover={{ 
                  y: -6,
                  rotateX: 2,
                  rotateY: -2,
                  shadow: "0 30px 60px -15px rgba(99, 102, 241, 0.2)"
                }}
                className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-left md:text-center transition-shadow duration-300"
              >
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-4">
                  "Even though we’ve only met face-to-face <span className="text-indigo-400 font-semibold">just one time</span>, you've made me feel like family. Every single time I talk to <span className="text-indigo-400 font-semibold">Shashank</span>, he always brings you up, telling me, *'Bhaiya was asking how you are doing.'*"
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 border-t border-slate-800/60 pt-4">
                  Honestly, your brother treats me like his own family, and your mother treats me exactly the same way. Whenever I talk to your mother, she showers me with love and treats me like <span className="text-indigo-400 font-semibold">her own son</span>.
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
                  Knowing how much all of you look out for me means the world. Thank you for being the ultimate definition of what a caring, protective elder brother should be.
                </p>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-semibold text-indigo-300 bg-indigo-950/30 py-2 rounded-xl border border-indigo-500/10 inline-block px-4 w-full text-center">
                  I hope you have a great year ahead with lots of success, good health, and tons of happiness!
                </p>
              </motion.div>

              {/* Photo Gallery Transition Grid */}
              <motion.div variants={itemTransitionVariants} className="w-full mt-8 space-y-4">
                <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase text-left md:text-center px-1">📸 Captured Memories</h3>
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
                      whileHover={{ scale: 1.06, zIndex: 20 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActivePhoto(photo)}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-slate-800 shadow-md bg-slate-900 group"
                    >
                      <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-indigo-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs font-semibold bg-slate-950/90 px-2.5 py-1 rounded-md border border-slate-700">View</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Fluid Panel Dynamic Secret Wish Section */}
              <motion.div variants={itemTransitionVariants} className="mt-8 w-full layout">
                <motion.button 
                  layout 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsRevealed(!isRevealed)}
                  className={`cursor-pointer font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ${
                    isRevealed 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/20'
                  }`}
                >
                  {isRevealed ? '✨ Stay Blessed Always! ✨' : '🎁 Tap to Reveal a Special Wish'}
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {isRevealed && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, scaleY: 0.9, y: -15 }} 
                      animate={{ 
                        opacity: 1, 
                        height: "auto", 
                        scaleY: 1, 
                        y: 0,
                        transition: {
                          height: { type: "spring", stiffness: 80, damping: 15 },
                          opacity: { duration: 0.3 }
                        }
                      }} 
                      exit={{ 
                        opacity: 0, 
                        height: 0, 
                        scaleY: 0.9, 
                        y: -15,
                        transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } }
                      }}
                      className="mt-6 p-6 bg-indigo-950/40 border border-indigo-500/20 rounded-xl overflow-hidden shadow-inner origin-top space-y-3"
                    >
                      <p className="text-lg font-semibold text-amber-300 leading-relaxed">
                        ✨ I wish you achieve your dream of your life and along with your dream girl. ✨
                      </p>
                      <p className="text-sm text-slate-400">Cheers to the best elder brother we could ask for. Have an amazing day!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </main>

            <footer className="w-full text-center py-6 text-xs text-slate-500 border-t border-slate-900/60 backdrop-blur-sm z-10">
              Made with 🤍 by Shashank's best friend - Yuraj
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Lightbox Modals Zoom-In Window Transition */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.88, y: 30, rotateX: 15 }} 
              animate={{ scale: 1, y: 0, rotateX: 0 }} 
              exit={{ scale: 0.88, y: 30, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 100, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-2 shadow-2xl origin-bottom"
            >
              <img src={activePhoto.url} alt={activePhoto.caption} className="w-full h-auto rounded-xl max-h-[70vh] object-contain mx-auto" />
              <div className="p-3 text-center text-sm text-slate-300 font-medium">
                {activePhoto.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}