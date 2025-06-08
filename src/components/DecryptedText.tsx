
import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
  revealDirection?: 'left' | 'right' | 'center';
}

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  revealDirection = 'left'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const animate = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let iteration = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prevText => 
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            let shouldReveal = false;
            if (revealDirection === 'left') {
              shouldReveal = index < iteration;
            } else if (revealDirection === 'right') {
              shouldReveal = index >= text.length - iteration;
            } else { // center
              const center = Math.floor(text.length / 2);
              const distance = Math.abs(index - center);
              shouldReveal = distance < iteration / 2;
            }
            
            if (shouldReveal) {
              return char;
            }
            
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length + maxIterations) {
        setDisplayText(text);
        setIsAnimating(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      
      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      animate();
    }
  };

  return (
    <span
      ref={elementRef}
      className={`${parentClassName} ${isAnimating ? encryptedClassName : className}`}
      onMouseEnter={handleMouseEnter}
      style={{ fontFamily: 'monospace' }}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
