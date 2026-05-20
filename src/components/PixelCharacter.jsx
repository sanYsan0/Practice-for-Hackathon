import React from 'react';
import './PixelCharacter.css';

const characterData = {
  cat: [
    "0000000000000000",
    "0011000000001100",
    "0111100000011110",
    "1111110000111111",
    "1111111111111111",
    "1101111111111011",
    "1101111111111011",
    "1111111111111111",
    "0111111111111110",
    "0011100000011100",
    "0001111111111000",
    "0000111111110000",
    "0001100000011000",
    "0011110000111100",
    "0000000000000000",
    "0000000000000000"
  ],
  slime: [
    "0000000000000000",
    "0000001111000000",
    "0000111111110000",
    "0001111111111000",
    "0011111111111100",
    "0110111111101110",
    "0110111111101110",
    "1111111111111111",
    "1111000000001111",
    "1111111111111111",
    "0111111111111110",
    "0011111111111100",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000"
  ],
  dino: [
    "0000000000111100",
    "0000000001111110",
    "0000000011111111",
    "0000000011101111",
    "0000000011111111",
    "0000000011111110",
    "0000000011100000",
    "0011000011111000",
    "0111111111111100",
    "1111111111111110",
    "1111111111111110",
    "0111111111111100",
    "0011111111110000",
    "0001110001110000",
    "0011110011110000",
    "0000000000000000"
  ]
};

// Colors for the characters based on their "state"
const getCharacterColor = (type, state) => {
  if (state === 'sad') return '#a0a0a0'; // Grayish
  if (state === 'energetic') return '#ff9900'; // Orange glow
  
  // Default colors
  if (type === 'cat') return '#5c4b51';
  if (type === 'slime') return '#3cb371';
  if (type === 'dino') return '#ff6b6b';
  
  return '#000';
};

const PixelCharacter = ({ type = 'cat', state = 'idle', actionState = 'idle', animationClass = '' }) => {
  const grid = characterData[type] || characterData.cat;
  const color = getCharacterColor(type, state);

  // Convert grid to box-shadow pixel art
  const pixelSize = 6; // Smaller pixels for higher resolution
  let boxShadow = [];
  
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '1') {
        boxShadow.push(`${c * pixelSize}px ${r * pixelSize}px 0 ${color}`);
      }
    }
  }

  // Adjust container size
  const width = grid[0].length * pixelSize;
  const height = grid.length * pixelSize;

  return (
    <div className={`pixel-character-container`}>
      <div className={`pixel-character-wrapper ${animationClass}`}>
        <div 
          className="pixel-art" 
          style={{
            width: `${pixelSize}px`,
            height: `${pixelSize}px`,
            boxShadow: boxShadow.join(', '),
            margin: '0 auto',
            position: 'relative',
            left: `-${width / 2 - pixelSize / 2}px`, // Center offset
            top: `-${height / 2 - pixelSize / 2}px`
          }}
        />
      </div>
      <div className={`character-shadow ${animationClass === 'anim-jump' ? 'shadow-jump' : animationClass === 'anim-bounce' ? 'shadow-bounce' : ''}`}></div>
    </div>
  );
};

export default PixelCharacter;
