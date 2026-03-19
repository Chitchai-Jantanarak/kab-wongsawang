import type { Room } from "./room";

export type BookingStatus = "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
  room?: Room;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  bookingId?: string;
}

export interface CreateBookingDto {
  roomId: string;
  date: string;
  startTime: string;
}

export interface BookingFormState {
  roomId: string | null;
  date: string | null;
  startTime: string | null;
}

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00",
] as const;

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

export const SLOT_DURATION_HOURS = 2;
