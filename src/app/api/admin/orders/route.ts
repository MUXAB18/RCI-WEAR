import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getAllOrders } from '@/lib/api/order.service';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const order = await createOrder(body);

    // Send email notifications using Resend
    try {
      const commonStyles = `
        body { margin: 0; padding: 0; background-color: #F4F4F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        table { border-spacing: 0; border-collapse: collapse; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #F4F4F5; padding-bottom: 60px; padding-top: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); }
        .header { background-color: #0B0B0B; padding: 45px 40px 35px 40px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: 6px; text-transform: uppercase; }
        .header h1 span { color: #ffffff; font-weight: 300; opacity: 0.8; }
        .header p { margin: 12px 0 0 0; color: #a1a1aa; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; }
        .body-content { padding: 45px 40px; }
        .intro { margin-bottom: 40px; text-align: center; }
        .intro h2 { margin: 0 0 12px 0; color: #18181b; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
        .intro p { margin: 0; color: #52525b; font-size: 15px; line-height: 1.6; }
        .section-title { font-size: 11px; font-weight: 800; color: #a1a1aa; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #f4f4f5; padding-bottom: 10px; margin-bottom: 20px; margin-top: 40px; }
        .details-table { width: 100%; }
        .details-table td { padding: 14px 0; border-bottom: 1px solid #fafafa; font-size: 14px; }
        .label { color: #71717a; width: 45%; font-weight: 500; }
        .value { color: #18181b; font-weight: 600; text-align: right; }
        .comments-box { background-color: #fafafa; border: 1px solid #e4e4e7; border-left: 4px solid #0B0B0B; padding: 24px; margin-top: 15px; border-radius: 6px; }
        .comments-box p { margin: 0; color: #3f3f46; font-size: 14px; line-height: 1.7; white-space: pre-wrap; font-style: italic; }
        .footer { background-color: #fafafa; padding: 35px 40px; text-align: center; border-top: 1px solid #e4e4e7; }
        .footer p { margin: 0; color: #a1a1aa; font-size: 12px; line-height: 1.6; }
        .badge { display: inline-block; padding: 5px 12px; background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; font-size: 12px; color: #52525b; font-weight: 600; margin: 3px 0 3px 6px; }
      `;

      const sharedDetailsHtml = `
          <div class="section-title">Client Information</div>
          <table class="details-table">
            <tr><td class="label">Client Name</td><td class="value">${body.customerName || 'Not provided'}</td></tr>
            <tr><td class="label">Company / Brand</td><td class="value">${body.company || 'Not provided'}</td></tr>
            <tr><td class="label">Email Address</td><td class="value"><a href="mailto:${body.customerEmail}" style="color: #09090b; text-decoration: none; border-bottom: 1px solid #0B0B0B;">${body.customerEmail}</a></td></tr>
            <tr><td class="label">Phone Number</td><td class="value">${body.customerPhone || 'Not provided'}</td></tr>
            <tr><td class="label">Location / Country</td><td class="value">${body.country || 'Not provided'}</td></tr>
            <tr><td class="label">Website / Instagram</td><td class="value">${body.website ? `<a href="${body.website.startsWith('http') ? body.website : 'https://' + body.website}" style="color: #09090b; text-decoration: underline;">${body.website}</a>` : 'Not provided'}</td></tr>
          </table>

          <div class="section-title">Product Specifications</div>
          <table class="details-table">
            <tr><td class="label">Category</td><td class="value">${body.category || 'Not specified'}</td></tr>
            <tr><td class="label">Fabric Details</td><td class="value">${body.fabric || 'Not specified'}</td></tr>
            <tr><td class="label">Fabric Weight</td><td class="value">${body.gsm || 'Not specified'}</td></tr>
            <tr><td class="label">Estimated Quantity</td><td class="value"><span style="color: #0B0B0B; font-weight: 800; font-size: 16px;">${body.quantity || 'Not specified'}</span></td></tr>
            <tr><td class="label">Color Requirements</td><td class="value">${body.colors || 'Not specified'}</td></tr>
            <tr>
              <td class="label">Size Breakdown</td>
              <td class="value">
                ${(body.sizes || []).length > 0 ? body.sizes.map((s: string) => `<span class="badge">${s}</span>`).join('') : 'Not specified'}
              </td>
            </tr>
          </table>

          <div class="section-title">Customization & Branding</div>
          <table class="details-table">
            <tr>
              <td class="label">Decoration Methods</td>
              <td class="value">
                ${(body.decoration || []).length > 0 ? body.decoration.map((d: string) => `<span class="badge">${d}</span>`).join('') : 'None'}
              </td>
            </tr>
            <tr>
              <td class="label">Branding Extras</td>
              <td class="value">
                ${(body.extras || []).length > 0 ? body.extras.map((e: string) => `<span class="badge">${e}</span>`).join('') : 'None'}
              </td>
            </tr>
          </table>

          <div class="section-title">Logistics & Targets</div>
          <table class="details-table">
            <tr><td class="label">Target Delivery Date</td><td class="value">${body.timeline || 'Flexible'}</td></tr>
            <tr><td class="label">Target Budget (Per Unit)</td><td class="value">${body.budget || 'To be discussed'}</td></tr>
          </table>

          ${body.comments ? `
          <div class="section-title">Additional Comments</div>
          <div class="comments-box">
            <p>${body.comments}</p>
          </div>
          ` : ''}
      `;

      const fromEmail = process.env.RESEND_FROM_EMAIL || 'Acme <onboarding@resend.dev>';

      let attachmentsData: any[] = [];
      if (body.attachments && Array.isArray(body.attachments)) {
        attachmentsData = body.attachments.map((file: any) => ({
          filename: file.name,
          content: file.content
        }));
      }

      // 1. Send Email to Admin
      const adminEmailPromise = resend.emails.send({
        from: fromEmail,
        to: [process.env.NOTIFICATION_EMAIL || 'your-email@example.com'],
        subject: `New Order Request: ${body.customerName || 'Customer'} - ${body.company || 'Private Client'}`,
        attachments: attachmentsData.length > 0 ? attachmentsData : undefined,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="wrapper">
              <table class="main" align="center">
                <tr>
                  <td class="header">
                    <h1>RCI <span>WEAR</span></h1>
                    <p>Official Manufacturing Request</p>
                  </td>
                </tr>
                <tr>
                  <td class="body-content">
                    <div class="intro">
                      <h2>New Order Request</h2>
                      <p>You have received a new manufacturing request from <strong>${body.customerName || 'a client'}</strong>${body.company ? ` representing <strong>${body.company}</strong>` : ''}. Please review the comprehensive details below.</p>
                    </div>
                    ${sharedDetailsHtml}
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <p>This is an automated, secure order request generated from <strong>Rasheed Clothing International</strong>.</p>
                    <p style="margin-top: 12px;">&copy; ${new Date().getFullYear()} RCI Wear. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </div>
          </body>
          </html>
        `
      });

      // 2. Send Auto-Responder Email to Customer
      let customerEmailPromise;
      if (body.customerEmail) {
        customerEmailPromise = resend.emails.send({
          from: fromEmail,
          to: [body.customerEmail],
          subject: `We've Received Your Order Request - Rasheed Clothing International`,
          attachments: attachmentsData.length > 0 ? attachmentsData : undefined,
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${commonStyles}</style>
            </head>
            <body>
              <div class="wrapper">
                <table class="main" align="center">
                  <tr>
                    <td class="header">
                      <h1>RCI <span>WEAR</span></h1>
                      <p>Request Confirmation</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="body-content">
                      <div class="intro">
                        <h2>Thank you, ${body.customerName || 'Customer'}!</h2>
                        <p>We have successfully received your manufacturing request. Our team will review your specifications and get back to you shortly with a personalized quote and timeline.</p>
                        <p style="margin-top: 10px;">For your records, here is a copy of the details you submitted:</p>
                      </div>
                      ${sharedDetailsHtml}
                    </td>
                  </tr>
                  <tr>
                    <td class="footer">
                      <p>If you have any immediate questions, feel free to reply directly to this email.</p>
                      <p style="margin-top: 12px;">&copy; ${new Date().getFullYear()} Rasheed Clothing International. All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </div>
            </body>
            </html>
          `
        });
      }

      // Execute both email sends in parallel
      await Promise.all([adminEmailPromise, customerEmailPromise].filter(Boolean));
    } catch (emailError) {
      console.error('[Resend Error]', emailError);
      // Email failure shouldn't fail the whole request since order is saved in DB
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
