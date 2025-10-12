import type { LoginRequest, LoginResponse, UserProfile } from "@/types/dto";
import { HttpClient } from "./HttpClient";

export class UserService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const res = await HttpClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    const data = res.data;

    localStorage.setItem("accessToken", data.accessToken);
    HttpClient.setToken(data.accessToken);

    return data;
  }

  static logout(): void {
    localStorage.removeItem("accessToken");
    HttpClient.setToken("");
  }

  static async getProfile(): Promise<UserProfile> {
    const res = await HttpClient.get<UserProfile>("/users/me");
    return res.data;
  }

  static async updateProfile(
    payload: Partial<UserProfile>
  ): Promise<UserProfile> {
    const res = await HttpClient.put<UserProfile>("/users/me", payload);
    return res.data;
  }

  static async refreshToken(refreshToken: string): Promise<void> {
    const res = await HttpClient.post<{ accessToken: string }>(
      "/auth/refresh",
      {
        refreshToken,
      }
    );

    const newToken = res.data.accessToken;
    localStorage.setItem("accessToken", newToken);
    HttpClient.setToken(newToken);
  }
}
