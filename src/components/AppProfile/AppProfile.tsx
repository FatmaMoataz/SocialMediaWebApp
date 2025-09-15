import { MdKeyboardArrowLeft, MdEdit } from "react-icons/md";
import { useState } from "react";
import EditProfileModal from "../../EditProfileModal/EditProfileModal";

export default function AppProfile() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-between items-center mx-8 py-4">
      {/* Back Button */}
      <MdKeyboardArrowLeft
        className="text-white cursor-pointer bg-main border-2 rounded-sm p-1 text-4xl"
      />

      <h1 className="text-3xl font-bold">Profile</h1>

      {/* Edit Button */}
      <div className="flex gap-4">
        <MdEdit
          className="text-gray-700 cursor-pointer text-3xl"
          onClick={() => setOpenModal(true)}
        />
      </div>

      {/* Modal */}
      {openModal && <EditProfileModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}
