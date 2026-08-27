/**
 * API Route: /api/portfolio/[id]
 *
 * GET    /api/portfolio/:id  → get a single project
 * PATCH  /api/portfolio/:id  → update a project
 * DELETE /api/portfolio/:id  → delete a project
 */

import { getProjectById, updateProject, deleteProject } from '@/lib/api/portfolio.service';
import { apiSuccess, apiError, apiNotFound } from '@/lib/api/response';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const project = await getProjectById((await params).id);
    if (!project) return apiNotFound('Project not found');
    return apiSuccess(project);
  } catch (error) {
    console.error('[GET /api/portfolio/:id]', error);
    return apiError('Failed to fetch project');
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const existing = await getProjectById((await params).id);
    if (!existing) return apiNotFound('Project not found');

    const body = await request.json();
    const updated = await updateProject((await params).id, body);
    return apiSuccess(updated);
  } catch (error) {
    console.error('[PATCH /api/portfolio/:id]', error);
    return apiError('Failed to update project');
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const existing = await getProjectById((await params).id);
    if (!existing) return apiNotFound('Project not found');

    await deleteProject((await params).id);
    return apiSuccess({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/portfolio/:id]', error);
    return apiError('Failed to delete project');
  }
}
