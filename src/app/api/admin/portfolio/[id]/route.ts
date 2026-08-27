import { NextRequest, NextResponse } from 'next/server';
import { updateProject, deleteProject } from '@/lib/api/portfolio.service';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const project = await updateProject((await params).id, body);
    return NextResponse.json(project);
  } catch (error) {
    console.error('Failed to update portfolio project:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await deleteProject((await params).id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete portfolio project:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio project' },
      { status: 500 }
    );
  }
}
