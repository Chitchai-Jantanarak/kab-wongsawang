import { configureApiClient, createApi } from "@sa/shared/api";
import { getToken, setToken, removeToken } from "./auth";

configureApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
  getToken,
  onUnauthorized: () => {
    removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
  onError: (error) => {
    console.error("API Error:", error);
  },
});

export const api = createApi(configureApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
  getToken,
}));

export { setToken, getToken, removeToken } from "./auth";
