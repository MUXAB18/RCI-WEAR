/**
 * API Route: /api/contact
 *
 * GET  /api/contact  → list all inquiries (admin use)
 * POST /api/contact  → submit a new inquiry (public contact form)
 */

import { getAllInquiries, createInquiry } from '@/lib/api/contact.service';
import { apiSuccess, apiCreated, apiError, apiBadRequest } from '@/lib/api/response';

export async function GET() {
  try {
    const inquiries = await getAllInquiries();
    return apiSuccess(inquiries);
  } catch (error) {
    console.error('[GET /api/contact]', error);
    return apiError('Failed to fetch inquiries');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return apiBadRequest('Missing required fields: firstName, lastName, email, message');
    }

    const inquiry = await createInquiry({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || undefined,
      company: body.company || undefined,
      subject: body.subject || undefined,
      message: body.message,
    });

    return apiCreated(inquiry);
  } catch (error) {
    console.error('[POST /api/contact]', error);
    return apiError('Failed to submit inquiry');
  }
}
