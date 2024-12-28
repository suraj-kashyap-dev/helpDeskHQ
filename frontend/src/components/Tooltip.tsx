import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  limit: number;
}

const Tooltip: React.FC<TooltipProps> = ({ text, limit }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const shouldTruncate = text.length > limit;
  const displayText = shouldTruncate ? `${text.substring(0, limit)}...` : text;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Display Truncated Text */}
      <span className="cursor-pointer">{displayText}</span>

      {/* Tooltip */}
      {shouldTruncate && showTooltip && (
        <div className="absolute left-1/2 -top-8 transform -translate-x-1/2">
          <div className="bg-gray-800 text-white text-xs rounded px-3 py-2 shadow-lg whitespace-nowrap">
            {text}
          </div>
          {/* Tooltip Arrow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
