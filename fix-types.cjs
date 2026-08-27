const fs = require('fs');

const files = [
  'src/app/admin/blog/BlogClient.tsx',
  'src/app/admin/contacts/ContactsClient.tsx',
  'src/app/admin/orders/OrdersClient.tsx',
  'src/app/admin/orders/[id]/OrderDetailClient.tsx',
  'src/app/admin/portfolio/PortfolioClient.tsx',
  'src/app/admin/products/ProductsClient.tsx',
  'src/app/admin/quotes/QuotesClient.tsx',
  'src/app/admin/reviews/ReviewsClient.tsx',
  'src/app/admin/settings/SettingsClient.tsx',
  'src/app/admin/tracking/TrackingClient.tsx',
  'src/app/track/[orderNumber]/PublicTrackingClient.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Replace string with Date in types
  const replacements = [
    { target: 'createdAt: string', replacement: 'createdAt: Date' },
    { target: 'updatedAt: string', replacement: 'updatedAt: Date' },
    { target: 'publishedAt: string', replacement: 'publishedAt: Date' },
    { target: 'expiresAt: string', replacement: 'expiresAt: Date' },
    { target: 'projectDate: string', replacement: 'projectDate: Date' },
    { target: 'estimatedDelivery: string', replacement: 'estimatedDelivery: Date' },
    { target: 'paymentStatus: string', replacement: 'paymentStatus: "pending" | "paid" | "failed" | "refunded" | "partial"' },
    { target: 'status: string', replacement: 'status: any' },
    { target: 'type: string', replacement: 'type: "string" | "number" | "boolean" | "json"' }
  ];

  for (const { target, replacement } of replacements) {
    if (content.includes(target)) {
      content = content.replace(new RegExp(target, 'g'), replacement);
      modified = true;
    }
  }

  // Check type ContactStatus in ContactsClient
  if (file.includes('ContactsClient')) {
     if (content.includes('status: any')) {
         content = content.replace('status: any', 'status: "new" | "in_progress" | "resolved"');
     }
  }

  // Check type OrderStatus in OrdersClient
  if (file.includes('OrdersClient') || file.includes('OrderDetailClient')) {
      if (content.includes('status: any')) {
          content = content.replace('status: any', 'status: "pending" | "processing" | "completed" | "cancelled"');
      }
  }

  if (modified) {
    fs.writeFileSync(file, content);
    console.log(`Updated types in ${file}`);
  }
}
