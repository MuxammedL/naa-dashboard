import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export class HttpClient {
  private static readonly baseURL = import.meta.env.BASE_URL;
  private static readonly instance = axios.create({
    baseURL: this.baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
  });

  static setToken(token: string): void {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private static async request<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.request<T>(config);
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private static handleError(error: AxiosError): void {
    if (error.response) {
      console.error("Response error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("Network error:", error.message);
    } else {
      console.error("Request setup error:", error.message);
    }
  }

  static async get<T>(
    path: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    const query = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString()
      : "";
    return this.request<T>({ method: "GET", url: `${path}${query}` });
  }

  static async post<T, D = unknown>(
    path: string,
    data?: D
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "POST", url: path, data });
  }

  static async put<T, D = unknown>(
    path: string,
    data?: D
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "PUT", url: path, data });
  }
}
