import axios from "axios";

const BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3500/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.response?.data ??
      error.message ??
      "Erreur réseau";
    return Promise.reject(new Error(String(message)));
  }
);

// Version lecture seule : uniquement des requêtes GET.
export const api = {
  get: <T>(path: string) => apiClient.get<T>(path).then((r) => r.data),
};
