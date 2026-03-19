import { z } from "zod";

export const floorSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export const roomTypeSchema = z.enum(["studio", "loft", "single", "penthouse", "facility"]);

export const facilityTypeSchema = z.enum(["garden", "fitness", "swimming-pool"]);

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

export const roomQuerySchema = z.object({
  floor: floorSchema.optional(),
  type: roomTypeSchema.optional(),
});

export type RoomQuery = z.infer<typeof roomQuerySchema>;
export type RoomFormData = z.infer<typeof roomSchema>;
