import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import member1 from '@/assets/members pic/Abhinav.jpeg';

import member2 from '@/assets/members pic/person.jpg';
import member3 from '@/assets/members pic/yash.png';





const CoreMembers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

// HOD moved to AcademicGuide section
/*const hod = {
  name: "Dr. Jyoti Sekhar Banerjee",
  role: "Head of Department",
  image: hodImage,
  skills: ["AI Research", "Machine Learning", "Academic Leadership"],
  description: "Dr. Jyoti Sekhar Banerjee, Ph.D. (Engg.), serves as the Head of the CSE (AI & ML) Department at Bengal Institute of Technology, Kolkata. With nearly two decades of teaching, research, and academic leadership, he has published over 70 research papers in reputed international journals, conferences, and book chapters. A former Post-Doctoral Fellow at Nottingham Trent University (UK), he also leads the institute’s R&D and IPR initiatives. Actively involved in professional bodies like ISTE, CSI, and IETE, Dr. Banerjee continues to guide the department with vision, innovation, and excellence.",
  linkedin: "https://www.linkedin.com/in/dr-jyoti-sekhar-banerjee-6b052718b/",
  isHOD: true
};*/


  const members = [
    {
      name: "Abhinav",
      role: "Club Lead",
      image: member1,
      skills: ["IoT", "Computer Vision", "Python"],
      description: "Leading the club with passion for AI research and innovation",
      year: "3rd Year",
      linkedin: "https://www.linkedin.com/in/abhinavbit/" // Add actual LinkedIn URL
    },

    {
      name: "Sourav Upadhyay",
      role: "Tech Lead",
      image: member2,
      skills: ["Python", "Machine Learning", "NLP"],
      description: "Building AI solutions with Python, ML, and NLP.",
      year: "3rd Year",
      linkedin: "https://www.linkedin.com/in/sourav-upadhyay-00a975276/" // Add actual LinkedIn URL
    },

      {
      name: "Yash Mohan",
      role: "Social Media Lead",
      image: member3,
      skills: ["Python", "Machine Learning", "NLP"],
      description: "Building AI solutions with Python, ML, and NLP.",
      year: "3rd Year",
      linkedin: "https://www.linkedin.com/in/yash-mhn/" // Add actual LinkedIn URL
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
    <section id="members" ref={sectionRef} className="py-20 px-4 relative animated-bg">
      {/* Neural Network Background */}
      <div className="neural-network">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="neural-node"
            style={{
              left: `${10 + (i * 20)}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <div
            key={`connection-${i}`}
            className="neural-connection"
            style={{
              left: `${15 + (i * 20)}%`,
              top: `${30 + Math.random() * 40}%`,
              width: `${100 + Math.random() * 100}px`,
              animationDelay: `${i * 1}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
            Core Team
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-electric-red to-cyber-blue mx-auto mb-8" />
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Meet the brilliant minds driving Synapse forward
          </p>
        </div>
        
        {/* HOD moved to AcademicGuide section */}

        {/* Core Members Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div
              key={member.name}
              className={`fade-in-up ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            >
              <div className="glass-card-premium p-6 rounded-2xl group hover:scale-105 transition-all duration-500 glow-hover">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-cyber-blue/30 group-hover:border-cyber-blue transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-neon-green rounded-full opacity-80 animate-pulse" />
                  {/* LinkedIn Icon for Members */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 w-8 h-8 bg-cyber-blue/20 hover:bg-cyber-blue/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4 text-cyber-blue" />
                  </a>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-orbitron font-bold text-gradient mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg neon-green-text font-semibold mb-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-electric-red font-medium mb-3">
                    {member.year}
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