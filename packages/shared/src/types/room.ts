export type Floor = 0 | 1 | 2 | 3 | 4 | 5;

export type RoomType = "studio" | "loft" | "single" | "penthouse" | "facility";

export type FacilityType = "garden" | "fitness" | "swimming-pool";

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

export interface RoomFilters {
  floor?: Floor;
  type?: RoomType;
  date?: string;
}
