import { create } from "zustand";
import { api } from "@/lib/api";
import type { Room, TimeSlot } from "@sa/shared/types";
import type { RoomFiltersInput } from "@sa/shared/schemas";

interface RoomState {
  rooms: Room[];
  filteredRooms: Room[];
  selectedRoom: Room | null;
  availability: TimeSlot[];
  filters: RoomFiltersInput;
  isLoading: boolean;
  error: string | null;

  fetchRooms: (filters?: RoomFiltersInput) => Promise<void>;
  fetchRoom: (id: string) => Promise<void>;
  fetchAvailability: (roomId: string, date: string) => Promise<void>;
  setFilter: <K extends keyof RoomFiltersInput>(
    key: K,
    value: RoomFiltersInput[K]
  ) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  clearError: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  rooms: [],
  filteredRooms: [],
  selectedRoom: null,
  availability: [],
  filters: {},
  isLoading: false,
  error: null,

  fetchRooms: async (filters?: RoomFiltersInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.rooms.list(filters);
      if (response.success && response.data) {
        set({
          rooms: response.data,
          filteredRooms: response.data,
          isLoading: false,
        });
      } else {
        set({ error: response.error || "Failed to fetch rooms", isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch rooms", isLoading: false });
    }
  },

  fetchRoom: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.rooms.get(id);
      if (response.success && response.data) {
        set({ selectedRoom: response.data, isLoading: false });
      } else {
        set({ error: response.error || "Failed to fetch room", isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch room", isLoading: false });
    }
  },

  fetchAvailability: async (roomId: string, date: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.rooms.getAvailability(roomId, date);
      if (response.success && response.data) {
        set({ availability: response.data, isLoading: false });
      } else {
        set({ error: response.error || "Failed to fetch availability", isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch availability", isLoading: false });
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  clearFilters: () => {
    set({ filters: {}, filteredRooms: get().rooms });
  },

  applyFilters: () => {
    const { rooms, filters } = get();
    let filtered = [...rooms];

    if (filters.floor) {
      filtered = filtered.filter((room) => room.floor === filters.floor);
    }
    if (filters.type) {
      filtered = filtered.filter((room) => room.type === filters.type);
    }

    set({ filteredRooms: filtered });
  },

  clearError: () => set({ error: null }),
}));
