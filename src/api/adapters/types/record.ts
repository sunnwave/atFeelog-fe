import { Address } from "./address";
import { User } from "./user";

export interface RecordDetail {
  id: string; // legacy: _id, new: id
  title: string; // legacy: title, new: 없음 (showName에 포함)
  showName: string; // legacy: title, new: showName
  artistName?: string; // legacy: 없음 (title에 포함), new: artistName
  contents: string;
  showDate: string; // legacy: 없음, new: showDate
  images?: string[];
  likeCount: number;
  isLiked?: boolean; // legacy: 없음, new: isLiked
  user?: User;
  boardAddress?: Address;
  createdAt: string;
  updatedAt: string;
}
