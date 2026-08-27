import { AdminShell } from '@/app/admin/layout';
import { PortfolioClient } from './PortfolioClient';
import { getAllProjects } from '@/lib/api/portfolio.service';

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <PortfolioClient initialProjects={projects} />
      </div>
    </AdminShell>
  );
}
