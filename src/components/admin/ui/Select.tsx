'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full bg-white/[0.05] border ${
            error ? 'border-red-500/50' : 'border-white/[0.1]'
          } rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/[0.3] focus:bg-white/[0.08] transition ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0d0d0d] text-white">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {helperText && !error && <p className="text-xs text-white/40">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
