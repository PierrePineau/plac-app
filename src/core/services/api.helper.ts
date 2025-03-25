import { addToast } from "@heroui/toast";

import {
  ApiError,
  UnauthorizedError,
  NotFoundError,
  ValidationError,
  NetworkError
} from "./error";

interface ExtendedRequestInit extends RequestInit {
  skipAuth?: boolean;
  authTarget?: "admin" | "user";
}

function getAuthHeaders(): Record<string, string> {
  const tokenKey = "jwtToken";
  const token = localStorage.getItem(tokenKey);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function request<T>(
  url: string,
  options: ExtendedRequestInit = {}
): Promise<T> {
  const { skipAuth, authTarget, ...fetchOptions } = options;
  const authHeaders = !skipAuth ? getAuthHeaders() : {};
  const mergedHeaders: Record<string, string> = {};
  if (fetchOptions.headers) {
    if (fetchOptions.headers instanceof Headers) {
      fetchOptions.headers.forEach((value, key) => {
        mergedHeaders[key] = value;
      });
    } else if (Array.isArray(fetchOptions.headers)) {
      fetchOptions.headers.forEach(([key, value]) => {
        mergedHeaders[key] = value;
      });
    } else {
      Object.assign(mergedHeaders, fetchOptions.headers);
    }
  }
  fetchOptions.headers = { ...mergedHeaders, ...authHeaders };
  let response: Response;
  try {
    console.log("URL:", url, "OPTIONS:", fetchOptions);
    response = await fetch(url, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("Data:", data);

      return data;
    } else {
      // Pour voir le message d'erreur
      try {
        const data = await response.json();
        if (response.status === 400) {
          addToast({
            title: "Warning",
            description: data.message ?? "Une erreur est survenue, veuillez contacter le SAV",
            color: "warning"
          });
        }else{
          addToast({
            title: "Erreur",
            description: data.message ?? "Une erreur est survenue, veuillez contacter le SAV",
            color: "danger"
          });
        }
        console.log("Error Message:", data.message);
        console.log("Error content:", data);
        return data;
      } catch (error) {
        addToast({
          title: "Erreur",
          description: "Une erreur est survenue, veuillez contacter le SAV",
          color: "danger"
        });
      }
      throw new ApiError(response.status, response.statusText);
    }
  } catch (error) {
    console.log("Error:", error);
    addToast({
      title: "Erreur",
      description: "Une erreur est survenue, veuillez contacter le SAV",
      color: "danger"
    });
    throw new NetworkError();
  }
}

export function get<T>(
  url: string,
  options: ExtendedRequestInit = {}
): Promise<T> {
  return request<T>(url, { ...options, method: "GET" });
}

export function post<T>(
  url: string,
  body: unknown,
  options: ExtendedRequestInit = {}
): Promise<T> {
  const data =
    body instanceof FormData ? Object.fromEntries(body.entries()) : body;

  return request<T>(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {})
    },
    body: JSON.stringify(data)
  });
}

export function put<T>(
  url: string,
  body: unknown,
  options: ExtendedRequestInit = {}
): Promise<T> {
  const data =
    body instanceof FormData ? Object.fromEntries(body.entries()) : body;
  return request<T>(url, {
    ...options,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {})
    },
    body: JSON.stringify(data)
  });
}

export function remove<T>(
  url: string,
  options: ExtendedRequestInit = {}
): Promise<T> {
  return request<T>(url, { ...options, method: "DELETE" });
}
