import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { getUserData } from "../../redux/slices/userSlice";
import Loader from "../Loader/Loader";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AppSetting() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("User ID from localStorage:", userId);
    if (userId) {
      dispatch(getUserData(userId))
        .unwrap()
        .then((userData) => {
          console.log("User data fetched:", userData);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [dispatch]);

  return (
    <div className="flex justify-between mx-8">
      <div className="flex items-center gap-2 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="profile"
          className="size-10 rounded-full ring-2 ring-white border-green-500 p-1 border-2 outline -outline-offset-1 outline-black/5"
        />
        <div className="user-info">
          {loading ? (
            <Loader />
          ) : error ? (
            <h1 className="text-red-500">{error}</h1>
          ) : (
            <>
              <h1 className="font-semibold">{user?.name || "Guest User"}</h1>
              <p className="text-gray-400">@{user?.email || "No email"}</p>
            </>
          )}
        </div>
      </div>
      <MdKeyboardArrowRight
        onClick={handleNavigate}
        className="text-gray-400 cursor-pointer border-2 rounded-full border-gray-300 p-1 text-3xl"
      />
    </div>
  );
}
