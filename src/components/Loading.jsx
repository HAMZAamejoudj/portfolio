import { useState, useEffect } from 'react';

const ProfessionalLoading = () => {
  const [letterIndex, setLetterIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const text = "HAMZA";
  
  // Animation des lettres
  useEffect(() => {
    if (letterIndex < text.length) {
      const timeout = setTimeout(() => {
        setLetterIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [letterIndex]);
  
  // Animation de la barre de progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  // Reset de l'animation
  useEffect(() => {
    if (isComplete) {
      const resetTimeout = setTimeout(() => {
        setLetterIndex(-1);
        setProgress(0);
        setIsComplete(false);
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [isComplete]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Particules de fond animées */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Cercles d'onde animés */}
      <div className="absolute">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-purple-400/20 rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative flex flex-col items-center z-10">
        {/* Logo central avec effet de rotation */}
        <div className="relative mb-12">
          <div 
            className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 p-1"
            style={{
              animation: 'spin 3s linear infinite'
            }}
          >
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
              {/* Effet de brillance qui traverse */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                  animation: 'shine 2s ease-in-out infinite',
                  transform: 'translateX(-100%)'
                }}
              />
              
              {/* Icône centrale */}
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                H
              </div>
            </div>
          </div>
          
          {/* Particules orbitales */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(80px)`,
                animation: `orbit ${4 + i * 0.2}s linear infinite`
              }}
            />
          ))}
        </div>
        
        {/* Nom HAMZA avec effet de typewriter */}
        <div className="flex space-x-2 mb-8">
          {text.split('').map((letter, index) => (
            <div
              key={index}
              className={`text-5xl font-bold transition-all duration-500 transform ${
                index <= letterIndex 
                  ? 'opacity-100 translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400' 
                  : 'opacity-0 translate-y-8 text-gray-600'
              }`}
              style={{
                textShadow: index <= letterIndex ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none',
                animation: index <= letterIndex ? `glow 2s ease-in-out infinite alternate` : 'none'
              }}
            >
              {letter}
            </div>
          ))}
        </div>
        
        {/* Barre de progression moderne */}
        <div className="w-80 h-1 bg-gray-800 rounded-full overflow-hidden relative mb-6">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Effet de brillance sur la barre */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
        
        {/* Pourcentage */}
        <div className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
          {progress}%
        </div>
        
        {/* Texte de chargement */}
        <div className="text-gray-400 text-sm tracking-wider">
          {progress < 30 && "Initialisation..."}
          {progress >= 30 && progress < 60 && "Chargement des ressources..."}
          {progress >= 60 && progress < 90 && "Finalisation..."}
          {progress >= 90 && !isComplete && "Presque terminé..."}
          {isComplete && "Terminé !"}
        </div>
      </div>
      
      {/* Styles d'animation intégrés */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(80px); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(80px); }
        }
        
        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
          100% { text-shadow: 0 0 30px rgba(139, 92, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.5); }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalLoading;