import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type{ TimelinePost } from "../../redux/slices/timelineSlice";
import Loader from "../../components/Loader/Loader";

import { FiHeart } from "react-icons/fi";
import { MdComment, MdKeyboardArrowLeft, MdShare } from "react-icons/md";

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { posts } = useSelector((state: RootState) => state.timeline);
  const [post, setPost] = useState<TimelinePost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      const foundPost = posts.find(p => p.id === parseInt(postId));
      if (foundPost) {
        setPost(foundPost);
      } else {
     
        fetchPostDetails();
      }
      setLoading(false);
    }
  }, [postId, posts]);

  const fetchPostDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-post/${postId}`);
      if (response.ok) {
        const postData = await response.json();
        setPost(postData);
      }
    } catch (error) {
      console.error('Failed to fetch post details:', error);
    }
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
      <div className="bg-white shadow-sm rounded-xl p-6">
        {/* User Info */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h1 className="font-semibold text-xl">{post.username}</h1>
            <p className="text-gray-400 text-sm">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
          <button className="bg-main font-semibold text-white cursor-pointer rounded-3xl px-4 py-2">
            Follow
          </button>
        </div>

        {/* Post Content */}
        <p className="text-lg my-4">{post.text}</p>

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
          <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
            <FiHeart /> Like
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
            <MdComment /> Comment
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <MdShare /> Share
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6 bg-white shadow-sm rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">Comments</h2>
        {/* Add comments component here */}
        <p className="text-gray-500 text-center">No comments yet</p>
      </div>
    </div>
  );
}
