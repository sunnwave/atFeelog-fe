export interface RecordSummary {
  id: string; // legacy: _id, new: id
  title: string; // legacy: title, new: 없음 (showName에 포함)
  showName?: string; // legacy: title, new: showName
  artistName?: string; // legacy: 없음 (title에 포함), new: artistName
  likeCount?: number;
  commentCount?: number;
  images?: string[];
  isLiked?: boolean; // legacy: 없음, new: isLiked
  user?: {
    id: string;
    name: string;
    picture?: string;
  };
  createdAt: string;
}
