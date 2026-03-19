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
  createdAt?: string;
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

export interface UpdateBookingDto {
  status?: BookingStatus;
}
