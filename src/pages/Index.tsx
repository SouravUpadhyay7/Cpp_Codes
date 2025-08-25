import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CoreMembers from '@/components/CoreMembers';
import UpcomingEvents from '@/components/UpcomingEvents';
import EventsGallery from '@/components/EventsGallery';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

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
        <Navigation />
        <main>
          <Hero />
          <About />
          <CoreMembers />
          <UpcomingEvents />
          <EventsGallery />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
