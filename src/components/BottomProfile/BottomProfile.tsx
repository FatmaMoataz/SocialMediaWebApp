import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import Loader from "../Loader/Loader";
import { MdThumbUp, MdComment, MdShare } from "react-icons/md";


export default function BottomProfile() {
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

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

              {/* Post Stats */}
              <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <div className="flex gap-4">
                  <span className="flex items-center gap-2"><MdThumbUp/> {post.likes_count}</span>
                  <span className="flex items-center gap-2"><MdComment/> {post.comments_count}</span>
                  <span className="flex items-center gap-2"><MdShare/> {post.shares_count}</span>
                </div>
                <span className="text-xs">
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
