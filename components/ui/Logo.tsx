import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", showText = true, light = false }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <rect width="32" height="32" rx="8" fill={light ? "white" : "#2563EB"} />
        
        {/* Hexagon Shape (representing a nut/bolt/auto part) */}
        <path 
          d="M16 5.5L24.66 10.5V20.5L16 25.5L7.34 20.5V10.5L16 5.5Z" 
          stroke={light ? "#2563EB" : "white"} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Growth Chart Line */}
        <path 
          d="M10.5 18.5L14.5 14.5L18 18L22.5 10.5" 
          stroke={light ? "#2563EB" : "white"} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Data Point Dot */}
        <circle 
          cx="22.5" 
          cy="10.5" 
          r="2.5" 
          fill={light ? "#10b981" : "#34D399"} 
          stroke={light ? "white" : "#2563EB"} 
          strokeWidth="1" 
        />
      </svg>
      
      {showText && (
        <span className={`font-bold text-xl tracking-tight ${light ? "text-white" : "text-slate-900"}`}>
          SimpliParts
        </span>
      )}
    </div>
  );
};