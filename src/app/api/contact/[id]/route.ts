/**
 * API Route: /api/contact/[id]
 *
 * GET    /api/contact/:id  → get single inquiry
 * PATCH  /api/contact/:id  → update status (new | read | replied)
 * DELETE /api/contact/:id  → delete inquiry
 */

import { getInquiryById, updateInquiryStatus, deleteInquiry } from '@/lib/api/contact.service';
import { apiSuccess, apiError, apiNotFound, apiBadRequest } from '@/lib/api/response';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const inquiry = await getInquiryById((await params).id);
    if (!inquiry) return apiNotFound('Inquiry not found');
    return apiSuccess(inquiry);
  } catch (error) {
    console.error('[GET /api/contact/:id]', error);
    return apiError('Failed to fetch inquiry');
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const existing = await getInquiryById((await params).id);
    if (!existing) return apiNotFound('Inquiry not found');

    const body = await request.json();
    const validStatuses = ['new', 'read', 'replied'];

    if (!body.status || !validStatuses.includes(body.status)) {
      return apiBadRequest(`Status must be one of: ${validStatuses.join(', ')}`);
    }

    const updated = await updateInquiryStatus((await params).id, body.status);
    return apiSuccess(updated);
  } catch (error) {
    console.error('[PATCH /api/contact/:id]', error);
    return apiError('Failed to update inquiry');
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const existing = await getInquiryById((await params).id);
    if (!existing) return apiNotFound('Inquiry not found');

    await deleteInquiry((await params).id);
    return apiSuccess({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/contact/:id]', error);
    return apiError('Failed to delete inquiry');
  }
}
