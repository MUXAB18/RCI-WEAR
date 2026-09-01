import { Loader } from '@/components/admin/ui/Loader';

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader size="lg" text="Loading data..." />
    </div>
  );
}
