import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { getUserData } from "../redux/slices/userSlice";

interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: user } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");

  const handleUpdate = async () => {
    try {

      console.log("Updating:", { name, email, image });

      const userId = localStorage.getItem("userId");
      if (userId) {
        dispatch(getUserData(Number(userId)));
      }

      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {/* Name */}
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Image */}
        <label className="block text-sm text-gray-600 mb-1">Profile Image URL</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 mb-5"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-main hover:bg-green-600 text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
