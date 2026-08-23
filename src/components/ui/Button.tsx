import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  withArrow?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  href, 
  withArrow = false,
  className,
  ...props 
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[10px] font-bold tracking-[3px] uppercase overflow-hidden transition-all duration-300";
  
  const variants = {
    primary: "bg-near-black text-white hover:bg-[#1a1a1a] hover:-translate-y-[2px] hover:shadow-xl",
    outline: "bg-transparent text-near-black border border-near-black/25 hover:border-near-black hover:-translate-y-[2px]",
    ghost: "bg-transparent text-near-black px-0 py-2 border-b border-near-black/20 hover:border-near-black",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {withArrow && <ArrowRight className="w-4 h-4" />}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/10 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0" />
      )}
    </>
  );

  const finalClassName = cn(baseStyles, variants[variant], 'group', className);

  if (href) {
    return (
      <Link href={href} className={finalClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={finalClassName} {...props}>
      {content}
    </button>
  );
}
