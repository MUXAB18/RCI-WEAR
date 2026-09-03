'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  ImageIcon,
  FolderOpen,
  ShoppingCart,
  Mail,
  BookOpen,
  Settings,
  LogOut,
  Package,
  Star,
  Newspaper,
  Tags,
  ClipboardList,
  Boxes,
} from 'lucide-react';

const navSections = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon },
      { href: '/admin/collections', label: 'Collections', icon: FolderOpen },
      { href: '/admin/blog', label: 'Blog', icon: Newspaper },
    ]
  },
  {
    title: 'Manufacturing & Sales',
    items: [
      { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
      { href: '/admin/tracking', label: 'Tracking Board', icon: Package },
      { href: '/admin/reviews', label: 'Reviews', icon: Star },
    ]
  },
  {
    title: 'Communication',
    items: [
      { href: '/admin/contacts', label: 'Contact Enquiries', icon: Mail },
    ]
  },
  {
    title: 'System',
    items: [
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ]
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 h-full bg-[#0a0a0a] border-r border-white/[0.08] flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-black text-lg">R</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">RCI Admin</p>
            <p className="text-white/40 text-[10px] leading-tight uppercase tracking-wider">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2 px-3">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.08]">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
