import { invoke } from "@tauri-apps/api/core";
import { AuthResponse, User, UserDTO } from "../types/auth";

export const authApi = {
  login: (dto: UserDTO) =>
    invoke<AuthResponse>("login", {
      username: dto.username,
      password: dto.password,
    }),

  logout: () => invoke<void>("logout"),

  validateToken: (token: string) =>
    invoke<boolean>("validate_token", { token }),
};
