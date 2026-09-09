export interface RecordSummary {
  id: string; // legacy: _id, new: id
  title: string; // legacy: title, new: 없음 (showName에 포함)
  showName?: string; // legacy: title, new: showName
  mt20id?: string; // new: KOPIS 공연 ID
  genre?: string; // new: 장르
  posterUrl?: string; // new: KOPIS 포스터 URL
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
