import { User } from "./user";

export interface RecordComment {
  id: string;
  content: string; // legacy: contents, new: content
  user?: User;
  createdAt: string;
  updatedAt: string;
}
