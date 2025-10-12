export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}
