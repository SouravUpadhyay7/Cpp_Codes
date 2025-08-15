import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/bg pics/video.mp4';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });  
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      {/* Animated Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroBackground}
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-deep-space/60" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-cyber-blue/30 animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-neon-green/30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-20 w-8 h-8 bg-electric-red/20 animate-pulse-glow" />
      
      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="space-y-6">
          <h1 className={`text-4xl md:text-8xl font-jetbrains font-bold neon-text ${isVisible ? 'typing-text show' : 'typing-text'}`}>
            [TrAIn-N-Test]
          </h1>
          <h2 className="text-3xl md:text-4xl font-jetbrains font-semibold text-gradient">
           The AIML Club
          </h2>
          <p className="text-xl md:text-2xl font-space text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Unleashing the Power of 
            <span className="neon-green-text font-semibold"> Artificial Intelligence </span>
            & 
            <span className="neon-red-text font-semibold"> Machine Learning</span>
          </p>
          <div className="pt-8">
            <Button 
              onClick={() => window.open('https://chat.whatsapp.com/DQA3MGg0RakFMx7s2yoJBJ', '_blank')}
              className="bg-cyber-blue hover:bg-cyber-blue/90 text-deep-space font-jetbrains font-semibold text-lg px-8 py-6 rounded-xl glow-hover transition-all duration-300 transform hover:scale-105"
            >
              Join Our WhatsApp Community
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyber-blue rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;