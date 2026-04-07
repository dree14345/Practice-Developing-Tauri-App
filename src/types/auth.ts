export interface User {
  username: string;
  password: string;
}

export interface UserDTO {
  username?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user_id: number;
  username: string;
}
