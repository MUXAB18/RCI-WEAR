import './globals.css';
import { Inter, Playfair_Display, DM_Serif_Display, Cormorant_Garamond } from 'next/font/google';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const cormorant = Cormorant_Garamond({ weight: '500', subsets: ['latin'], style: 'italic', variable: '--font-italic' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: 'Rasheed Clothing International | Premium Apparel Manufacturing Pakistan | Where Imagination Meets Fabrication',
  description: 'Leading clothing manufacturer in Sialkot, Pakistan. Custom apparel manufacturing, private label, OEM services. Hoodies, activewear, corporate uniforms. Export to 15+ countries. MOQ 50 units.',
  keywords: 'clothing manufacturer Pakistan, apparel manufacturing Sialkot, custom clothing manufacturer, private label clothing, OEM clothing Pakistan, wholesale apparel manufacturer, export clothing Pakistan, hoodie manufacturer, activewear manufacturer, corporate uniform manufacturer',
  openGraph: {
    title: 'Rasheed Clothing International - Where Imagination Meets Fabrication',
    description: 'Premium B2B apparel manufacturing from Pakistan. Custom clothing solutions for international brands.',
    url: 'https://rasheedclothingintl.me',
    siteName: 'Rasheed Clothing International',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dmSerif.variable} ${cormorant.variable}`}>
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rasheed Clothing International",
              "url": "https://rasheedclothingintl.me/",
              "logo": "https://rasheedclothingintl.me/logo192.png",
              "description": "Premium apparel manufacturing and private-label clothing solutions in Pakistan.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sialkot",
                "addressCountry": "PK"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+923496014611",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-near-black antialiased overflow-x-hidden flex flex-col min-h-screen">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-425WFFBRLP"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-425WFFBRLP');
        `}</Script>
        {/* AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6650426189914940"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
