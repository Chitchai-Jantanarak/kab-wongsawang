import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import type { ApiResponse, ApiError } from "../types";

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  getToken?: () => string | null;
  onError?: (error: ApiError) => void;
  onUnauthorized?: () => void;
}

let globalConfig: ApiClientConfig | null = null;

export const configureApiClient = (config: ApiClientConfig): void => {
  globalConfig = config;
};

export const getApiConfig = (): ApiClientConfig => {
  if (!globalConfig) {
    throw new Error("API client not configured. Call configureApiClient first.");
  }
  return globalConfig;
};

export const createApiClient = (config?: ApiClientConfig): AxiosInstance => {
  const finalConfig = config || globalConfig;

  if (!finalConfig) {
    throw new Error("API client configuration is required");
  }

  const client = axios.create({
    baseURL: finalConfig.baseURL,
    timeout: finalConfig.timeout || 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      if (finalConfig.getToken) {
        const token = finalConfig.getToken();
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }
      }
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => response,
    (error: AxiosError<ApiError>) => {
      const apiError: ApiError = {
        statusCode: error.response?.status || 500,
        message:
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred",
        error: error.response?.data?.error,
        timestamp: new Date().toISOString(),
        path: error.config?.url,
      };

      if (finalConfig.onError) {
        finalConfig.onError(apiError);
      }

      if (error.response?.status === 401 && finalConfig.onUnauthorized) {
        finalConfig.onUnauthorized();
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};

export class ApiClientFactory {
  private static instances: Map<string, AxiosInstance> = new Map();

  static getInstance(name: string, config: ApiClientConfig): AxiosInstance {
    if (!this.instances.has(name)) {
      this.instances.set(name, createApiClient(config));
    }
    return this.instances.get(name)!;
  }

  static clearInstance(name?: string): void {
    if (name) {
      this.instances.delete(name);
    } else {
      this.instances.clear();
    }
  }
}
