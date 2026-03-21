import { useState, useEffect } from "react";

export default function PredictionCard({ title, genre, probability, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const percentage = Math.round(probability * 100);
  
  // Highlighting color based on probability
  const getGradient = (prob) => {
    if (prob > 0.8) return "from-emerald-400 to-teal-500 shadow-emerald-500/50";
    if (prob > 0.5) return "from-blue-400 to-indigo-500 shadow-blue-500/50";
    return "from-amber-400 to-orange-500 shadow-amber-500/50";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay * 150); // Stagger animation
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-md hover:bg-slate-800 transition-colors">
      <h3 className="text-xl font-bold tracking-tight text-white mb-4">{title}</h3>
      
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">Predicted Genre</p>
          <p className="text-2xl font-black capitalize bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {genre}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-400 mb-1">Confidence</p>
          <p className="text-xl font-bold text-white">
            {percentage}%
          </p>
        </div>
      </div>

      <div className="mt-4 relative h-3 bg-slate-900 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getGradient(probability)} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
