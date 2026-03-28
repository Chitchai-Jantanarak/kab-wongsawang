import type { AxiosInstance } from "axios";
import type {
  ApiResponse,
  Room,
  Booking,
  User,
  TimeSlot,
} from "../types";
import type {
  CreateBookingInput,
  RoomFiltersInput,
  LoginInput,
  RegisterInput,
} from "../schemas";
import { createBookingSchema } from "../schemas";

export interface RoomsApi {
  list: (filters?: RoomFiltersInput) => Promise<ApiResponse<Room[]>>;
  get: (id: string) => Promise<ApiResponse<Room>>;
  getAvailability: (
    roomId: string,
    date: string
  ) => Promise<ApiResponse<TimeSlot[]>>;
}

export interface BookingsApi {
  list: () => Promise<ApiResponse<Booking[]>>;
  get: (id: string) => Promise<ApiResponse<Booking>>;
  create: (data: CreateBookingInput) => Promise<ApiResponse<Booking>>;
  cancel: (id: string) => Promise<ApiResponse<Booking>>;
}

export interface AuthApi {
  login: (data: LoginInput) => Promise<ApiResponse<{ user: User; token: string }>>;
  register: (data: RegisterInput) => Promise<ApiResponse<User>>;
  me: () => Promise<ApiResponse<User>>;
}

export const createRoomsApi = (client: AxiosInstance): RoomsApi => ({
  list: async (filters?: RoomFiltersInput) => {
    const { data } = await client.get<ApiResponse<Room[]>>("/api/rooms", {
      params: filters,
    });
    return data;
  },

  get: async (id: string) => {
    const { data } = await client.get<ApiResponse<Room>>(`/api/rooms/${id}`);
    return data;
  },

  getAvailability: async (roomId: string, date: string) => {
    const { data } = await client.get<ApiResponse<TimeSlot[]>>(
      `/api/rooms/${roomId}/availability`,
      { params: { date } }
    );
    return data;
  },
});

export const createBookingsApi = (client: AxiosInstance): BookingsApi => ({
  list: async () => {
    const { data } = await client.get<ApiResponse<Booking[]>>("/api/bookings");
    return data;
  },

  get: async (id: string) => {
    const { data } = await client.get<ApiResponse<Booking>>(
      `/api/bookings/${id}`
    );
    return data;
  },

  create: async (input: CreateBookingInput) => {
    const validated = createBookingSchema.parse(input);
    const { data } = await client.post<ApiResponse<Booking>>(
      "/api/bookings",
      validated
    );
    return data;
  },

  cancel: async (id: string) => {
    const { data } = await client.delete<ApiResponse<Booking>>(
      `/api/bookings/${id}`
    );
    return data;
  },
});

export const createAuthApi = (client: AxiosInstance): AuthApi => ({
  login: async (input: LoginInput) => {
    const { data } = await client.post<ApiResponse<{ user: User; token: string }>>(
      "/api/auth/login",
      input
    );
    return data;
  },

  register: async (input: RegisterInput) => {
    const { data } = await client.post<ApiResponse<User>>(
      "/api/auth/register",
      input
    );
    return data;
  },

  me: async () => {
    const { data } = await client.get<ApiResponse<User>>("/api/auth/me");
    return data;
  },
});

export interface Api {
  rooms: RoomsApi;
  bookings: BookingsApi;
  auth: AuthApi;
}

export const createApi = (client: AxiosInstance): Api => ({
  rooms: createRoomsApi(client),
  bookings: createBookingsApi(client),
  auth: createAuthApi(client),
});
