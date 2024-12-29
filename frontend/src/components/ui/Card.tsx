import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div
      className={`p-6 space-y-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-xs text-gray-500 border-b pb-2 mb-2">
          {description}
        </p>
      )}

      <div>{children}</div>
    </div>
  );
};

export default Card;
