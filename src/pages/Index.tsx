import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CoreMembers from '@/components/CoreMembers';
import UpcomingEvents from '@/components/UpcomingEvents';
import EventsGallery from '@/components/EventsGallery';
// import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import CursorEffects from '@/components/CursorEffects';
import ParallaxEffects, { FloatingShapes } from '@/components/ParallaxEffects';
import AITerminal from '@/components/AITerminal';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  // For testing - you can remove this in production
  const resetLoading = () => {
    setShowContent(false);
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={`min-h-screen bg-background text-foreground overflow-x-hidden transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Advanced Effects */}
        <CursorEffects />
        <FloatingShapes />

        <Navigation />
        <main>
          <Hero />
          <About />
          <CoreMembers />
          <UpcomingEvents />

          {/* AI Terminal Section */}
          <section className="py-20 px-4 relative animated-bg">
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
                  AI Terminal
                </h2>
                <p className="text-xl text-foreground/80 font-space max-w-3xl mx-auto">
                  Watch our AI systems in action. Real-time simulation of machine learning processes and club operations.
                </p>
              </div>
              <AITerminal />
            </div>
          </section>

          <EventsGallery />
          {/* <Achievements /> */}
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
