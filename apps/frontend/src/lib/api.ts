import { configureApiClient, createApiClient, createApi } from "@sa/shared/api";
import type { ApiClientConfig } from "@sa/shared/api";
import { getToken, removeToken } from "./auth";
import type { ApiError } from "@sa/shared/types";

const apiConfig: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
  getToken,
  onUnauthorized: () => {
    removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
  onError: (error: ApiError) => {
    console.error("API Error:", error);
  },
};

configureApiClient(apiConfig);
const axiosClient = createApiClient(apiConfig);

export const api = createApi(axiosClient);

export { getToken, removeToken } from "./auth";
