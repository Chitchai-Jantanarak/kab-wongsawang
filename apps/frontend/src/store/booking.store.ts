import { create } from "zustand";
import { api } from "@/lib/api";
import type { Booking, TimeSlot } from "@sa/shared/types";
import type { CreateBookingInput } from "@sa/shared/schemas";

interface BookingState {
  currentBooking: Partial<CreateBookingInput>;
  selectedSlot?: TimeSlot;
  selectedDate?: string;
  userBookings: Booking[];
  isLoading: boolean;
  error: string | null;
  success: boolean;

  setBookingField: <K extends keyof CreateBookingInput>(
    key: K,
    value: CreateBookingInput[K]
  ) => void;
  selectSlot: (slot: TimeSlot) => void;
  setDate: (date: string) => void;
  clearBooking: () => void;
  submitBooking: () => Promise<boolean>;
  fetchUserBookings: () => Promise<void>;
  cancelBooking: (id: string) => Promise<boolean>;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  currentBooking: {},
  selectedSlot: undefined,
  selectedDate: undefined,
  userBookings: [],
  isLoading: false,
  error: null,
  success: false,

  setBookingField: (key, value) => {
    set((state) => ({
      currentBooking: { ...state.currentBooking, [key]: value },
    }));
  },

  selectSlot: (slot: TimeSlot) => {
    const { currentBooking } = get();
    set({
      selectedSlot: slot,
      currentBooking: {
        ...currentBooking,
        startTime: slot.time,
      },
    });
  },

  setDate: (date: string) => {
    set((state) => ({
      selectedDate: date,
      currentBooking: { ...state.currentBooking, date },
    }));
  },

  clearBooking: () => {
    set({
      currentBooking: {},
      selectedSlot: undefined,
      selectedDate: undefined,
      error: null,
      success: false,
    });
  },

  submitBooking: async () => {
    const { currentBooking } = get();
    set({ isLoading: true, error: null, success: false });

    try {
      const response = await api.bookings.create(currentBooking as CreateBookingInput);
      if (response.success && response.data) {
        set((state) => ({
          userBookings: [response.data!, ...state.userBookings],
          isLoading: false,
          success: true,
          currentBooking: {},
          selectedSlot: undefined,
        }));
        return true;
      } else {
        set({ error: response.error || "Failed to create booking", isLoading: false });
        return false;
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to create booking", isLoading: false });
      return false;
    }
  },

  fetchUserBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.bookings.list();
      if (response.success && response.data) {
        set({ userBookings: response.data, isLoading: false });
      } else {
        set({ error: response.error || "Failed to fetch bookings", isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch bookings", isLoading: false });
    }
  },

  cancelBooking: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.bookings.cancel(id);
      if (response.success && response.data) {
        set((state) => ({
          userBookings: state.userBookings.map((b) =>
            b.id === id ? response.data! : b
          ),
          isLoading: false,
          success: true,
        }));
        return true;
      } else {
        set({ error: response.error || "Failed to cancel booking", isLoading: false });
        return false;
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to cancel booking", isLoading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: false }),
}));
