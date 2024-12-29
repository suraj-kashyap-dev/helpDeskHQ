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
      <div className="space-y-1">
        <div className="relative">
          <select
            ref={ref}
            className={`
            appearance-none w-full bg-white border border-neutral-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:border-neutral-400
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `}
            {...props}
          >
            {children}
          </select>

          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
