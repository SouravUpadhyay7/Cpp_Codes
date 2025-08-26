import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, MapPin, User } from 'lucide-react';
import deepLearningImg from '@/assets/event-deep-learning.jpg';
import aiEthicsImg from '@/assets/event-ai-ethics.jpg';
import computerVisionImg from '@/assets/event-computer-vision.jpg';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  teacher: string;
  location: string;
  image?: string; // Base64 encoded image or URL
  createdAt: string;
}

const UpcomingEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [adminEvents, setAdminEvents] = useState<Event[]>([]);
  const sectionRef = useRef(null);

  // Static fallback events (shown when no admin events exist)
  const staticEvents = [
    {
      id: "static-1",
      title: "Deep Learning Workshop",
      description: "Hands-on workshop covering neural networks, backpropagation, and building your first deep learning model with TensorFlow.",
      date: "2024-03-15",
      time: "14:00",
      teacher: "Dr. Sarah Johnson",
      location: "Lab 101",
      attendees: "50+ Expected",
      level: "Beginner to Intermediate",
      slug: "deep-learning-workshop",
      image: deepLearningImg
    },
    {
      id: "static-2",
      title: "AI Ethics Symposium",
      description: "Discussing the ethical implications of AI, bias in machine learning, and responsible AI development practices.",
      date: "2024-03-22",
      time: "10:00",
      teacher: "Prof. Michael Chen",
      location: "Auditorium",
      attendees: "100+ Expected",
      level: "All Levels",
      slug: "ai-ethics-symposium",
      image: aiEthicsImg
    },
    {
      id: "static-3",
      title: "Computer Vision Hackathon",
      description: "24-hour hackathon focused on computer vision applications. Build innovative solutions using OpenCV, YOLO, and modern CV techniques.",
      date: "2024-04-05",
      time: "09:00",
      teacher: "Dr. Emily Rodriguez",
      location: "Computer Lab",
      attendees: "75+ Teams",
      level: "Intermediate to Advanced",
      slug: "computer-vision-hackathon",
      image: computerVisionImg
    }
  ];

  // Load admin events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('tbit_events');
    if (savedEvents) {
      setAdminEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Combine admin events with static events (admin events take priority)
  const allEvents = adminEvents.length > 0 ? adminEvents : staticEvents;

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
    <section id="events" ref={sectionRef} className="py-20 px-4 relative animated-bg">
      {/* Neural Network Background */}
      <div className="neural-network">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="neural-node"
            style={{
              left: `${8 + (i * 8)}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`connection-${i}`}
            className="neural-connection"
            style={{
              left: `${5 + (i * 10)}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${60 + Math.random() * 120}px`,
              animationDelay: `${i * 0.6}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
          {allEvents.map((event: any, index: number) => (
            <div 
              key={event.id}
              className={`scale-in ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="cyber-card p-6 rounded-2xl h-full flex flex-col group glow-green-hover hover:scale-105 transition-all duration-500">
                <div className="flex-1">
                  {/* Show admin uploaded image or static event image */}
                  {event.image && (
                    <div className="relative mb-4 rounded-lg overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Show level badge only for static events */}
                      {event.level && (
                        <div className="absolute top-2 left-2">
                          <span className="px-3 py-1 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full text-sm font-medium backdrop-blur-sm">
                            {event.level}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-electric-red/20 rounded-full animate-pulse backdrop-blur-sm" />
                    </div>
                  )}

                  <h3 className="text-2xl font-orbitron font-bold text-gradient mb-3">
                    {event.title}
                  </h3>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-cyber-blue">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.date.includes('-') ? new Date(event.date).toLocaleDateString() : event.date}
                      </span>
                    </div>
                    <div className="flex items-center text-neon-green">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {event.time.includes(':') && event.time.length === 5
                          ? new Date(`2000-01-01T${event.time}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                          : event.time
                        }
                      </span>
                    </div>
                    {event.teacher && (
                      <div className="flex items-center text-cosmic-purple">
                        <User className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.teacher}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center text-electric-red">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center text-electric-red">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.attendees}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={() => event.slug ? handleExploreEvent(event.slug) : alert('Event details coming soon!')}
                  className="w-full bg-transparent border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-deep-space font-orbitron font-semibold transition-all duration-300 group-hover:border-neon-green group-hover:text-neon-green"
                >
                  {event.slug ? 'Explore Event' : 'View Details'}
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