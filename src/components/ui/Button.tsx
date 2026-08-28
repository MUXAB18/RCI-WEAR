import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  withArrow?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  download?: boolean | string;
  target?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  href, 
  withArrow = false,
  loading = false,
  icon,
  className,
  download,
  target,
  ...props 
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[10px] font-bold tracking-[3px] uppercase overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-near-black text-white hover:bg-[#1a1a1a] hover:-translate-y-[2px] hover:shadow-xl",
    outline: "bg-transparent text-near-black border border-near-black/25 hover:border-near-black hover:-translate-y-[2px]",
    ghost: "bg-transparent text-near-black px-0 py-2 border-b border-near-black/20 hover:border-near-black",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-3">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && icon}
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
    if (href.startsWith('http') || href.endsWith('.pdf') || download) {
      return (
        <a 
          href={href} 
          className={finalClassName} 
          download={download} 
          target={target || (href.endsWith('.pdf') ? "_blank" : undefined)} 
          rel={target === "_blank" || href.endsWith('.pdf') ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={finalClassName} target={target}>
        {content}
      </Link>
    );
  }

  return (
    <button className={finalClassName} disabled={loading || props.disabled} {...props}>
      {content}
    </button>
  );
}
