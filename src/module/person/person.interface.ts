export type personCategory = "family" | "friend" | "colleague" | "unknown";

export interface IPerson {
  name: string;
  email: string;
  phone: string;
  age?: number;
  address?: string;
  category: personCategory;
  photo?: string;
 
}
