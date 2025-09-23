export type UserRole = "admin" | "user";

export interface IUser {
      name: string;
      email: string;
      password: string;
      role: UserRole;
}