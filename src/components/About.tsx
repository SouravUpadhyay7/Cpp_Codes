import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
            About us
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-neon-green mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`fade-in-left ${isVisible ? 'animate' : ''}`}>
            <div className="cyber-card p-8 rounded-2xl">
              <h3 className="text-3xl font-orbitron font-semibold text-gradient mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                Synapse is the premier Artificial Intelligence and Machine Learning club at Techno Bengal Institute of Technology Kolkata , 
                dedicated to fostering innovation, learning, and collaboration in the rapidly evolving world of AI/ML.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                We believe in empowering students with cutting-edge knowledge, hands-on experience, and the 
                skills needed to become tomorrow's AI pioneers and tech leaders.
              </p>
            </div>
          </div>
          
          <div className={`fade-in-right ${isVisible ? 'animate' : ''}`}>
            <div className="space-y-6">
              <div className="cyber-card p-6 rounded-xl glow-hover">
                <h4 className="text-xl font-orbitron font-semibold neon-green-text mb-3">
                  🚀 Innovation Hub
                </h4>
                <p className="text-foreground/80">
                  Explore cutting-edge AI technologies and work on real-world projects
                </p>
              </div>
              
              <div className="cyber-card p-6 rounded-xl glow-hover">
                <h4 className="text-xl font-orbitron font-semibold neon-red-text mb-3">
                  🧠 Knowledge Sharing
                </h4>
                <p className="text-foreground/80">
                  Learn from industry experts, workshops, and collaborative study groups
                </p>
              </div>
              
              <div className="cyber-card p-6 rounded-xl glow-hover">
                <h4 className="text-xl font-orbitron font-semibold text-cyber-blue mb-3">
                  🌟 Community Building
                </h4>
                <p className="text-foreground/80">
                  Connect with like-minded peers and build lasting professional networks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;