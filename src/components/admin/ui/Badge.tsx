type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variantClasses = {
    default: 'bg-white/10 text-white/80',
    success: 'bg-green-500/20 text-green-300',
    warning: 'bg-orange-500/20 text-orange-300',
    danger: 'bg-red-500/20 text-red-300',
    info: 'bg-blue-500/20 text-blue-300',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center ${className || ""} font-bold rounded-lg uppercase tracking-wide ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </span>
  );
}
