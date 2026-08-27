import { AdminShell } from '@/app/admin/layout';
import { getAllProjects } from '@/lib/api/portfolio.service';
import { getAllInquiries } from '@/lib/api/contact.service';
import { getOrderStats } from '@/lib/api/order.service';
import { getReviewStats } from '@/lib/api/review.service';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  ImageIcon, 
  Mail, 
  ShoppingCart, 
  FileText,
  Package,
  FolderOpen,
  ArrowRight,
  Star,
  DollarSign
} from 'lucide-react';

export default async function AdminDashboard() {
  const [projects, inquiries, orderStats, reviewStats] = await Promise.all([
    getAllProjects(), 
    getAllInquiries(),
    getOrderStats(),
    getReviewStats()
  ]);
  
  const featuredCount = projects.filter(p => p.isFeatured).length;
  const newInquiries = inquiries.filter(i => i.status === 'new').length;
  const unreadInquiries = inquiries.filter(i => i.status === 'new' || i.status === 'read').length;

  const stats = [
    { 
      label: 'Total Orders', 
      value: orderStats.totalOrders, 
      icon: ShoppingCart, 
      href: '/admin/orders',
      change: `${orderStats.pendingOrders} pending`,
      trend: 'neutral',
      color: 'blue'
    },
    { 
      label: 'Revenue', 
      value: `$${orderStats.totalRevenue.toFixed(0)}`, 
      icon: DollarSign, 
      href: '/admin/orders',
      subtitle: 'Total earnings',
      color: 'green'
    },
    { 
      label: 'Customer Reviews', 
      value: reviewStats.total, 
      icon: Star, 
      href: '/admin/orders',
      change: `${reviewStats.averageRating.toFixed(1)} avg rating`,
      trend: 'up',
      color: 'purple'
    },
    { 
      label: 'Portfolio Projects', 
      value: projects.length, 
      icon: ImageIcon, 
      href: '/admin/portfolio',
      change: `${featuredCount} featured`,
      trend: 'neutral',
      color: 'orange'
    },
    { 
      label: 'New Inquiries', 
      value: newInquiries, 
      icon: Mail, 
      href: '/admin/contacts',
      change: '+3 today',
      trend: 'up',
      color: 'cyan'
    },
    { 
      label: 'Pending Actions', 
      value: unreadInquiries, 
      icon: FileText, 
      href: '/admin/contacts',
      subtitle: 'Require attention',
      color: 'red'
    },
  ];

  const quickActions = [
    {
      title: 'Add Portfolio Project',
      description: 'Upload new project to showcase',
      icon: ImageIcon,
      href: '/admin/portfolio',
      color: 'from-blue-500/10 to-blue-600/5'
    },
    {
      title: 'Manage Collections',
      description: 'Organize product collections',
      icon: FolderOpen,
      href: '/admin/collections',
      color: 'from-purple-500/10 to-purple-600/5'
    },
    {
      title: 'View Orders',
      description: 'Check recent orders and quotes',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'from-green-500/10 to-green-600/5'
    },
    {
      title: 'Manage Products',
      description: 'Add or edit product catalog',
      icon: Package,
      href: '/admin/products',
      color: 'from-orange-500/10 to-orange-600/5'
    },
  ];

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-white/40 mt-1 text-sm">Welcome back to RCI Management Portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    stat.color === 'blue' ? 'from-blue-500/20 to-blue-600/10' :
                    stat.color === 'purple' ? 'from-purple-500/20 to-purple-600/10' :
                    stat.color === 'green' ? 'from-green-500/20 to-green-600/10' :
                    stat.color === 'orange' ? 'from-orange-500/20 to-orange-600/10' :
                    stat.color === 'cyan' ? 'from-cyan-500/20 to-cyan-600/10' :
                    'from-red-500/20 to-red-600/10'
                  } flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${
                      stat.color === 'blue' ? 'text-blue-400' :
                      stat.color === 'purple' ? 'text-purple-400' :
                      stat.color === 'green' ? 'text-green-400' :
                      stat.color === 'orange' ? 'text-orange-400' :
                      stat.color === 'cyan' ? 'text-cyan-400' :
                      'text-red-400'
                    }`} />
                  </div>
                  {stat.change && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                      stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 
                      stat.trend === 'down' ? 'bg-red-500/10 text-red-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : 
                       stat.trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
                       <Star className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  )}
                </div>
                <div className="text-2xl xl:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
                {stat.subtitle && (
                  <div className="text-white/30 text-xs mt-1">{stat.subtitle}</div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-bold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <Icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors mb-4" />
                    <h3 className="text-white text-sm font-semibold mb-1">{action.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed">{action.description}</p>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all mt-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-bold">Recent Projects</h2>
              <Link href="/admin/portfolio" className="text-white/40 hover:text-white text-xs font-medium transition-colors">
                View All →
              </Link>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
              {projects.slice(0, 5).map((project, i) => (
                <div
                  key={project.id}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors ${
                    i < projects.slice(0, 5).length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-12 h-12 object-cover rounded-xl" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{project.title}</p>
                    <p className="text-white/40 text-xs">{project.category}</p>
                  </div>
                  {project.isFeatured && (
                    <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg">
                      FEATURED
                    </span>
                  )}
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">No projects yet</p>
                  <Link href="/admin/portfolio" className="text-white/50 hover:text-white text-xs mt-2 inline-block">
                    Add your first project →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-bold">Recent Inquiries</h2>
              <Link href="/admin/contacts" className="text-white/40 hover:text-white text-xs font-medium transition-colors">
                View All →
              </Link>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
              {inquiries.slice(0, 5).map((inquiry, i) => (
                <div
                  key={inquiry.id}
                  className={`px-5 py-4 hover:bg-white/[0.03] transition-colors ${
                    i < inquiries.slice(0, 5).length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-white text-sm font-medium">
                      {inquiry.firstName} {inquiry.lastName}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                      inquiry.status === 'new' ? 'bg-green-500/20 text-green-300' :
                      inquiry.status === 'read' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {inquiry.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs truncate">{inquiry.email}</p>
                  <p className="text-white/30 text-xs mt-1 line-clamp-2">{inquiry.message}</p>
                </div>
              ))}
              {inquiries.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">No inquiries yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
