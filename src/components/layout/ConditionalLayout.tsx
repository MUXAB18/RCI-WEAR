'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current route is admin or track
  const isPlainRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/track');

  // Admin/Track routes: no navbar/footer, just return children
  if (isPlainRoute) {
    return <>{children}</>;
  }

  // Regular routes: wrap with navbar and footer
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
