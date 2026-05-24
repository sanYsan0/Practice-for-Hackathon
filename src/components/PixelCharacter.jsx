import React from 'react';
import { motion } from 'framer-motion';

const PixelCharacter = ({ mood }) => {
  // We'll create a blob/cat-like pixel shape using absolute positioned divs
  // or a simple SVG to maintain crisp pixels while animating.
  
  const getEyeColor = () => {
    if (mood === 'sad') return '#4a90e2';
    if (mood === 'tired') return '#888';
    return '#111';
  };

  const getAnimationProps = () => {
    if (mood === 'tired') {
      return {
        animate: { y: [0, 2, 0], scaleY: [1, 0.95, 1] },
        transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
      };
    }
    if (mood === 'sad') {
      return {
        animate: { y: [0, 1, 0] },
        transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
      };
    }
    // Happy
    return {
      animate: { y: [0, -6, 0] },
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
    };
  };

  return (
    <motion.div 
      className="relative w-16 h-14"
      {...getAnimationProps()}
    >
      {/* Body */}
      <div className="absolute bottom-0 w-16 h-12 bg-[#fdfbf7] rounded-t-[30px] rounded-b-[20px] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.1),_2px_2px_0_rgba(0,0,0,0.1)]"></div>
      
      {/* Ears */}
      <div className="absolute -top-1 left-1 w-4 h-5 bg-[#fdfbf7] rounded-t-lg shadow-[inset_-2px_0_0_rgba(0,0,0,0.1)] origin-bottom -rotate-12"></div>
      <div className="absolute -top-1 right-1 w-4 h-5 bg-[#fdfbf7] rounded-t-lg shadow-[inset_-2px_0_0_rgba(0,0,0,0.1)] origin-bottom rotate-12"></div>

      {/* Face */}
      <div className="absolute top-5 left-0 w-full flex justify-center items-center gap-3 z-10">
        
        {/* Left Eye */}
        <motion.div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getEyeColor() }}
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }} // Blinking
        />
        
        {/* Mouth */}
        {mood === 'happy' && <div className="w-2 h-1.5 border-b-2 border-black rounded-b-full opacity-80"></div>}
        {mood === 'sad' && <div className="w-2 h-1.5 border-t-2 border-black rounded-t-full opacity-80 mt-1"></div>}
        {mood === 'tired' && <div className="w-2 h-1 bg-black/50 rounded-full mt-1"></div>}
        
        {/* Right Eye */}
        <motion.div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getEyeColor() }}
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }} // Blinking
        />
      </div>

      {/* Blushes */}
      {mood === 'happy' && (
        <>
          <div className="absolute top-6 left-2 w-2 h-1.5 bg-pink-300 rounded-full opacity-60"></div>
          <div className="absolute top-6 right-2 w-2 h-1.5 bg-pink-300 rounded-full opacity-60"></div>
        </>
      )}

      {/* Tears */}
      {mood === 'sad' && (
        <motion.div 
          className="absolute top-7 left-3 w-1.5 h-2 bg-blue-400 rounded-full opacity-80"
          animate={{ y: [0, 5, 5], opacity: [1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      {/* Zzz */}
      {mood === 'tired' && (
        <motion.div 
          className="absolute -top-4 -right-2 text-[10px] font-pixel text-gray-500"
          animate={{ y: [0, -10], x: [0, 5], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          z
        </motion.div>
      )}

    </motion.div>
  );
};

export default PixelCharacter;
