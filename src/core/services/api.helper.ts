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

function getAuthHeaders(
): Record<string, string> {
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
    console.log("URL:", url);
    console.log("OPTIONS:", fetchOptions);
    
    response = await fetch(url, fetchOptions);
  } catch {
    throw new NetworkError();
  }
  if (!response.ok) {
    if (response.status === 401) throw new UnauthorizedError();
    if (response.status === 404) throw new NotFoundError();
    if (response.status === 422) throw new ValidationError();

    // Pour voir le message d'erreur
    try {
      const data = await response.json();
      console.log("Error Message:", data.message);
      console.log("Error content:", data);
    } catch (error) {
      
    }
    throw new ApiError(response.status, response.statusText);
  }

  const data  = await response.json();
  // const data = decoded as unknown as ResponseApi;
  console.log("DATA:", data);
  return data;
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

  const data = body instanceof FormData ? Object.fromEntries(body.entries()) : body;
  
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

  const data = body instanceof FormData ? Object.fromEntries(body.entries()) : body;
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
