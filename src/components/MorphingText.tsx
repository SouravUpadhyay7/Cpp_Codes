import { useEffect, useState, useRef } from 'react';

interface MorphingTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  glitchEffect?: boolean;
}

const MorphingText = ({ 
  texts, 
  className = '', 
  speed = 100,
  glitchEffect = false 
}: MorphingTextProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    if (texts.length === 0) return;

    const morphToNext = () => {
      setIsAnimating(true);
      const targetText = texts[currentIndex];
      const maxLength = Math.max(currentText.length, targetText.length);
      let iterations = 0;

      const morph = () => {
        let newText = '';
        
        for (let i = 0; i < maxLength; i++) {
          if (i < targetText.length) {
            if (iterations > i * 2) {
              newText += targetText[i];
            } else {
              newText += characters[Math.floor(Math.random() * characters.length)];
            }
          }
        }

        setCurrentText(newText);
        iterations++;

        if (iterations < maxLength * 2 + 10) {
          setTimeout(morph, speed);
        } else {
          setCurrentText(targetText);
          setIsAnimating(false);
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }, 2000);
        }
      };

      morph();
    };

    intervalRef.current = setTimeout(morphToNext, isAnimating ? 0 : 3000);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [currentIndex, currentText, texts, speed, isAnimating]);

  return (
    <span 
      className={`${className} ${glitchEffect ? 'glitch-text' : ''} ${isAnimating ? 'morphing' : ''}`}
      data-text={currentText}
    >
      {currentText}
    </span>
  );
};

// Typing animation component
interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export const TypingText = ({ 
  text, 
  className = '', 
  speed = 50, 
  delay = 0,
  cursor = true 
}: TypingTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          if (!cursor) setShowCursor(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, cursor]);

  useEffect(() => {
    if (cursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <span className={`inline-block w-0.5 h-[1em] bg-cyber-blue ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
      )}
    </span>
  );
};

// Glitch text component
interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: number;
}

export const GlitchText = ({ text, className = '', intensity = 1 }: GlitchTextProps) => {
  const [glitchedText, setGlitchedText] = useState(text);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1 * intensity) {
        let newText = '';
        for (let i = 0; i < text.length; i++) {
          if (Math.random() < 0.1 * intensity) {
            newText += characters[Math.floor(Math.random() * characters.length)];
          } else {
            newText += text[i];
          }
        }
        setGlitchedText(newText);
        
        setTimeout(() => {
          setGlitchedText(text);
        }, 50);
      }
    }, 100);

    return () => clearInterval(glitchInterval);
  }, [text, intensity]);

  return (
    <span className={`${className} glitch-text`} data-text={text}>
      {glitchedText}
    </span>
  );
};

export default MorphingText;
