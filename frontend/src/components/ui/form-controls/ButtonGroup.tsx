import React from 'react';

interface ButtonGroupProps {
  children: React.ReactNode;
  alignment?: 'start' | 'center' | 'end';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  alignment = 'start',
  gap = 'md',
  className = '',
}) => {
  const alignmentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={`
        flex
        ${alignmentClasses[alignment]}
        ${gapClasses[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
