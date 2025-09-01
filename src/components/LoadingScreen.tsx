import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loadingPhases = [
    "Initializing Neural Networks...",
    "Loading AI Models...",
    "Connecting to Synapse Core...",
    "Calibrating Machine Learning Algorithms...",
    "Establishing Neural Pathways...",
    "Synapse Ready!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 12 + 3;

        // Update phase based on progress
        const phaseIndex = Math.min(Math.floor(newProgress / 17), loadingPhases.length - 1);
        setCurrentPhase(phaseIndex);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 800);
          }, 1500);
          return 100;
        }

        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-deep-space flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Neural Network Background */}
        <div className="neural-network">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="neural-node"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <div
              key={`connection-${i}`}
              className="neural-connection"
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
                width: `${100 + Math.random() * 300}px`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 12}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-2xl px-8">
        {/* Logo/Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-synapse font-black astrolab mb-4 animate-pulse-glow">
  PredAIction
</h1>
          <p className="text-xl md:text-2xl font-orbitron text-cyber-blue animate-fade-in">
            AI & Machine Learning Club
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full h-3 glass-card-subtle rounded-full overflow-hidden border border-cyber-blue/30">
            <div
              className="h-full bg-gradient-to-r from-cyber-blue via-neon-green to-electric-red transition-all duration-300 ease-out relative glass-shimmer"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between mt-3 text-sm font-jetbrains">
            <span className="text-cyber-blue font-semibold">{Math.round(progress)}%</span>
            <span className="text-neon-green font-semibold">Loading...</span>
          </div>
        </div>

        {/* Loading Phase Text */}
        <div className="mb-8">
          <p className="text-lg font-orbitron text-foreground/90 animate-pulse">
            {loadingPhases[currentPhase]}
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-cyber-blue rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Scanning Lines Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scanning-line" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
