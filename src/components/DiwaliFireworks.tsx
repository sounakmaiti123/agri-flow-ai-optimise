import { useEffect, useState } from "react";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  timestamp: number;
}

const DiwaliFireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const addFirework = () => {
      const colors = [
        'from-yellow-400 via-orange-500 to-red-500',
        'from-pink-500 via-purple-500 to-indigo-500',
        'from-green-400 via-teal-500 to-blue-500',
        'from-red-500 via-pink-500 to-purple-500',
        'from-amber-400 via-yellow-500 to-orange-500',
      ];
      
      const newFirework: Firework = {
        id: idCounter++,
        x: Math.random() * 80 + 10, // Keep away from edges
        y: Math.random() * 50 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        timestamp: Date.now(),
      };
      
      setFireworks(prev => [...prev, newFirework]);
      
      // Remove firework after animation completes
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 3000);
    };
    
    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(addFirework, i * 300);
    }
    
    // Continuous fireworks
    const interval = setInterval(addFirework, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
          }}
        >
          {/* Rocket trail going up */}
          <div 
            className="absolute w-0.5 h-16 -bottom-16 left-1/2 -translate-x-1/2 opacity-0"
            style={{
              background: `linear-gradient(to top, transparent, ${fw.color.includes('yellow') ? '#fbbf24' : '#ef4444'})`,
              animation: 'rocket-trail 0.6s ease-out forwards',
            }}
          />
          
          {/* Main explosion burst */}
          <div className="relative">
            {/* Center glow */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 animate-ping">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${fw.color} opacity-90`} 
                style={{
                  boxShadow: `0 0 20px 5px rgba(255, 200, 0, 0.6)`,
                  animation: 'center-burst 0.5s ease-out forwards'
                }}
              />
            </div>
            
            {/* Primary sparks - outer ring */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i * 18) * (Math.PI / 180);
              const distance = 60 + Math.random() * 40;
              const sparkColor = i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f97316' : '#ef4444';
              
              return (
                <div
                  key={`outer-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: sparkColor,
                    boxShadow: `0 0 8px 2px ${sparkColor}`,
                    left: '50%',
                    top: '50%',
                    animation: `spark-burst 1.8s cubic-bezier(0.33, 1, 0.68, 1) forwards`,
                    animationDelay: '0.05s',
                    '--spark-x': `${Math.cos(angle) * distance}px`,
                    '--spark-y': `${Math.sin(angle) * distance}px`,
                  } as any}
                />
              );
            })}
            
            {/* Secondary sparks - inner ring */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = ((i * 22.5) + 11.25) * (Math.PI / 180);
              const distance = 35 + Math.random() * 25;
              const sparkColor = i % 2 === 0 ? '#fde047' : '#fb923c';
              
              return (
                <div
                  key={`inner-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: sparkColor,
                    boxShadow: `0 0 6px 1px ${sparkColor}`,
                    left: '50%',
                    top: '50%',
                    animation: `spark-burst 1.5s cubic-bezier(0.33, 1, 0.68, 1) forwards`,
                    animationDelay: '0.1s',
                    '--spark-x': `${Math.cos(angle) * distance}px`,
                    '--spark-y': `${Math.sin(angle) * distance}px`,
                  } as any}
                />
              );
            })}
            
            {/* Trailing particles */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const distance = 45 + Math.random() * 30;
              
              return (
                <div
                  key={`trail-${i}`}
                  className="absolute w-0.5 h-8 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, rgba(251, 191, 36, 0.8), transparent)`,
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'top center',
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                    animation: `trail-fade 1.2s ease-out forwards`,
                    animationDelay: '0.2s',
                  }}
                />
              );
            })}
          </div>

          {/* Glitter particles */}
          {Array.from({ length: 24 }).map((_, i) => {
            const randomAngle = Math.random() * Math.PI * 2;
            const randomDist = 20 + Math.random() * 50;
            return (
              <div
                key={`glitter-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: '#fff',
                  boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.8)',
                  left: '50%',
                  top: '50%',
                  animation: `glitter-float 2s ease-out forwards`,
                  animationDelay: `${0.3 + Math.random() * 0.3}s`,
                  '--glitter-x': `${Math.cos(randomAngle) * randomDist}px`,
                  '--glitter-y': `${Math.sin(randomAngle) * randomDist}px`,
                } as any}
              />
            );
          })}
        </div>
      ))}

      <style>
        {`
          @keyframes rocket-trail {
            0% {
              opacity: 0;
              height: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              height: 64px;
            }
          }
          
          @keyframes center-burst {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.8;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
          
          @keyframes spark-burst {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            70% {
              opacity: 0.8;
            }
            100% {
              transform: translate(calc(-50% + var(--spark-x)), calc(-50% + var(--spark-y))) scale(0);
              opacity: 0;
            }
          }
          
          @keyframes trail-fade {
            0% {
              opacity: 1;
              height: 32px;
            }
            100% {
              opacity: 0;
              height: 4px;
            }
          }
          
          @keyframes glitter-float {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translate(calc(-50% + var(--glitter-x)), calc(-50% + var(--glitter-y))) scale(0);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DiwaliFireworks;
