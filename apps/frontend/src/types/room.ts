export type Floor = 1 | 2 | 3 | 4 | 5;
export type RoomType = "studio" | "loft" | "single" | "penthouse" | "facility";
export type FacilityType = "garden" | "fitness" | "swimming-pool";
import type { TimeSlot } from "@sa/shared/types";

export interface Room {
  id: string;
  number: string;
  floor: Floor;
  type: RoomType;
  facility?: FacilityType;
  capacity: number;
  pricePerHour: number;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomWithAvailability extends Room {
  availability?: TimeSlot[];
}

export interface FloorInfo {
  floor: Floor;
  label: string;
  content: "rooms" | "facilities";
  roomTypes: RoomType[];
}

export const FLOORS: FloorInfo[] = [
  { floor: 1, label: "Floor 1", content: "rooms", roomTypes: ["studio", "loft", "single"] },
  { floor: 2, label: "Floor 2", content: "rooms", roomTypes: ["studio", "loft", "single"] },
  { floor: 3, label: "Floor 3", content: "rooms", roomTypes: ["studio", "loft", "single"] },
  { floor: 4, label: "Floor 4", content: "rooms", roomTypes: ["penthouse"] },
  { floor: 5, label: "Floor 5", content: "facilities", roomTypes: ["facility"] },
];

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  studio: "Studio",
  loft: "Loft",
  single: "Single Room",
  penthouse: "Penthouse",
  facility: "Facility",
};

export const FACILITY_LABELS: Record<FacilityType, string> = {
  garden: "Garden",
  fitness: "Fitness Center",
  "swimming-pool": "Swimming Pool",
};
