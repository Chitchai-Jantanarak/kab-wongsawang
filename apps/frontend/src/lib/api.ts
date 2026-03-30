'use client';

import { getToken, removeToken } from "./auth";
import type { ApiError } from "@sa/shared/types";

// Simple fetch-based API client for browser usage
export const api = {
  auth: {
    login: async (data: { email: string; password: string }) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );
        return response.json();
      } catch (error) {
        return { success: false, error: 'Network error' };
      }
    },
    register: async (data: { email: string; password: string; name?: string }) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );
        return response.json();
      } catch (error) {
        return { success: false, error: 'Network error' };
      }
    },
    me: async () => {
      try {
        const token = getToken();
        if (!token) return { success: false };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return response.json();
      } catch (error) {
        return { success: false, error: 'Network error' };
      }
    },
  },
  rooms: {
    getAll: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/rooms`
        );
        return response.json();
      } catch (error) {
        return { success: false, error: 'Network error' };
      }
    },
    getById: async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/rooms/${id}`
        );
        return response.json();
      } catch (error) {
        return { success: false, error: 'Network error' };
      }
    },
  },
  bookings: {
    create: async (data: any) => {
      try {
        const token = getToken();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/bookings`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );
        return response.json();
      } catch (error) {
        return { success: false, error: 'Network error' };
      }
    },
  },
};

export { getToken, removeToken } from "./auth";
