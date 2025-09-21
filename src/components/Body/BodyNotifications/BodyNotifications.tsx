import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchNotifications, markAllAsRead, markNotificationAsRead } from "../../../redux/slices/notificationSlice";
import Loader from "../../Loader/Loader";

export default function BodyNotifications() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: notifications, loading, error } = useSelector(
    (state: RootState) => state.notifications
  );

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (userId) {
      dispatch(fetchNotifications(userId));
    }
  }, [dispatch, userId]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-8">
      <div className="flex justify-between text-gray-400 my-8">
        <h1>Show All</h1>
          <button
    onClick={() => dispatch(markAllAsRead())}
    className="text-gray-400 cursor-pointer hover:underline"
  >
    Mark all as read
  </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-center">No notifications found</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className="border-2 border-gray-100 p-4 rounded-sm my-3 flex justify-between items-center"
          >
            {/* left side */}
            <div className="flex gap-3">
              <img
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
                className="size-10 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
              />
              <div className="flex flex-col">
                <div className="flex gap-2 flex-wrap">
                  <h1 className="font-medium">User {n.user_id}</h1>
                  <p className="text-gray-500">{n.text}</p>
                </div>
                <p className="text-gray-400 text-sm">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {/* right side */}
            {n.read ? (
              <span className="bg-green-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                Read
              </span>
            ) : (
              <button
                onClick={() => dispatch(markNotificationAsRead(n.id))}
                className="bg-gray-200 hover:bg-green-500 cursor-pointer hover:text-white text-xs font-semibold px-4 py-1 rounded-full transition"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
