import config from "../../configs/config";

export default class ApiHelper {
  api_token: string | null = null;
  api_url: string | undefined = config.baseURL;
  api_is_mocked: boolean | undefined;
  headers: Headers = new Headers();

  constructor() {
    this.api_is_mocked = config?.isMocked?.toLowerCase() == "true";
  }

  init = async () => {
    this.headers.append("Accept", "application/json");
    this.headers.append("Access-Control-Allow-Credentials", "true");
    this.headers.append("Content-Type", "application/json");
  };

  addHeaderValue = (key: string, value?: string) => {
    this.headers.append(key, value ? value : "");
  };

  get = async (route: string, params?: any) => {
    this.init();
    const requestInit = {
      method: "GET",
      headers: this.headers
    };

    const routeQueryParams = params
      ? `${route}?${new URLSearchParams(params).toString()}`
      : route;
    return this.abortableFetch(this.api_url + routeQueryParams, requestInit)
      .ready;
  };

  post = async (route: string, params: any) => {
    this.init();

    const requestInit = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(params)
    };
    return this.abortableFetch(this.api_url + route, requestInit).ready;
  };

  put = async (route: string, params?: any) => {
    this.init();

    const requestInit = {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(params)
    };
    return this.abortableFetch(this.api_url + route, requestInit).ready;
  };

  delete = async (route: string, params?: any) => {
    this.init();

    const requestInit = {
      method: "DELETE",
      headers: this.headers
    };

    const routeQueryParams = params ? `${route}/${params}` : route;
    return this.abortableFetch(this.api_url + routeQueryParams, requestInit)
      .ready;
  };

  createFakeResponse = (
    data: any,
    status: number = 200,
    withDelay: boolean = true
  ): Promise<Response> => {
    const init = { status: status, statusText: "OK!" };
    const blob =
      status !== 204
        ? new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json"
          })
        : null;
    const response = new Response(blob, init);
    return new Promise((resolve) => {
      if (!withDelay) {
        resolve(response);
      } else {
        setTimeout(() => {
          resolve(response);
        }, 2000);
      }
    });
  };

  private abortableFetch = (request: string, options: any) => {
    const controller = new AbortController();
    const signal = controller.signal;

    return {
      abort: () => controller.abort(),
      ready: fetch(request, { ...options, signal, credentials: "include" })
    };
  };
}
