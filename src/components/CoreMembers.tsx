import { useEffect, useRef, useState } from 'react';
import member1 from '@/assets/members pic/person.jpg';
import member2 from '@/assets/members pic/person.jpg';
import member3 from '@/assets/members pic/person.jpg';



const CoreMembers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const members = [
    {
      name: "person1",
      role: "Team Lead",
      image: member1,
      skills: ["Deep Learning", "Computer Vision", "Python"],
      description: "Leading the club with passion for AI research and innovation"
    },
    {
      name: "person2",
      role: "Social Media Lead",
      image: member2,
      skills: ["Python", "IoT", "APP Development"],
      description: "Innovating with Python, IoT, and App Development."
    },
    {
      name: "person3",
      role: "Tech Lead",
      image: member3,
      skills: ["Python", "Machine Learning", "NLP"],
      description: "Building AI solutions with Python, ML, and NLP."
    },

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

  return (
    <section id="members" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
            Core Team
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-electric-red to-cyber-blue mx-auto mb-8" />
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Meet the brilliant minds driving NeuroNinjas forward
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div 
              key={member.name}
              className={`fade-in-up ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="cyber-card p-6 rounded-2xl group hover:scale-105 transition-all duration-500 glow-hover">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-cyber-blue/30 group-hover:border-cyber-blue transition-all duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-neon-green rounded-full opacity-80 animate-pulse" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-orbitron font-bold text-gradient mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg neon-green-text font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreMembers;