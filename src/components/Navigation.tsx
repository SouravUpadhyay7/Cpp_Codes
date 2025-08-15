import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/l.jpg';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#members' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-dark-matter/95 backdrop-blur-md border-b border-cyber-blue/20 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-3 group"
            >
              <img 
                src={logo} 
                alt="TrAIn-N-Test Logo" 
                className="w-10 h-10 rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-orbitron font-bold text-gradient">
                  [TrAIn-N-Test]
                </h1>
                <p className="text-xs text-cyber-blue -mt-1">The AIML Club</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground/80 hover:text-cyber-blue font-rajdhani font-medium transition-all duration-300 relative group"
                >
                  {item.name}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-blue transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-transparent hover:bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-deep-space/95 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-3 mb-8 group"
          >
            <img 
              src={logo} 
              alt="TrAIn-N-Test Logo" 
              className="w-12 h-12 rounded-lg group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h1 className="text-2xl font-orbitron font-bold text-gradient">
                [TrAIn-N-Test]
              </h1>
              <p className="text-sm text-cyber-blue -mt-1">The AIML Club</p>
            </div>
          </button>

          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`text-2xl font-orbitron font-medium text-foreground/80 hover:text-cyber-blue transition-all duration-300 transform hover:scale-110 fade-in-up ${
                isMobileMenuOpen ? 'animate' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;