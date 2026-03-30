export type Floor = 0 | 1 | 2 | 3 | 4 | 5;
export type RoomType = "studio" | "loft" | "single" | "penthouse" | "facility";
export type FacilityType = "garden" | "fitness" | "swimming-pool" | "lobby" | "lounge" | "rooftop";

export interface RoomPosition {
  x: number;
  y: number;
}

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
  position: RoomPosition;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomWithAvailability extends Room {
  availability?: Array<{
    time: string;
    available: boolean;
    bookingId?: string;
  }>;
}

export interface FloorInfo {
  floor: Floor;
  label: string;
  content: "rooms" | "facilities";
  roomTypes: RoomType[];
  color: string;
}

export const FLOORS: FloorInfo[] = [
  { floor: 0, label: "Ground", content: "facilities", roomTypes: ["facility"], color: "#3b5249" },
  { floor: 1, label: "Floor 1", content: "rooms", roomTypes: ["studio", "loft", "single"], color: "#519872" },
  { floor: 2, label: "Floor 2", content: "rooms", roomTypes: ["studio", "loft", "single"], color: "#5b8c5a" },
  { floor: 3, label: "Floor 3", content: "rooms", roomTypes: ["studio", "loft", "single"], color: "#6b9b6a" },
  { floor: 4, label: "Floor 4", content: "rooms", roomTypes: ["penthouse"], color: "#7caa7a" },
  { floor: 5, label: "Floor 5", content: "facilities", roomTypes: ["facility"], color: "#8db98d" },
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
  lobby: "Lobby",
  lounge: "Lounge",
  rooftop: "Rooftop Terrace",
};
