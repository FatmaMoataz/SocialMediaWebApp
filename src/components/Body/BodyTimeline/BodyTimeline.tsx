import { MdComment, MdShare } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface BodyTimelineProps {
  post_id: number;
  username: string;
  avatar_url?: string;
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
  avatar_url,
  createdAt,
  content,
  sharesCount,
  likesCount,
  commentsCount,
  isFollowing = false,
}: BodyTimelineProps) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${post_id}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    if (action === 'comment') {
      navigate(`/post/${post_id}#comments`);
    }
    console.log(`${action} clicked for post ${post_id}`);
  };

  return (
    <div 
      className="m-11 shadow-sm p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handlePostClick}
    >

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">

          <div className="flex-shrink-0">
            <img
              src={avatar_url || `https://i.pravatar.cc/150?u=${post_id}`}
              alt={`${username}'s avatar`}
              className="size-12 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
            />
          </div>

          <div>
            <h1 className="font-semibold text-gray-900">{username}</h1>
            <p className="text-gray-400 text-sm">{createdAt}</p>
          </div>
        </div>
        <button 
          className="bg-main font-semibold text-white cursor-pointer rounded-3xl px-3 py-2 hover:bg-blue-600 transition-colors text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>


      <p className="my-3 whitespace-pre-wrap text-gray-800">{content}</p>


      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 text-gray-600">
          <MdShare /> {sharesCount}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-600 text-gray-600">
            <FiHeart /> {likesCount}
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-green-600 text-gray-600"
            onClick={(e) => handleActionClick(e, 'comment')}
          >
            <MdComment /> {commentsCount}
          </div>
        </div>
      </div>
    </div>
  );
}