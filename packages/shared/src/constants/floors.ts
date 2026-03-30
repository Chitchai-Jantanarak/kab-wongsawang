export const FLOORS = [0, 1, 2, 3, 4, 5] as const;
export type FloorNumber = 0 | 1 | 2 | 3 | 4 | 5;

export const FLOOR_INFO: Record<
  FloorNumber,
  { name: string; content: string; roomTypes: string[]; description: string }
> = {
  0: { name: "Ground Floor", content: "Lobby", roomTypes: ["Lobby", "Lounge"], description: "Open plan lobby, main entrance, welcoming lounge, smooth concrete pathways" },
  1: { name: "Floor 1", content: "Rooms", roomTypes: ["Studio", "Loft", "Single"], description: "Studio apartments, compact units, small repeated windows" },
  2: { name: "Floor 2", content: "Rooms", roomTypes: ["Studio", "Loft", "Single"], description: "Loft apartments, double-height voids, visible through glass" },
  3: { name: "Floor 3", content: "Rooms", roomTypes: ["Studio", "Loft", "Single"], description: "Grand loft apartments, bigger areas" },
  4: { name: "Floor 4", content: "Rooms", roomTypes: ["Penthouse"], description: "Single luxury penthouse apartment, setback" },
  5: { name: "Floor 5", content: "Facilities", roomTypes: ["Garden", "Fitness", "Swimming Pool"], description: "Facilities: swimming pool, fitness, garden/park" },
};

export const ROOM_TYPES = ["studio", "loft", "single", "penthouse", "facility"] as const;

export const FACILITY_TYPES = ["garden", "fitness", "swimming-pool"] as const;

export const BOOKING_STATUSES = ["confirmed", "cancelled", "completed"] as const;

export const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
] as const;

export const SLOT_DURATION_HOURS = 2;

export const CACHE_DURATION = {
  ROOMS: 900, // 15 minutes in seconds
  AVAILABILITY: 60, // 1 minute in seconds
} as const;
