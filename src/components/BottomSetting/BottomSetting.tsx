import { MdKeyboardArrowRight } from "react-icons/md";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { motion } from "framer-motion";

export default function BottomSetting() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mx-8">
      {/* Privacy Policy Section */}
      <div className="flex justify-between items-center my-7 mx-3">
        <div>
          <h1 className="font-semibold text-lg">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Protect your privacy</p>
        </div>
        <MdKeyboardArrowRight className="text-gray-400 border-2 rounded-full border-gray-300 p-1 text-3xl" />
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch(logout())}
        className="w-full mt-6 rounded-lg border-2 border-green-200 bg-green-100 py-3 font-semibold text-main transition-colors hover:bg-green-200 hover:text-green-700"
      >
        Log out
      </motion.button>
    </div>
  );
}
