import { useEffect, useState } from "react";

const DiwaliFireworks = () => {
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Generate random fireworks
    const newFireworks = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60 + 10,
      delay: Math.random() * 2,
    }));
    setFireworks(newFireworks);

    // Hide after animation completes
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
            animationDelay: `${fw.delay}s`,
          }}
        >
          {/* Center burst */}
          <div className="relative">
            <div className="absolute animate-ping">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-75" />
            </div>
            
            {/* Sparks radiating outward */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const distance = 40 + Math.random() * 30;
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full animate-[fade-out_1.5s_ease-out_forwards]"
                  style={{
                    background: `hsl(${Math.random() * 60 + 20}, 100%, 60%)`,
                    transform: `translate(-50%, -50%)`,
                    animation: `sparkle-out-${i} 1.5s ease-out forwards`,
                    animationDelay: `${fw.delay}s`,
                    left: '50%',
                    top: '50%',
                  }}
                >
                  <style>
                    {`
                      @keyframes sparkle-out-${i} {
                        0% {
                          transform: translate(-50%, -50%) scale(1);
                          opacity: 1;
                        }
                        100% {
                          transform: translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0);
                          opacity: 0;
                        }
                      }
                    `}
                  </style>
                </div>
              );
            })}
          </div>

          {/* Glowing particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full animate-[fade-in_0.3s_ease-out,fade-out_2s_ease-out_0.3s_forwards]"
              style={{
                background: i % 2 === 0 ? 'hsl(45, 100%, 60%)' : 'hsl(15, 100%, 60%)',
                left: `${Math.cos(i * 45 * Math.PI / 180) * 20}px`,
                top: `${Math.sin(i * 45 * Math.PI / 180) * 20}px`,
                animationDelay: `${fw.delay + 0.2}s`,
                boxShadow: '0 0 10px currentColor',
              }}
            />
          ))}
        </div>
      ))}

      {/* Celebratory text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center animate-[scale-in_0.5s_ease-out,fade-out_1s_ease-out_3s_forwards]">
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          Happy Diwali! 🪔
        </h2>
      </div>
    </div>
  );
};

export default DiwaliFireworks;
