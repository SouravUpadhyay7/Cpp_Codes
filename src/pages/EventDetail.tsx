import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, MapPin, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  // Sample event data - in a real app, this would come from an API or database
  const eventData: Record<string, any> = {
    'deep-learning-workshop': {
      title: 'Deep Learning Workshop',
      date: 'March 15, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Science Lab 101',
      attendees: '50+ Expected',
      level: 'Beginner to Intermediate',
      instructor: 'Dr. Sarah Chen & Team',
      description: `Join us for an immersive hands-on workshop covering the fundamentals of deep learning and neural networks. This workshop is designed for students who want to dive deep into the world of artificial intelligence and understand how neural networks work from the ground up.`,
      agenda: [
        { time: '2:00 PM - 2:30 PM', topic: 'Introduction to Neural Networks' },
        { time: '2:30 PM - 3:15 PM', topic: 'Building Your First Neural Network' },
        { time: '3:15 PM - 3:30 PM', topic: 'Break' },
        { time: '3:30 PM - 4:15 PM', topic: 'Advanced Architectures (CNNs & RNNs)' },
        { time: '4:15 PM - 5:00 PM', topic: 'Hands-on Project & Q&A' }
      ],
      prerequisites: [
        'Basic Python programming knowledge',
        'Understanding of linear algebra',
        'Familiarity with NumPy and basic ML concepts',
        'Laptop with Python 3.7+ installed'
      ],
      outcomes: [
        'Understand neural network fundamentals',
        'Build and train your first deep learning model',
        'Learn about different neural network architectures',
        'Gain hands-on experience with TensorFlow/PyTorch'
      ]
    },
    'ai-ethics-symposium': {
      title: 'AI Ethics Symposium',
      date: 'March 22, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      attendees: '100+ Expected',
      level: 'All Levels',
      instructor: 'Industry Experts Panel',
      description: `Explore the critical ethical considerations in AI development and deployment. This symposium brings together industry leaders, researchers, and ethicists to discuss the responsible development of AI systems.`,
      agenda: [
        { time: '10:00 AM - 10:30 AM', topic: 'Opening Keynote: The Future of Ethical AI' },
        { time: '10:30 AM - 11:30 AM', topic: 'Panel: Bias in Machine Learning' },
        { time: '11:30 AM - 12:00 PM', topic: 'Coffee Break & Networking' },
        { time: '12:00 PM - 1:00 PM', topic: 'Workshop: Fairness in AI Systems' },
        { time: '1:00 PM - 2:00 PM', topic: 'Lunch Break' },
        { time: '2:00 PM - 3:00 PM', topic: 'Case Studies: AI in Healthcare & Finance' },
        { time: '3:00 PM - 4:00 PM', topic: 'Interactive Discussion & Closing' }
      ],
      prerequisites: [
        'No technical prerequisites required',
        'Interest in AI ethics and responsible technology',
        'Open mind for diverse perspectives'
      ],
      outcomes: [
        'Understand key ethical challenges in AI',
        'Learn frameworks for responsible AI development',
        'Network with industry professionals',
        'Gain insights into AI governance and policy'
      ]
    }
  };

  const event = eventData[slug || ''] || eventData['deep-learning-workshop'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 hero-gradient">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-cyber-blue hover:text-neon-green transition-colors duration-200 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold neon-text mb-6">
              {event.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center text-cyber-blue">
                <Calendar className="w-5 h-5 mr-2" />
                {event.date}
              </div>
              <div className="flex items-center text-neon-green">
                <Clock className="w-5 h-5 mr-2" />
                {event.time}
              </div>
              <div className="flex items-center text-electric-red">
                <MapPin className="w-5 h-5 mr-2" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <div className="cyber-card p-8 rounded-2xl">
                <h2 className="text-3xl font-orbitron font-bold text-gradient mb-6">
                  About This Event
                </h2>
                <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                  {event.description}
                </p>
              </div>

              {/* Agenda */}
              <div className="cyber-card p-8 rounded-2xl">
                <h3 className="text-2xl font-orbitron font-bold neon-green-text mb-6">
                  Event Agenda
                </h3>
                <div className="space-y-4">
                  {event.agenda.map((item: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-dark-matter/50 rounded-lg">
                      <div className="text-cyber-blue font-mono font-semibold min-w-[120px]">
                        {item.time}
                      </div>
                      <div className="text-foreground/90">
                        {item.topic}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="cyber-card p-8 rounded-2xl">
                <h3 className="text-2xl font-orbitron font-bold neon-red-text mb-6">
                  What You'll Learn
                </h3>
                <ul className="space-y-3">
                  {event.outcomes.map((outcome: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-electric-red rounded-full mt-2 animate-pulse" />
                      <span className="text-foreground/90">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info */}
              <div className="cyber-card p-6 rounded-2xl">
                <h3 className="text-xl font-orbitron font-bold text-gradient mb-4">
                  Event Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center text-foreground/80">
                    <Users className="w-4 h-4 mr-3 text-cyber-blue" />
                    <span className="text-sm">{event.attendees}</span>
                  </div>
                  <div className="flex items-center text-foreground/80">
                    <span className="w-4 h-4 mr-3 text-neon-green">📚</span>
                    <span className="text-sm">{event.level}</span>
                  </div>
                  <div className="flex items-center text-foreground/80">
                    <span className="w-4 h-4 mr-3 text-electric-red">👨‍🏫</span>
                    <span className="text-sm">{event.instructor}</span>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="cyber-card p-6 rounded-2xl">
                <h3 className="text-xl font-orbitron font-bold text-gradient mb-4">
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {event.prerequisites.map((req: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full mt-2" />
                      <span className="text-sm text-foreground/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Register Button */}
              <div className="cyber-card p-6 rounded-2xl text-center">
                <Button className="w-full bg-cyber-blue hover:bg-cyber-blue/90 text-deep-space font-orbitron font-semibold py-3 rounded-xl glow-hover transition-all duration-300">
                  Register Now
                </Button>
                <p className="text-xs text-foreground/60 mt-3">
                  Registration closes 24 hours before the event
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDetail;