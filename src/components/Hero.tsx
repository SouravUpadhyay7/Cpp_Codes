import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/dyqfbq6kf/video/upload/v1755247875/11548675-uhd_3840_2160_1_b7lwvn.mp4"; // <-- Replace with your actual Cloudinary video URL

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
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={CLOUDINARY_VIDEO_URL}
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
          <h1 className={`text-5xl md:text-7xl font-synapse font-black astrolab astrolab-geometric ${isVisible ? 'neural-pulse-text' : 'neural-pulse-text'}`}>
            SYNAPSE
          </h1>
          <h2 className="text-2xl md:text-3xl font-jetbrains font-bold text-gradient leading-tight">
           The Official AIML Club of TBIT
          </h2>
          <p className="text-base md:text-2xl font-space text-cyber-blue font-medium tracking-wide">
            Under the Department of CSE( AI & ML )
          </p>
          <p className="text-xl md:text-2xl font-space text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Unleashing the Power of
            <span className="neon-green-text font-semibold"> Artificial Intelligence </span>
            &
            <span className="neon-red-text font-semibold"> Machine Learning</span>
          </p>


          <div className="pt-8">
            <Button
              onClick={() => window.open('#', '_blank')}
              className="glass-button text-white font-jetbrains font-semibold text-lg px-8 py-6 rounded-xl glow-hover transition-all duration-300 transform hover:scale-105"
            >
              Join Our Community
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