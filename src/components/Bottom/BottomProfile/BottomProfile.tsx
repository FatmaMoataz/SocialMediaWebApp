import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import Loader from "../Loader/Loader";
import { MdThumbUp, MdComment, MdShare, MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUserPosts } from "../../redux/slices/postsSlice";

export default function BottomProfile() {
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // get userId dynamically from localStorage
  const userId = Number(localStorage.getItem("userId"));

  const handleDelete = async () => {
    if (!selectedPost) return;
    try {
      setIsDeleting(true);

      // call delete API
      await axios.delete(
        `http://127.0.0.1:8000/delete-post?post_id=${selectedPost}`
      );

      toast.success("Post deleted successfully");
      setSelectedPost(null);

      // refresh posts for this user
      if (userId) {
        dispatch(fetchUserPosts(userId));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-6 my-8">
      <h2 className="text-2xl font-bold mb-6 text-left">Posts</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 text-left hover:shadow-lg transition"
            >
              {/* Post Content */}
              <p className="text-gray-800 text-lg">{post.text}</p>

              {/* Post Stats + Delete */}
              <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <div className="flex gap-4">
                  <span className="flex items-center gap-2">
                    <MdThumbUp /> {post.likes_count}
                  </span>
                  <span className="flex items-center gap-2">
                    <MdComment /> {post.comments_count}
                  </span>
                  <span className="flex items-center gap-2">
                    <MdShare /> {post.shares_count}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs">
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                  <button
                    onClick={() => setSelectedPost(post.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Delete Post?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={() => setSelectedPost(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
