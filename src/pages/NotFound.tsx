import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-orbitron font-bold neon-text animate-neon-flicker">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-orbitron font-semibold text-gradient">
            Neural Network Not Found
          </h2>
          <p className="text-xl text-foreground/80 max-w-md mx-auto leading-relaxed">
            The AI couldn't locate the page you're looking for. 
            It might have been deleted or moved to a different dimension.
          </p>
        </div>
        
        <div className="pt-8">
          <Link to="/">
            <Button className="bg-cyber-blue hover:bg-cyber-blue/90 text-deep-space font-orbitron font-semibold text-lg px-8 py-4 rounded-xl glow-hover transition-all duration-300 transform hover:scale-105">
              Return to Base
            </Button>
          </Link>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 border border-electric-red/30 animate-float opacity-50" />
        <div className="absolute bottom-20 right-10 w-12 h-12 border border-neon-green/30 animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-cyber-blue/20 animate-pulse-glow opacity-50" />
      </div>
    </div>
  );
};

export default NotFound;
