import { MdComment, MdShare } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

interface BodyTimelineProps {
  post_id: number;
  username: string;
  createdAt: string;
  content: string;
  sharesCount: number;
  likesCount: number;
  commentsCount: number;
  isFollowing?: boolean;
}

export default function BodyTimeline({
  post_id,
  username,
  createdAt,
  content,
  sharesCount,
  likesCount,
  commentsCount,
  isFollowing = false,
}: BodyTimelineProps) {
  return (
    <div className="m-11 shadow-sm p-4 rounded-xl">
      {/* User Info */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="font-semibold">{username}</h1>
          <p className="text-gray-400 text-sm">{createdAt}</p>
        </div>
        <button className="bg-main font-semibold text-white cursor-pointer rounded-3xl px-3 py-2">
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Post Content */}
      <p className="my-3">{content}</p>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <MdShare /> {sharesCount}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FiHeart /> {likesCount}
          </div>
          <div className="flex items-center gap-1">
            <MdComment /> {commentsCount}
          </div>
        </div>
      </div>
    </div>
  );
}