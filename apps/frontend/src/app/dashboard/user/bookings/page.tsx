'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, X, CreditCard as Edit2, Trash2, ChevronDown } from 'lucide-react';
import { AnimatedContainer, AnimatedItem } from '@/components/PageWrapper';

interface Booking {
  id: string;
  roomNumber: string;
  roomType: string;
  floor: number;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    roomNumber: '101',
    roomType: 'Studio',
    floor: 1,
    date: '2024-04-15',
    time: '10:00 - 12:00',
    duration: '2 hours',
    price: 400,
    status: 'confirmed',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    roomNumber: '205',
    roomType: 'Loft',
    floor: 2,
    date: '2024-04-20',
    time: '14:00 - 16:00',
    duration: '2 hours',
    price: 600,
    status: 'pending',
    createdAt: '2024-03-16',
  },
  {
    id: '3',
    roomNumber: '301',
    roomType: 'Grand Loft',
    floor: 3,
    date: '2024-04-25',
    time: '11:00 - 13:00',
    duration: '2 hours',
    price: 800,
    status: 'confirmed',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    roomNumber: '102',
    roomType: 'Studio',
    floor: 1,
    date: '2024-03-30',
    time: '15:00 - 17:00',
    duration: '2 hours',
    price: 400,
    status: 'completed',
    createdAt: '2024-03-01',
  },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-500/20 text-emerald-300',
  pending: 'bg-amber-500/20 text-amber-300',
  completed: 'bg-blue-500/20 text-blue-300',
  cancelled: 'bg-red-500/20 text-red-300',
};

export default function BookingsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredBookings = mockBookings.filter((booking) => {
    if (filter === 'upcoming') {
      return ['confirmed', 'pending'].includes(booking.status);
    }
    if (filter === 'past') {
      return ['completed', 'cancelled'].includes(booking.status);
    }
    return true;
  });

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
          My Bookings
        </h1>
        <p className="body-copy" style={{ color: 'var(--tone-muted)' }}>
          View and manage your apartment visits
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-8">
        {(['all', 'upcoming', 'past'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setFilter(tab)}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all"
            style={{
              background: filter === tab ? 'var(--tone-accent)' : 'transparent',
              color: filter === tab ? 'var(--tone-bg)' : 'var(--tone-muted)',
              border: filter === tab ? 'none' : '1px solid var(--tone-border)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Bookings List */}
      <AnimatedContainer staggerChildren>
        {filteredBookings.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p style={{ color: 'var(--tone-muted)' }}>No bookings found</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking, index) => (
              <AnimatedItem key={booking.id} index={index}>
                <motion.div
                  className="overflow-hidden rounded-lg border"
                  style={{
                    borderColor: 'var(--tone-border)',
                    background:
                      booking.status === 'confirmed'
                        ? 'rgba(16,185,129,0.03)'
                        : booking.status === 'pending'
                          ? 'rgba(251,146,60,0.03)'
                          : 'rgba(107,114,128,0.03)',
                  }}
                  layout
                >
                  {/* Main Booking Card */}
                  <motion.div
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      setExpandedId(expandedId === booking.id ? null : booking.id)
                    }
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="h-12 w-12 rounded-lg flex items-center justify-center"
                        style={{ background: 'var(--tone-accent-light)' }}
                      >
                        <Calendar
                          className="h-6 w-6"
                          style={{ color: 'var(--tone-accent)' }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="font-medium mb-1"
                          style={{ color: 'var(--tone-text)' }}
                        >
                          Floor {booking.floor} - {booking.roomType} #{booking.roomNumber}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--tone-muted)' }}>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {booking.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p
                          className="font-semibold"
                          style={{ color: 'var(--tone-text)' }}
                        >
                          ${booking.price}
                        </p>
                        <motion.div
                          className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[booking.status]
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </motion.div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedId === booking.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown
                          className="h-5 w-5"
                          style={{ color: 'var(--tone-muted)' }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === booking.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t px-4 py-4"
                        style={{ borderColor: 'var(--tone-border)' }}
                      >
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p
                              className="text-xs font-medium mb-2"
                              style={{ color: 'var(--tone-muted)' }}
                            >
                              DURATION
                            </p>
                            <p
                              className="text-sm"
                              style={{ color: 'var(--tone-text)' }}
                            >
                              {booking.duration}
                            </p>
                          </div>
                          <div>
                            <p
                              className="text-xs font-medium mb-2"
                              style={{ color: 'var(--tone-muted)' }}
                            >
                              BOOKING DATE
                            </p>
                            <p
                              className="text-sm"
                              style={{ color: 'var(--tone-text)' }}
                            >
                              {booking.createdAt}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--tone-border)' }}>
                          {['confirmed', 'pending'].includes(booking.status) && (
                            <>
                              <motion.button
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
                                style={{
                                  background: 'transparent',
                                  border: '1px solid var(--tone-accent)',
                                  color: 'var(--tone-accent)',
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Edit2 className="h-4 w-4" />
                                Reschedule
                              </motion.button>
                              <motion.button
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all"
                                style={{
                                  background: 'transparent',
                                  border: '1px solid rgba(239,68,68,0.5)',
                                  color: '#ef4444',
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <X className="h-4 w-4" />
                                Cancel
                              </motion.button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        )}
      </AnimatedContainer>
    </motion.div>
  );
}
