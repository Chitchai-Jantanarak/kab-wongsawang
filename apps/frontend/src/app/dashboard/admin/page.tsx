'use client';

import { motion } from 'motion/react';
import { TrendingUp, Calendar, Users, DollarSign, ChartBar as BarChart3, ChartPie as PieChart } from 'lucide-react';
import { AnimatedContainer, AnimatedItem } from '@/components/PageWrapper';

const metrics = [
  {
    title: 'Total Revenue',
    value: '$24,500',
    change: '+12%',
    icon: DollarSign,
    color: 'from-emerald-500/20 to-emerald-600/10',
  },
  {
    title: 'Active Bookings',
    value: '32',
    change: '+8',
    icon: Calendar,
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    title: 'Total Users',
    value: '156',
    change: '+24',
    icon: Users,
    color: 'from-purple-500/20 to-purple-600/10',
  },
  {
    title: 'Occupancy Rate',
    value: '78%',
    change: '+5%',
    icon: BarChart3,
    color: 'from-amber-500/20 to-amber-600/10',
  },
];

const recentBookings = [
  {
    id: '1',
    user: 'John Smith',
    room: 'Room 201',
    date: '2024-04-15',
    status: 'confirmed',
  },
  {
    id: '2',
    user: 'Sarah Johnson',
    room: 'Penthouse 401',
    date: '2024-04-16',
    status: 'pending',
  },
  {
    id: '3',
    user: 'Michael Brown',
    room: 'Room 105',
    date: '2024-04-17',
    status: 'confirmed',
  },
];

export default function AdminDashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8"
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="heading-xl text-3xl md:text-4xl mb-2" style={{ color: 'var(--tone-text)' }}>
          Admin Dashboard
        </h1>
        <p className="body-copy" style={{ color: 'var(--tone-muted)' }}>
          Manage bookings, users, and apartment inventory
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              className="rounded-xl p-6 border"
              style={{
                background: `linear-gradient(135deg, ${metric.color})`,
                borderColor: 'var(--tone-border)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ background: 'rgba(184,154,96,0.2)' }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: 'var(--tone-accent)' }}
                  />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {metric.change}
                </div>
              </div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--tone-muted)' }}
              >
                {metric.title}
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--tone-text)' }}
              >
                {metric.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart Placeholder */}
        <motion.div
          className="lg:col-span-2 rounded-xl border p-6"
          style={{
            borderColor: 'var(--tone-border)',
            background: 'rgba(20,20,18,0.5)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3
              className="h-5 w-5"
              style={{ color: 'var(--tone-accent)' }}
            />
            <h2 className="font-serif text-lg" style={{ color: 'var(--tone-text)' }}>
              Revenue Trend
            </h2>
          </div>
          <div
            className="h-64 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(184,154,96,0.05)' }}
          >
            <p style={{ color: 'var(--tone-muted)' }}>Chart visualization area</p>
          </div>
        </motion.div>

        {/* Occupancy Pie Chart */}
        <motion.div
          className="rounded-xl border p-6"
          style={{
            borderColor: 'var(--tone-border)',
            background: 'rgba(20,20,18,0.5)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChart
              className="h-5 w-5"
              style={{ color: 'var(--tone-accent)' }}
            />
            <h2 className="font-serif text-lg" style={{ color: 'var(--tone-text)' }}>
              Occupancy
            </h2>
          </div>
          <div
            className="h-64 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(184,154,96,0.05)' }}
          >
            <p style={{ color: 'var(--tone-muted)' }}>Pie chart area</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div
        className="rounded-xl border p-6"
        style={{
          borderColor: 'var(--tone-border)',
          background: 'rgba(20,20,18,0.5)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-serif text-lg mb-6" style={{ color: 'var(--tone-text)' }}>
          Recent Bookings
        </h2>
        <div className="space-y-3">
          {recentBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              className="flex items-center justify-between p-4 rounded-lg border"
              style={{ borderColor: 'var(--tone-border)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div>
                <p
                  className="font-medium"
                  style={{ color: 'var(--tone-text)' }}
                >
                  {booking.user}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--tone-muted)' }}
                >
                  {booking.room} • {booking.date}
                </p>
              </div>
              <motion.div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
