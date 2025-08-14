import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users } from 'lucide-react';
import deepLearningImg from '@/assets/event-deep-learning.jpg';
import aiEthicsImg from '@/assets/event-ai-ethics.jpg';
import computerVisionImg from '@/assets/event-computer-vision.jpg';

const UpcomingEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const events = [
    {
      id: 1,
      title: "Deep Learning Workshop",
      description: "Hands-on workshop covering neural networks, backpropagation, and building your first deep learning model with TensorFlow.",
      date: "March 15, 2024",
      time: "2:00 PM - 5:00 PM",
      attendees: "50+ Expected",
      level: "Beginner to Intermediate",
      slug: "deep-learning-workshop",
      image: deepLearningImg
    },
    {
      id: 2,
      title: "AI Ethics Symposium",
      description: "Discussing the ethical implications of AI, bias in machine learning, and responsible AI development practices.",
      date: "March 22, 2024", 
      time: "10:00 AM - 4:00 PM",
      attendees: "100+ Expected",
      level: "All Levels",
      slug: "ai-ethics-symposium",
      image: aiEthicsImg
    },
    {
      id: 3,
      title: "Computer Vision Hackathon",
      description: "24-hour hackathon focused on computer vision applications. Build innovative solutions using OpenCV, YOLO, and modern CV techniques.",
      date: "April 5-6, 2024",
      time: "9:00 AM - 9:00 AM",
      attendees: "75+ Teams",
      level: "Intermediate to Advanced",
      slug: "computer-vision-hackathon",
      image: computerVisionImg
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleExploreEvent = (slug: string) => {
    // Navigate to the event detail page
    window.location.href = `/events/${slug}`;
  };

  return (
    <section id="events" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
            Upcoming Events
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-green to-electric-red mx-auto mb-8" />
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Join us for exciting workshops, hackathons, and learning opportunities
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={event.id}
              className={`scale-in ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="cyber-card p-6 rounded-2xl h-full flex flex-col group glow-green-hover hover:scale-105 transition-all duration-500">
                <div className="flex-1">
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-3 py-1 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full text-sm font-medium backdrop-blur-sm">
                        {event.level}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 w-8 h-8 bg-electric-red/20 rounded-full animate-pulse backdrop-blur-sm" />
                  </div>
                  
                  <h3 className="text-2xl font-orbitron font-bold text-gradient mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-cyber-blue">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-neon-green">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-electric-red">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.attendees}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleExploreEvent(event.slug)}
                  className="w-full bg-transparent border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-deep-space font-orbitron font-semibold transition-all duration-300 group-hover:border-neon-green group-hover:text-neon-green"
                >
                  Explore Event
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;