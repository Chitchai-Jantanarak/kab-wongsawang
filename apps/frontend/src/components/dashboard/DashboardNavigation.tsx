'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { motion } from 'motion/react';
import { Hop as Home, Calendar, Heart, Settings, LogOut, Menu, X, Building2, ChartBar as BarChart3, Users, Clock } from 'lucide-react';

export default function DashboardNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  const navigationItems = isAdmin
    ? [
        { label: 'Dashboard', icon: BarChart3, href: '/dashboard/admin' },
        { label: 'Bookings', icon: Calendar, href: '/dashboard/admin/bookings' },
        { label: 'Rooms', icon: Building2, href: '/dashboard/admin/rooms' },
        { label: 'Users', icon: Users, href: '/dashboard/admin/users' },
        { label: 'Analytics', icon: BarChart3, href: '/dashboard/admin/analytics' },
      ]
    : [
        { label: 'Overview', icon: Home, href: '/dashboard/user' },
        { label: 'My Bookings', icon: Calendar, href: '/dashboard/user/bookings' },
        { label: 'Favorites', icon: Heart, href: '/dashboard/user/favorites' },
        { label: 'Settings', icon: Settings, href: '/dashboard/user/settings' },
      ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 right-4 z-40 md:hidden p-2 rounded-lg"
        style={{ background: 'var(--tone-accent)', color: 'var(--tone-bg)' }}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <motion.nav
        className="md:sticky md:top-0 md:h-screen md:col-span-1 border-r flex flex-col"
        style={{
          background: 'rgba(20,20,18,0.8)',
          borderColor: 'var(--tone-border)',
          backdropFilter: 'blur(12px)',
        }}
        initial={false}
        animate={{
          x: mobileOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--tone-border)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'var(--tone-accent)', color: 'var(--tone-bg)' }}
            >
              {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--tone-text)' }}>
                {user?.name || 'Account'}
              </h2>
              <p className="text-xs" style={{ color: 'var(--tone-muted)' }}>
                {isAdmin ? 'Administrator' : 'Member'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-3 transition-colors relative"
                  style={{
                    color: isActive ? 'var(--tone-accent)' : 'var(--tone-muted)',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute right-0 h-full w-1"
                      style={{ background: 'var(--tone-accent)' }}
                      layoutId="sidebar-indicator"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div
          className="border-t p-4"
          style={{ borderColor: 'var(--tone-border)' }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm"
            style={{
              color: 'var(--tone-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(10,9,7,0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
