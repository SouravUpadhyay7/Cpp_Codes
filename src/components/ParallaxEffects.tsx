import { useEffect, useRef, useState } from 'react';

interface ParallaxLayer {
  id: string;
  element: HTMLElement;
  speed: number;
  type: 'translate' | 'rotate' | 'scale';
}

const ParallaxEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const layersRef = useRef<ParallaxLayer[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    // Initialize parallax layers
    const initializeLayers = () => {
      const elements = document.querySelectorAll('[data-parallax]');
      layersRef.current = Array.from(elements).map((el, index) => ({
        id: `layer-${index}`,
        element: el as HTMLElement,
        speed: parseFloat(el.getAttribute('data-parallax') || '0.5'),
        type: (el.getAttribute('data-parallax-type') as 'translate' | 'rotate' | 'scale') || 'translate'
      }));
    };

    // Apply parallax effects
    const applyParallax = () => {
      layersRef.current.forEach(layer => {
        const { element, speed, type } = layer;
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const distance = (elementCenter - screenCenter) / screenCenter;

        switch (type) {
          case 'translate':
            const translateY = scrollY * speed;
            const translateX = mousePos.x * speed * 20;
            element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
            break;
          
          case 'rotate':
            const rotateX = mousePos.y * speed * 10;
            const rotateY = mousePos.x * speed * 10;
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            break;
          
          case 'scale':
            const scale = 1 + (distance * speed * 0.1);
            element.style.transform = `scale(${Math.max(0.8, Math.min(1.2, scale))})`;
            break;
        }
      });
    };

    initializeLayers();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop for smooth parallax
    const animate = () => {
      applyParallax();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrollY, mousePos]);

  return null; // This component doesn't render anything visible
};

// 3D Card component
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const Card3D = ({ children, className = '', intensity = 1 }: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10 * intensity;
      const rotateY = ((x - centerX) / centerX) * 10 * intensity;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    };

    const handleMouseLeave = () => {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={`${className} transition-transform duration-200 ease-out transform-gpu`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

// Floating 3D shapes
export const FloatingShapes = () => {
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shapes = shapesRef.current;
    if (!shapes) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      const shapeElements = shapes.querySelectorAll('.floating-shape');
      shapeElements.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const translateX = x * speed * 20;
        const translateY = y * speed * 20;
        const rotateX = y * speed * 10;
        const rotateY = x * speed * 10;
        
        (shape as HTMLElement).style.transform = 
          `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={shapesRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Reduced geometric shapes for better performance */}
      <div className="floating-shape absolute top-20 left-20 w-12 h-12 border-2 border-cyber-blue/20 rotate-45 animate-float" />
      <div className="floating-shape absolute bottom-32 left-40 w-16 h-16 border-2 border-electric-red/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="floating-shape absolute top-1/2 right-20 w-10 h-10 bg-cosmic-purple/15 rotate-12 animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default ParallaxEffects;
