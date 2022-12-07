import { User } from "./User";

export interface UserData {
  incomplete_results: boolean;
  items: User[];
  total_count: number;
}
