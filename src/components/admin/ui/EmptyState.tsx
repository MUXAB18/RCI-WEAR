import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-white/[0.08] border-dashed rounded-2xl bg-white/[0.02]">
      <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-white/40" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 max-w-sm mb-8">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
