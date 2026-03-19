import { z } from "zod";

export const timeSlotSchema = z.object({
  time: z.string().regex(/^\d{2}:\d{2}$/),
  available: z.boolean(),
  bookingId: z.string().uuid().optional(),
});

export const bookingStatusSchema = z.enum([
  "confirmed",
  "cancelled",
  "completed",
]);

export const createBookingSchema = z.object({
  roomId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be HH:MM format"),
});

export const bookingSchema = z.object({
  id: z.string().uuid(),
  roomId: z.string().uuid(),
  userId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  status: bookingStatusSchema,
});

export const updateBookingSchema = z.object({
  status: bookingStatusSchema.optional(),
});

export type TimeSlotInput = z.infer<typeof timeSlotSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
