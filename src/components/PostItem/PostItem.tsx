import { useState } from "react";
import axios from "axios";
import { MdFavorite, MdModeComment, MdShare, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

export default function PostItem({ post, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(`http://127.0.0.1:8000/delete-post?post_id=${post.id}`);
      toast.success("✅ Post deleted successfully");
      setShowModal(false);
  
      if (onDelete) onDelete(post.id);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
      {/* User Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800">{post.user_name}</h2>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
        <div className="flex gap-2">
          <button className="text-gray-600 hover:text-blue-500">
            <MdEdit size={20} />
          </button>
          <button 
            className="text-gray-600 hover:text-red-500"
            onClick={() => setShowModal(true)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-700">{post.content}</p>

      {/* Actions */}
      <div className="flex justify-around mt-4 text-gray-600">
        <button className="hover:text-red-500 flex items-center gap-1">
          <MdFavorite size={20} /> Like
        </button>
        <button className="hover:text-blue-500 flex items-center gap-1">
          <MdModeComment size={20} /> Comment
        </button>
        <button className="hover:text-green-500 flex items-center gap-1">
          <MdShare size={20} /> Share
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Delete Post?</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={() => setShowModal(false)}
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
