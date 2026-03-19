import { z } from "zod";

export const floorSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export const roomTypeSchema = z.enum([
  "studio",
  "loft",
  "single",
  "penthouse",
  "facility",
]);

export const facilityTypeSchema = z.enum([
  "garden",
  "fitness",
  "swimming-pool",
]);

export const roomSchema = z.object({
  id: z.string().uuid(),
  number: z.string().min(1),
  floor: floorSchema,
  type: roomTypeSchema,
  facility: facilityTypeSchema.optional(),
  capacity: z.number().int().positive(),
  pricePerHour: z.number().positive(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export const roomFiltersSchema = z.object({
  floor: floorSchema.optional(),
  type: roomTypeSchema.optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const createRoomSchema = z.object({
  number: z.string().min(1),
  floor: floorSchema,
  type: roomTypeSchema,
  facility: facilityTypeSchema.optional(),
  capacity: z.number().int().positive(),
  pricePerHour: z.number().positive(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export type RoomInput = z.infer<typeof roomSchema>;
export type RoomFiltersInput = z.infer<typeof roomFiltersSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
