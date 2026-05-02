import { Address } from "./address";
import { User } from "./user";

export interface RecordDetail {
  id: string;
  title: string;
  showName: string;
  artistName?: string;
  contents: string;
  showDate: string;
  images?: string[];
  likeCount: number;
  isLiked?: boolean;
  user?: User;
  boardAddress?: Address;
  createdAt: string;
  updatedAt: string;
}
