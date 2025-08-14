import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import CoreMembers from '@/components/CoreMembers';
import UpcomingEvents from '@/components/UpcomingEvents';
import EventsGallery from '@/components/EventsGallery';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
  );
};

export default Index;
