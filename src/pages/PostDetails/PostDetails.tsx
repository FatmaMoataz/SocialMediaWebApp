import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import type{ TimelinePost } from "../../redux/slices/timelineSlice";
import { fetchPostComments, addComment, clearComments } from "../../redux/slices/commentSlice";
import Loader from "../../components/Loader/Loader";
import { FiHeart, FiSend } from "react-icons/fi";
import { MdComment, MdKeyboardArrowLeft, MdShare } from "react-icons/md";

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { posts } = useSelector((state: RootState) => state.timeline);
  const { comments, loading: commentsLoading } = useSelector((state: RootState) => state.comments);
  const currentUser = useSelector((state: RootState) => state.user.data);
  
  const [post, setPost] = useState<TimelinePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (postId) {
      const foundPost = posts.find(p => p.id === parseInt(postId));
      if (foundPost) {
        setPost(foundPost);
        // Fetch comments for this post
        dispatch(fetchPostComments(parseInt(postId)));
      }
      setLoading(false);
    }

    // Cleanup: clear comments when leaving the page
    return () => {
      dispatch(clearComments());
    };
  }, [postId, posts, dispatch]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !postId || !currentUser) return;

    setIsSubmitting(true);
    try {
      await dispatch(addComment({
        postId: parseInt(postId),
        text: newComment,
        userId: currentUser.id
      })).unwrap();
      setNewComment("");
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikePost = () => {
    // Implement like functionality here
    console.log('Like post:', postId);
  };

  const handleSharePost = () => {
    // Implement share functionality here
    console.log('Share post:', postId);
  };

  if (loading) return <Loader />;
  if (!post) return <div className="text-center p-8">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Back Button */}
           <MdKeyboardArrowLeft
            onClick={() => navigate(-1)}
              className="text-white cursor-pointer bg-main mb-5 border-2 rounded-sm p-1 text-4xl"
            />

      {/* Post Content */}
      <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
        {/* User Info */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h1 className="font-semibold text-xl">{post.username}</h1>
            <p className="text-gray-400 text-sm">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
          <button className="bg-main font-semibold text-white cursor-pointer rounded-3xl px-4 py-2 hover:bg-blue-600 transition-colors">
            Follow
          </button>
        </div>

        {/* Post Content */}
        <p className="text-lg my-4 whitespace-pre-wrap">{post.text}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 text-gray-600 pt-4">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{post.likes_count}</span> Likes
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{post.comments_count}</span> Comments
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{post.shares_count}</span> Shares
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 mt-4 pt-4">
          <button 
            onClick={handleLikePost}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <FiHeart size={20} /> Like
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
            <MdComment size={20} /> Comment
          </button>
          <button 
            onClick={handleSharePost}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <MdShare size={20} /> Share
          </button>
        </div>
      </div>

      {/* Add Comment Section */}
      {currentUser && (
        <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
          <form onSubmit={handleAddComment} className="flex gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="bg-main text-white rounded-full p-2 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Comments Section */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>

        {commentsLoading ? (
          <Loader />
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <MdComment size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No comments yet</p>
            <p className="text-gray-400 text-sm">Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{comment.username}</h3>
                    <p className="text-gray-400 text-xs">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <FiHeart size={16} />
                  </button>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{comment.text}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>{comment.likes_count} likes</span>
                  <button className="hover:text-gray-700 transition-colors">Reply</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}