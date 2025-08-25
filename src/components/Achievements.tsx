import { useEffect, useRef, useState } from 'react';

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    members: 0,
    projects: 0,
    events: 0,
    workshops: 0
  });
  const sectionRef = useRef(null);

  const finalCounts = {
    members: 150,
    projects: 25,
    events: 18,
    workshops: 32
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            startCounterAnimation();
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

  const startCounterAnimation = () => {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);

    Object.keys(finalCounts).forEach((key) => {
      const finalValue = finalCounts[key as keyof typeof finalCounts];
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.round(finalValue * progress);

        setCounters(prev => ({...prev, [key]: currentValue}));

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    });
  };

  const achievements = [
    {
      title: "Active Members",
      count: counters.members,
      suffix: "+",
      description: "Passionate AI/ML enthusiasts",
      icon: "👥",
      color: "text-cyber-blue"
    },
    {
      title: "Projects Completed",
      count: counters.projects,
      suffix: "+",
      description: "Innovative AI solutions built",
      icon: "🚀",
      color: "text-neon-green"
    },
    {
      title: "Events Hosted",
      count: counters.events,
      suffix: "+",
      description: "Learning experiences created",
      icon: "🎯",
      color: "text-electric-red"
    },
    {
      title: "Workshops Conducted",
      count: counters.workshops,
      suffix: "+",
      description: "Knowledge sharing sessions",
      icon: "🧠",
      color: "text-cosmic-purple"
    }
  ];

  const highlights = [
    {
      title: "Best AI Club Award 2023",
      description: "Recognized by the university for outstanding contributions to AI education"
    },
    {
      title: "National Hackathon Winners",
      description: "Our team secured 1st place in the National AI Innovation Challenge"
    },
    {
      title: "Industry Partnerships",
      description: "Collaborating with leading tech companies for mentorship and internships"
    },
    {
      title: "Research Publications",
      description: "Students published 8+ research papers in renowned AI conferences"
    }
  ];

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 relative animated-bg">
      {/* Floating Particles Background */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 25}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
            Our Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cosmic-purple to-cyber-blue mx-auto mb-8" />
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Celebrating milestones and successes in our AI/ML journey
          </p>
        </div>

        {/* Stats Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.title}
              className={`scale-in ${isVisible ? 'animate' : ''} text-center`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="glass-card-premium p-6 rounded-2xl glow-hover group hover:scale-105 transition-all duration-500">
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {achievement.icon}
                </div>
                <div className={`text-4xl md:text-5xl font-orbitron font-bold ${achievement.color} mb-2`}>
                  {achievement.count}{achievement.suffix}
                </div>
                <h3 className="text-lg font-orbitron font-semibold text-gradient mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-foreground/70">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className={`fade-in-up ${isVisible ? 'animate' : ''}`}>
          <h3 className="text-3xl font-orbitron font-bold text-center text-gradient mb-12">
            Key Highlights
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((highlight, index) => (
              <div 
                key={highlight.title}
                className={`fade-in-up ${isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${(index + 4) * 0.2}s` }}
              >
                <div className="glass-tinted p-6 rounded-xl glow-green-hover group hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-neon-green rounded-full mt-2 animate-pulse" />
                    <div>
                      <h4 className="text-xl font-orbitron font-semibold neon-green-text mb-2">
                        {highlight.title}
                      </h4>
                      <p className="text-foreground/80 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;