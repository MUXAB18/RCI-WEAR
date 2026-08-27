/**
 * API Route: /api/portfolio
 * 
 * GET  /api/portfolio            → list all projects
 * GET  /api/portfolio?featured   → list featured projects only
 * POST /api/portfolio            → create a new project
 */

import { getAllProjects, getFeaturedProjects, createProject } from '@/lib/api/portfolio.service';
import { apiSuccess, apiCreated, apiError, apiBadRequest } from '@/lib/api/response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.has('featured');

    const projects = featured
      ? await getFeaturedProjects()
      : await getAllProjects();

    return apiSuccess(projects);
  } catch (error) {
    console.error('[GET /api/portfolio]', error);
    return apiError('Failed to fetch portfolio projects');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.category || !body.imageUrl) {
      return apiBadRequest('Missing required fields: title, category, imageUrl');
    }

    const project = await createProject(body);
    return apiCreated(project);
  } catch (error) {
    console.error('[POST /api/portfolio]', error);
    return apiError('Failed to create portfolio project');
  }
}
