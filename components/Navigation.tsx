import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  variant?: 'filled' | 'outlined';
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  variant = 'filled',
  className = '',
}) => {
  const isOutlined = variant === 'outlined';
  
  const containerClasses = isOutlined
    ? `rounded-full w-[70px] p-0.5 flex justify-around items-center bg-gray  text-gray-400 ${className}`
    : `rounded-full w-[70px] p-0.5 flex justify-around items-center bg-[#EC84FA] text-white ${className}`;

  const buttonClasses = isOutlined
    ? "rounded-full transition-all active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
    : "rounded-full transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className={containerClasses}>
      <button
        onClick={onPrevious}
        disabled={disablePrevious}
        className={buttonClasses}
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={disableNext}
        className={buttonClasses}
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Navigation;