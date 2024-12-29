import { ChevronDown } from 'lucide-react';
import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, helperText, children, className = '', ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`
        w-full bg-white border border-neutral-200 rounded-lg px-4 py-2 pr-1 text-sm focus:outline-none focus:border-neutral-400
        ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
        ${className}
      `}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = 'Select';
