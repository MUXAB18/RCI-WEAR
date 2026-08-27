import { NextRequest, NextResponse } from 'next/server';
import { createProject } from '@/lib/api/portfolio.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await createProject(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Failed to create portfolio project:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio project' },
      { status: 500 }
    );
  }
}
