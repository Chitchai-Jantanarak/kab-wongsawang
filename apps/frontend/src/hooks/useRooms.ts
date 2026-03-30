"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Room, Floor, RoomWithAvailability } from "@/types/room";
import type { TimeSlot, CreateBookingDto, Booking } from "@/types/booking";

// Mock data for rooms - In production, this would come from an API
const generateMockRooms = (): Room[] => {
  const rooms: Room[] = [];
  
  // Ground floor facilities
  rooms.push(
    { id: "G-LOBBY", number: "Lobby", floor: 0, type: "facility", facility: "lobby", capacity: 50, pricePerHour: 0, position: { x: 50, y: 50 }, isActive: true },
    { id: "G-LOUNGE", number: "Lounge", floor: 0, type: "facility", facility: "lounge", capacity: 20, pricePerHour: 0, position: { x: 25, y: 30 }, isActive: true },
  );
  
  // Floor 1-4 rooms
  for (let floor = 1; floor <= 4; floor++) {
    const roomsPerFloor = floor === 4 ? 4 : 6;
    const types: Array<"studio" | "loft" | "single" | "penthouse"> = 
      floor === 4 ? ["penthouse", "penthouse", "penthouse", "penthouse"] : ["studio", "loft", "single", "studio", "loft", "single"];
    
    for (let i = 0; i < roomsPerFloor; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      rooms.push({
        id: `${floor}${String.fromCharCode(65 + i)}`,
        number: `${floor}0${i + 1}`,
        floor: floor as Floor,
        type: types[i],
        capacity: types[i] === "penthouse" ? 6 : types[i] === "loft" ? 4 : 2,
        pricePerHour: types[i] === "penthouse" ? 500 : types[i] === "loft" ? 200 : 100,
        position: { x: 20 + col * 30, y: 25 + row * 50 },
        isActive: true,
      });
    }
  }
  
  // Floor 5 facilities
  rooms.push(
    { id: "5-FITNESS", number: "Fitness", floor: 5, type: "facility", facility: "fitness", capacity: 30, pricePerHour: 50, position: { x: 25, y: 40 }, isActive: true },
    { id: "5-POOL", number: "Pool", floor: 5, type: "facility", facility: "swimming-pool", capacity: 40, pricePerHour: 100, position: { x: 50, y: 40 }, isActive: true },
    { id: "5-ROOFTOP", number: "Rooftop", floor: 5, type: "facility", facility: "rooftop", capacity: 60, pricePerHour: 200, position: { x: 75, y: 40 }, isActive: true },
  );
  
  return rooms;
};

// Mock bookings storage
let mockBookings: Booking[] = [
  { id: "b1", roomId: "1A", userId: "user1", date: new Date().toISOString().split("T")[0], startTime: "10:00", endTime: "12:00", status: "confirmed", createdAt: new Date().toISOString() },
  { id: "b2", roomId: "2B", userId: "user2", date: new Date().toISOString().split("T")[0], startTime: "14:00", endTime: "16:00", status: "confirmed", createdAt: new Date().toISOString() },
  { id: "b3", roomId: "1A", userId: "user3", date: new Date().toISOString().split("T")[0], startTime: "16:00", endTime: "18:00", status: "confirmed", createdAt: new Date().toISOString() },
];

const MOCK_ROOMS = generateMockRooms();

// Generate time slots with availability
const generateTimeSlots = (roomId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
  
  times.forEach((time) => {
    const booking = mockBookings.find(
      (b) => b.roomId === roomId && b.date === date && b.startTime === time && b.status === "confirmed"
    );
    slots.push({
      time,
      available: !booking,
      bookingId: booking?.id,
    });
  });
  
  return slots;
};

// Fetch all rooms
export function useRooms(floor?: Floor) {
  return useQuery({
    queryKey: ["rooms", floor],
    queryFn: async (): Promise<Room[]> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (floor !== undefined) {
        return MOCK_ROOMS.filter((r) => r.floor === floor);
      }
      return MOCK_ROOMS;
    },
  });
}

// Fetch single room with availability
export function useRoom(roomId: string | null, date: string) {
  return useQuery({
    queryKey: ["room", roomId, date],
    queryFn: async (): Promise<RoomWithAvailability | null> => {
      if (!roomId) return null;
      await new Promise((resolve) => setTimeout(resolve, 200));
      const room = MOCK_ROOMS.find((r) => r.id === roomId);
      if (!room) return null;
      return {
        ...room,
        availability: generateTimeSlots(roomId, date),
      };
    },
    enabled: !!roomId,
  });
}

// Fetch room availability
export function useRoomAvailability(roomId: string | null, date: string) {
  return useQuery({
    queryKey: ["availability", roomId, date],
    queryFn: async (): Promise<TimeSlot[]> => {
      if (!roomId) return [];
      await new Promise((resolve) => setTimeout(resolve, 200));
      return generateTimeSlots(roomId, date);
    },
    enabled: !!roomId && !!date,
  });
}

// Create booking mutation
export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateBookingDto): Promise<Booking> => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Check if slot is available
      const existingBooking = mockBookings.find(
        (b) => b.roomId === data.roomId && b.date === data.date && b.startTime === data.startTime && b.status === "confirmed"
      );
      
      if (existingBooking) {
        throw new Error("This time slot is no longer available");
      }
      
      const newBooking: Booking = {
        id: `b${Date.now()}`,
        roomId: data.roomId,
        userId: "current-user",
        date: data.date,
        startTime: data.startTime,
        endTime: `${parseInt(data.startTime.split(":")[0]) + 2}:00`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      
      mockBookings.push(newBooking);
      return newBooking;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["availability", variables.roomId] });
      queryClient.invalidateQueries({ queryKey: ["room", variables.roomId] });
    },
  });
}

// Get rooms grouped by floor
export function useRoomsByFloor() {
  return useQuery({
    queryKey: ["rooms-by-floor"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const grouped: Record<Floor, Room[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };
      MOCK_ROOMS.forEach((room) => {
        grouped[room.floor].push(room);
      });
      return grouped;
    },
  });
}
