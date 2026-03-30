'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRooms } from '@/hooks/useRooms';
import { motion } from 'motion/react';
import { Calendar, Heart, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedContainer, AnimatedItem } from '@/components/PageWrapper';
import { SkeletonCard, LoadingSpinner } from '@/components/LoadingStates';

const stats = [
  { icon: Calendar, label: 'Upcoming Visits', value: '3', color: 'from-blue-500/20 to-blue-600/10' },
  { icon: Heart, label: 'Saved Rooms', value: '8', color: 'from-rose-500/20 to-rose-600/10' },
  { icon: Clock, label: 'Hours Spent', value: '12', color: 'from-amber-500/20 to-amber-600/10' },
  { icon: MapPin, label: 'Floors Visited', value: '4', color: 'from-emerald-500/20 to-emerald-600/10' },
];

interface Booking {
  id: string;
  roomNumber: string;
  roomType: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const mockBookings: Booking[] = [
  {
    id: '1',
    roomNumber: '101',
    roomType: 'Studio',
    date: '2024-04-15',
    time: '10:00 - 12:00',
    status: 'confirmed',
  },
  {
    id: '2',
    roomNumber: '205',
    roomType: 'Loft',
    date: '2024-04-20',
    time: '14:00 - 16:00',
    status: 'pending',
  },
  {
    id: '3',
    roomNumber: '301',
    roomType: 'Grand Loft',
    date: '2024-04-25',
    time: '11:00 - 13:00',
    status: 'confirmed',
  },
];

export default function UserDashboardPage() {
  const { user } = useAuthStore();
  const { data: rooms, isLoading } = useRooms();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8"
    >
      {/* Welcome Header */}
      <div className="mb-8">
        <motion.h1
          className="heading-xl text-3xl md:text-4xl mb-2"
          style={{ color: 'var(--tone-text)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Welcome back, {user?.name?.split(' ')[0] || 'there'}
        </motion.h1>
        <motion.p
          className="body-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Manage your bookings and explore more apartments
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="rounded-xl p-6 border transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${stat.color})`,
                borderColor: 'var(--tone-border)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: 'var(--tone-muted)' }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: 'var(--tone-text)' }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ background: 'rgba(184,154,96,0.2)' }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: 'var(--tone-accent)' }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upcoming Bookings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <motion.h2
            className="font-serif text-2xl"
            style={{ color: 'var(--tone-text)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Upcoming Visits
          </motion.h2>
          <Link
            href="/dashboard/user/bookings"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--tone-accent)' }}
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <AnimatedContainer staggerChildren>
          {isLoading ? (
            <SkeletonCard count={3} />
          ) : (
            <div className="space-y-3">
              {mockBookings.slice(0, 3).map((booking, index) => (
                <AnimatedItem key={booking.id} index={index}>
                  <motion.div
                    className="p-4 rounded-lg border flex items-center justify-between"
                    style={{
                      borderColor: 'var(--tone-border)',
                      background:
                        booking.status === 'confirmed'
                          ? 'rgba(16,185,129,0.05)'
                          : booking.status === 'pending'
                            ? 'rgba(251,146,60,0.05)'
                            : 'rgba(107,114,128,0.05)',
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="h-12 w-12 rounded-lg flex items-center justify-center"
                        style={{
                          background: 'var(--tone-accent-light)',
                        }}
                      >
                        <Calendar
                          className="h-6 w-6"
                          style={{ color: 'var(--tone-accent)' }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-medium"
                          style={{ color: 'var(--tone-text)' }}
                        >
                          Room {booking.roomNumber} - {booking.roomType}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--tone-muted)' }}
                        >
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : booking.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-slate-500/20 text-slate-300'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                  </motion.div>
                </AnimatedItem>
              ))}
            </div>
          )}
        </AnimatedContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/reserve"
            className="block p-6 rounded-xl border transition-all"
            style={{
              borderColor: 'var(--tone-border)',
              background: 'linear-gradient(135deg, rgba(184,154,96,0.1) 0%, transparent 100%)',
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Calendar
                className="h-8 w-8 mb-3"
                style={{ color: 'var(--tone-accent)' }}
              />
              <h3
                className="font-serif text-lg mb-1"
                style={{ color: 'var(--tone-text)' }}
              >
                Book a New Visit
              </h3>
              <p
                className="text-sm"
                style={{ color: 'var(--tone-muted)' }}
              >
                Explore more rooms and apartments
              </p>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/dashboard/user/favorites"
            className="block p-6 rounded-xl border transition-all"
            style={{
              borderColor: 'var(--tone-border)',
              background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, transparent 100%)',
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Heart
                className="h-8 w-8 mb-3"
                style={{ color: 'var(--tone-accent)' }}
              />
              <h3
                className="font-serif text-lg mb-1"
                style={{ color: 'var(--tone-text)' }}
              >
                My Favorites
              </h3>
              <p
                className="text-sm"
                style={{ color: 'var(--tone-muted)' }}
              >
                View your saved apartments
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
