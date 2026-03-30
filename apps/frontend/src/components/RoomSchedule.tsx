"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRoomAvailability, useCreateBooking } from "@/hooks/useRooms";
import { useAuthStore } from "@/store/auth.store";
import { ROOM_TYPE_LABELS, FACILITY_LABELS } from "@/types/room";
import type { Room } from "@/types/room";
import type { TimeSlot } from "@/types/booking";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { X, Clock, Users, DollarSign, CalendarDays, Check, Loader2, Lock } from "lucide-react";

interface RoomScheduleProps {
  room: Room | null;
  onClose: () => void;
  onBookingComplete?: () => void;
}

export function RoomSchedule({ room, onClose, onBookingComplete }: RoomScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  
  const { isAuthenticated } = useAuthStore();
  
  const { data: availability, isLoading: loadingAvailability } = useRoomAvailability(
    room?.id || null,
    selectedDate
  );
  
  const { mutate: createBooking, isPending: isBooking } = useCreateBooking();

  // Generate next 7 days for date selection
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      value: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE"),
      day: format(date, "d"),
      isToday: i === 0,
    };
  });

  const handleBook = () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    
    if (!room || !selectedSlot) return;
    
    createBooking(
      {
        roomId: room.id,
        date: selectedDate,
        startTime: selectedSlot,
      },
      {
        onSuccess: () => {
          setSelectedSlot(null);
          onBookingComplete?.();
        },
      }
    );
  };

  const getSlotStatus = (slot: TimeSlot) => {
    if (!slot.available) return "reserved";
    if (selectedSlot === slot.time) return "selected";
    return "available";
  };

  if (!room) return null;

  const roomLabel = room.type === "facility" && room.facility
    ? FACILITY_LABELS[room.facility]
    : `Room ${room.number}`;

  const roomTypeLabel = room.type === "facility" && room.facility
    ? "Facility"
    : ROOM_TYPE_LABELS[room.type];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(10,9,7,0.9)", backdropFilter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg overflow-hidden"
          style={{ 
            background: "var(--tone-bg)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--tone-border)"
          }}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="relative p-6"
            style={{ 
              borderBottom: "1px solid var(--tone-border)",
              background: "linear-gradient(135deg, rgba(184,154,96,0.08) 0%, transparent 100%)"
            }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-white/10"
              style={{ color: "var(--tone-muted)" }}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-start gap-4">
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "var(--tone-accent-light)", color: "var(--tone-accent)" }}
              >
                <span className="text-lg font-bold">{room.floor === 0 ? "G" : room.floor}F</span>
              </div>
              <div>
                <h2 className="font-serif text-xl" style={{ color: "var(--tone-text)" }}>
                  {roomLabel}
                </h2>
                <p className="text-sm" style={{ color: "var(--tone-muted)" }}>
                  {roomTypeLabel}
                </p>
              </div>
            </div>
            
            {/* Room info pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              <div 
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                style={{ background: "var(--tone-border)", color: "var(--tone-text)" }}
              >
                <Users className="h-3.5 w-3.5" />
                <span>{room.capacity} guests</span>
              </div>
              <div 
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                style={{ background: "var(--tone-border)", color: "var(--tone-text)" }}
              >
                <DollarSign className="h-3.5 w-3.5" />
                <span>${room.pricePerHour}/hr</span>
              </div>
              <div 
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                style={{ background: "var(--tone-border)", color: "var(--tone-text)" }}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>2hr slots</span>
              </div>
            </div>
          </div>

          {/* Date selector */}
          <div style={{ borderBottom: "1px solid var(--tone-border)" }} className="p-4">
            <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "var(--tone-muted)" }}>
              <CalendarDays className="h-4 w-4" />
              <span className="label">Select Date</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {dates.map((date) => (
                <button
                  key={date.value}
                  onClick={() => {
                    setSelectedDate(date.value);
                    setSelectedSlot(null);
                  }}
                  className={cn(
                    "flex min-w-[60px] flex-col items-center rounded-xl px-3 py-2 transition-all",
                    selectedDate === date.value
                      ? "bg-[var(--tone-accent)] text-[var(--tone-bg)]"
                      : "bg-[var(--tone-border)] text-[var(--tone-muted)] hover:bg-[var(--tone-accent)]/20"
                  )}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-70">
                    {date.label}
                  </span>
                  <span className="text-lg font-semibold">{date.day}</span>
                  {date.isToday && (
                    <span className="mt-0.5 h-1 w-1 rounded-full bg-current" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div className="p-4">
            <div className="text-sm mb-3 label" style={{ color: "var(--tone-muted)" }}>
              Available Time Slots (09:00 - 17:00)
            </div>
            
            {loadingAvailability ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--tone-muted)" }} />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {availability?.map((slot) => {
                  const status = getSlotStatus(slot);
                  const endHour = parseInt(slot.time.split(":")[0]) + 2;
                  const endTime = `${endHour.toString().padStart(2, "0")}:00`;
                  
                  // Only show slots between 09:00 and 17:00
                  const hour = parseInt(slot.time.split(":")[0]);
                  if (hour < 9 || hour > 15) return null;
                  
                  return (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedSlot(slot.time)}
                      disabled={!slot.available}
                      className={cn(
                        "relative flex flex-col items-center rounded-xl px-3 py-3 transition-all",
                        status === "reserved" && "cursor-not-allowed bg-red-500/10 text-red-400/60",
                        status === "available" && "bg-[var(--tone-border)] text-[var(--tone-text)] hover:bg-[var(--tone-accent)]/20 hover:text-[var(--tone-accent)]",
                        status === "selected" && "bg-[var(--tone-accent)] text-[var(--tone-bg)] ring-2 ring-[var(--tone-accent)] ring-offset-2 ring-offset-[var(--tone-bg)]"
                      )}
                    >
                      <span className="text-sm font-medium">{slot.time}</span>
                      <span className="text-[10px] opacity-60">{endTime}</span>
                      {status === "reserved" && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
                          <X className="h-2.5 w-2.5" />
                        </span>
                      )}
                      {status === "selected" && (
                        <motion.span
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full"
                          style={{ background: "var(--tone-bg)", color: "var(--tone-accent)" }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Auth Prompt */}
          <AnimatePresence>
            {showAuthPrompt && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-6"
                style={{ background: "rgba(10,9,7,0.95)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <div 
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "var(--tone-accent-light)", color: "var(--tone-accent)" }}
                  >
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: "var(--tone-text)" }}>
                    Sign In Required
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--tone-muted)" }}>
                    Please sign in to complete your booking
                  </p>
                  <div className="flex flex-col gap-3">
                  <Link
                    href={{ pathname: "/login" }}
                    onClick={() => setShowAuthPrompt(false)}
                    className="btn inline-flex items-center justify-center"
                  >
                    Sign In / Register
                  </Link>
                    <button
                      onClick={() => setShowAuthPrompt(false)}
                      className="text-sm bg-transparent border-none cursor-pointer"
                      style={{ color: "var(--tone-muted)" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer with book button */}
          <div 
            className="p-4 flex items-center justify-between"
            style={{ 
              borderTop: "1px solid var(--tone-border)",
              background: "rgba(255,255,255,0.02)"
            }}
          >
            <div>
              {selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm"
                >
                  <span style={{ color: "var(--tone-muted)" }}>Total: </span>
                  <span className="font-semibold" style={{ color: "var(--tone-text)" }}>
                    ${room.pricePerHour * 2}
                  </span>
                  <span style={{ color: "var(--tone-muted)" }}> (2 hours)</span>
                </motion.div>
              )}
            </div>
            <button
              onClick={handleBook}
              disabled={!selectedSlot || isBooking}
              className={cn(
                "flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all",
                selectedSlot
                  ? "btn"
                  : "cursor-not-allowed opacity-40"
              )}
            >
              {isBooking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Book Now</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
