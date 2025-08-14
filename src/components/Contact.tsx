import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const { toast } = useToast();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent! 🚀",
      description: "Thanks for reaching out! We'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'text-cyber-blue' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'text-neon-green' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'text-electric-red' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold neon-text mb-6">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-electric-red mx-auto mb-8" />
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Ready to join the AI revolution? Let's connect and build the future together!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`fade-in-left ${isVisible ? 'animate' : ''}`}>
            <div className="cyber-card p-8 rounded-2xl">
              <h3 className="text-3xl font-orbitron font-bold text-gradient mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-dark-matter border-cyber-blue/30 focus:border-cyber-blue text-foreground"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-dark-matter border-cyber-blue/30 focus:border-cyber-blue text-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-dark-matter border-cyber-blue/30 focus:border-cyber-blue text-foreground resize-none"
                    placeholder="Tell us about your interest in AI/ML..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue/90 text-deep-space font-orbitron font-semibold py-3 rounded-xl glow-hover transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner w-4 h-4 border-2 border-deep-space border-t-transparent rounded-full mr-2" />
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className={`fade-in-right ${isVisible ? 'animate' : ''}`}>
            <div className="space-y-8">
              <div className="cyber-card p-8 rounded-2xl">
                <h3 className="text-3xl font-orbitron font-bold text-gradient mb-6">
                  Connect With Us
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center text-foreground/80">
                    <Mail className="w-6 h-6 text-cyber-blue mr-4" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm">neuroninjas@college.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-foreground/80">
                    <Phone className="w-6 h-6 text-neon-green mr-4" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-foreground/80">
                    <MapPin className="w-6 h-6 text-electric-red mr-4" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">Computer Science Department<br />Your College Campus</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card p-8 rounded-2xl">
                <h4 className="text-xl font-orbitron font-semibold text-gradient mb-6">
                  Follow Our Journey
                </h4>
                
                <div className="flex space-x-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`${social.color} hover:scale-125 transition-all duration-300 glow-hover p-3 rounded-full border border-current/20`}
                      title={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;