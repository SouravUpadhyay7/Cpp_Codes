import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/bg pics/synapse1.png';

const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Members', href: '#members' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-matter border-t border-cyber-blue/20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-space/50 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img src={logo} alt="NeuroNinjas Logo" className="w-12 h-12 rounded-lg" />
              <div>
                <h3 className="text-2xl font-orbitron font-bold text-gradient">
                  Synapse
                </h3>
                <p className="text-sm text-cyber-blue">Society for Next-Gen AI Perspectives & Systems in Engineering</p>
              </div>
            </div>
            <p className="text-foreground/70 leading-relaxed mb-6 max-w-md">
              Empowering the next generation of AI innovators through hands-on learning, 
              cutting-edge projects, and collaborative research in artificial intelligence 
              and machine learning.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-foreground/60 hover:text-cyber-blue transition-all duration-300 hover:scale-125 glow-hover p-2 rounded-full border border-cyber-blue/20"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-orbitron font-semibold neon-green-text mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-foreground/70 hover:text-neon-green transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-orbitron font-semibold neon-red-text mb-6">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-center text-foreground/70">
                <Mail className="w-4 h-4 mr-3 text-cyber-blue" />
                <span className="text-sm">synapse@college.edu</span>
              </div>
              <div className="flex items-center text-foreground/70">
                <Phone className="w-4 h-4 mr-3 text-neon-green" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-start text-foreground/70">
                <MapPin className="w-4 h-4 mr-3 text-electric-red mt-0.5" />
                <span className="text-sm">AIML Department<br />Techno Bengal Institute of Technology Kolkata</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cyber-blue/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-foreground/60 text-sm">
                © 2025 Synapse - TBIT AIML Club. All rights reserved.
              </p>
              <p className="text-foreground/40 text-xs mt-1">
                Built with 💙 for the future of AI
              </p>
            </div>
            
            <button
              onClick={scrollToTop}
              className="bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue border border-cyber-blue/30 rounded-full p-3 transition-all duration-300 hover:scale-110 glow-hover"
              title="Back to top"
            >
              <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;