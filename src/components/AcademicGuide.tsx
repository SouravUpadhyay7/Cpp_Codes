import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import hodImage from '@/assets/members pic/HOD-removebg-preview.png';

const AcademicGuide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

// HOD Information
const hod = {
  name: "Dr. Jyoti Sekhar Banerjee",
  role: "Head of Department",
  image: hodImage,
  skills: ["AI Research", "Machine Learning", "Academic Leadership"],
  description: "Dr. Jyoti Sekhar Banerjee, Ph.D., is the Head of the CSE ( AI & ML ) Department at Techno Bengal Institute of Technology, Kolkata. With many years of teaching, research, and academic leadership experience, he has contributed numerous research papers to reputed international journals, conferences, and book chapters. A former Post-Doctoral Fellow at Nottingham Trent University (UK), he also leads various R&D and IPR initiatives. Dr. Banerjee continues to guide the department with vision, innovation, and excellence.",
  achievements: [
    "Ph.D. in Computer Science",
    "Extensive Academic and Research Experience",
    "Published Many Research Papers",
    "Post-Doctoral Fellow at Nottingham Trent University (UK)",
    "Leadership in R&D and IPR Initiatives",
    "Active Member of Professional Bodies"
  ],
  linkedin: "https://www.linkedin.com/in/dr-jyoti-sekhar-banerjee-6b052718b/",
};


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
    <section
      ref={sectionRef}
      id="academic-guide"
      className="pt-24 pb-20 bg-gradient-to-b from-deep-space/50 to-deep-space/80 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-neon-green/20 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-cyber-blue/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-electric-red/10 rounded-full animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 fade-in-up ${isVisible ? 'animate' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-gradient mb-4">
            Visionary Head
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-green to-cyber-blue mx-auto mb-6" />
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Meet our distinguished Head of Department who guides our academic journey
          </p>
        </div>

        {/* HOD Section - Horizontal Layout */}
        <div className={`fade-in-up ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
          <div className="max-w-7xl mx-auto">
            {/* Single Horizontal Card */}
            <div className="glass-card-premium p-8 rounded-2xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center">

                {/* Left Side - HOD Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Floating Circle Container */}
                    <div className="relative w-72 h-72 group">
                      {/* Outer Glow Ring - FULL CIRCLE but bigger and moved right */}
                      <div
                        className="
                          absolute inset-0
                          w-[300px] h-[300px]        /* ⬅️ Increased size */
                          left-3                     /* ⬅️ Shifts slightly to the right */
                          rounded-full               /* ⬅️ Keeps it a full circle */
                          border-4 border-neon-green/30
                          animate-pulse-glow
                          group-hover:border-neon-green/60
                          transition-all duration-500
                        "
                      />

                      {/* Middle Ring - Still full circle */}
                      <div className="absolute inset-4 rounded-full border-2 border-cyber-blue/40 animate-float"></div>

                      {/* Inner Image Container */}
                      <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 shadow-2xl">
                        <img
                          src={hod.image}
                          alt={hod.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Image Overlay Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 via-transparent to-cyber-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-green/60 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyber-blue/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute top-1/2 -left-8 w-4 h-4 bg-electric-red/60 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>

                      {/* LinkedIn Icon */}
                      <a
                        href={hod.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 w-12 h-12 bg-cyber-blue/20 hover:bg-cyber-blue/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm"
                      >
                        <Linkedin className="w-6 h-6 text-cyber-blue" />
                      </a>
                    </div>

                    {/* Name and Title Below Image */}
                    <div className="text-center mt-6">
                      <h3 className="text-2xl lg:text-3xl font-orbitron font-bold text-gradient mb-2">
                        {hod.name}
                      </h3>
                      <p className="text-lg neon-green-text font-semibold mb-1">
                        {hod.role}
                      </p>
                      <p className="text-sm text-cyber-blue font-medium">
                        CSE ( AI & ML ) Department
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - HOD Information */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <p className="text-foreground/80 leading-relaxed text-justify">
                      {hod.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-lg font-orbitron font-semibold text-neon-green mb-3">Expertise Areas</h4>
                      <div className="flex flex-wrap gap-3">
                        {hod.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full text-sm font-medium hover:bg-neon-green/30 transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-orbitron font-semibold text-cyber-blue mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {hod.achievements.map((achievement, index) => (
                          <li
                            key={index}
                            className="flex items-start text-foreground/70"
                          >
                            <div className="w-2 h-2 bg-electric-red rounded-full mr-3 mt-2 animate-pulse flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicGuide;
