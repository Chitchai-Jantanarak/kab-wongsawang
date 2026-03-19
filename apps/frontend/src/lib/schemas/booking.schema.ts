import { z } from "zod";

export const timeSlotSchema = z.object({
  time: z.string().regex(/^\d{2}:\d{2}$/),
  available: z.boolean(),
  bookingId: z.string().uuid().optional(),
});

export const createBookingSchema = z.object({
  roomId: z.string().uuid({ message: "Please select a room" }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please select a valid date",
  }),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "Please select a time slot",
  }),
});

export const bookingStatusSchema = z.enum(["confirmed", "cancelled", "completed"]);

export const bookingSchema = z.object({
  id: z.string().uuid(),
  roomId: z.string().uuid(),
  userId: z.string().uuid(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: bookingStatusSchema,
  createdAt: z.string(),
});

export type CreateBookingFormData = z.infer<typeof createBookingSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
