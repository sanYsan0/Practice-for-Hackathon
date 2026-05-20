import React, { useEffect, useState } from 'react';
import './ParticleSystem.css';

const ParticleSystem = ({ trigger, type }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger > 0) {
      // Generate particles
      const count = type === 'exercise' ? 12 : type === 'checkin' ? 10 : 8;
      const newParticles = Array.from({ length: count }).map((_, i) => {
        let content = '';
        const r = Math.random();
        if (type === 'water') {
          content = r > 0.6 ? '💧' : (r > 0.3 ? '💦' : '✨');
        } else if (type === 'exercise') {
          content = r > 0.6 ? '⚡️' : (r > 0.3 ? '⚽️' : '💨');
        } else if (type === 'checkin') {
          content = r > 0.5 ? '💖' : (r > 0.25 ? '💕' : '✨');
        } else if (type === 'rest') {
          content = r > 0.5 ? '💤' : (r > 0.2 ? '🌙' : '✨');
        }

        return {
          id: Date.now() + i,
          x: Math.random() * 120 - 60, // Wider spread
          y: Math.random() * 80 - 40,
          delay: Math.random() * 0.4,
          content
        };
      });
      
      setParticles(newParticles);

      // Clean up after animation
      const timer = setTimeout(() => {
        setParticles([]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="particle-container">
      {particles.map(p => (
        <span 
          key={p.id} 
          className={`particle particle-${type}`}
          style={{
            '--x': `${p.x}px`,
            '--y': `${p.y}px`,
            animationDelay: `${p.delay}s`
          }}
        >
          {p.content}
        </span>
      ))}
    </div>
  );
};

export default ParticleSystem;
