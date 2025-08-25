import { useState, useEffect, useRef } from 'react';
import { TypingText } from './MorphingText';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}

const AITerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = [
    {
      command: 'synapse --init',
      output: [
        'Initializing SYNAPSE AI Framework...',
        'Loading neural network modules... ✓',
        'Connecting to machine learning pipeline... ✓',
        'SYNAPSE v2.1.0 ready for deployment'
      ]
    },
    {
      command: 'train --model deep_learning --dataset student_projects',
      output: [
        'Training deep learning model...',
        'Epoch 1/100: loss=0.4521, accuracy=0.8234',
        'Epoch 50/100: loss=0.1234, accuracy=0.9567',
        'Epoch 100/100: loss=0.0456, accuracy=0.9823',
        'Model training completed successfully! 🚀'
      ]
    },
    {
      command: 'analyze --club-performance --metrics engagement',
      output: [
        'Analyzing AIML Club performance...',
        'Active members: 150+',
        'Projects completed: 45',
        'Workshop attendance: 95%',
        'Student satisfaction: 98.7%',
        'Performance analysis complete ✨'
      ]
    },
    {
      command: 'deploy --project neural_network_visualizer',
      output: [
        'Deploying neural network visualizer...',
        'Building production bundle... ✓',
        'Optimizing AI algorithms... ✓',
        'Configuring cloud infrastructure... ✓',
        'Deployment successful! 🎯'
      ]
    }
  ];

  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString() + Math.random(),
      type,
      content,
      timestamp: new Date()
    };
    setLines(prev => [...prev, newLine]);
  };

  const executeCommand = async (cmd: string) => {
    setIsProcessing(true);
    addLine('command', `$ ${cmd}`);

    // Find matching command
    const commandData = commands.find(c => c.command === cmd);
    
    if (commandData) {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add output lines with delays
      for (let i = 0; i < commandData.output.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        addLine(i === commandData.output.length - 1 ? 'success' : 'output', commandData.output[i]);
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 500));
      addLine('error', `Command not found: ${cmd}`);
    }

    setIsProcessing(false);
  };

  const runDemo = async () => {
    setLines([]);
    addLine('output', 'Welcome to SYNAPSE AI Terminal');
    addLine('output', 'Artificial Intelligence & Machine Learning Club');
    addLine('output', '═══════════════════════════════════════════');
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    for (const cmd of commands) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await executeCommand(cmd.command);
    }

    // Add final message
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLine('success', 'All systems operational. Ready for innovation! 🚀');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setTimeout(() => {
              runDemo();
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-cyber-blue';
      case 'output':
        return 'text-foreground/80';
      case 'error':
        return 'text-electric-red';
      case 'success':
        return 'text-neon-green';
      default:
        return 'text-foreground';
    }
  };

  const getPrompt = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return '';
      case 'error':
        return '[ERROR] ';
      case 'success':
        return '[SUCCESS] ';
      default:
        return '> ';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-card-premium rounded-lg overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-dark-matter/50 border-b border-cyber-blue/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-electric-red"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-neon-green"></div>
          </div>
          <div className="text-sm font-jetbrains text-cyber-blue">
            SYNAPSE AI Terminal v2.1.0
          </div>
          <div className="text-xs text-foreground/60 font-jetbrains">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 bg-deep-space/80 font-jetbrains text-sm"
        >
          {lines.map((line, index) => (
            <div key={line.id} className={`mb-1 ${getLineColor(line.type)}`}>
              <span className="text-neon-green/60">{getPrompt(line.type)}</span>
              {index === lines.length - 1 && !isProcessing ? (
                <TypingText 
                  text={line.content} 
                  speed={30}
                  cursor={line.type === 'command'}
                />
              ) : (
                line.content
              )}
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex items-center space-x-2 text-cyber-blue">
              <span>Processing</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 bg-dark-matter/30 border-t border-cyber-blue/20 text-xs text-foreground/60 font-jetbrains">
          <div className="flex justify-between">
            <span>Connected to SYNAPSE AI Network</span>
            <span>Status: {isProcessing ? 'Processing...' : 'Ready'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITerminal;
