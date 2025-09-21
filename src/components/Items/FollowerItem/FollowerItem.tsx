import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type{ RootState } from "../../../redux/store";
import { followUser, unfollowUser } from "../../../redux/slices/followSlice";

interface Follower {
  follower_id: number;
}

interface UserData {
  name: string;
  email: string;
}

export function FollowerItem({ follower }: { follower: Follower }) {
  const dispatch = useDispatch();
  const { isProcessing } = useSelector((state: RootState) => state.follow);

  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "Loading...",
    email: "Loading...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/check-follow?receiver_id=${follower.follower_id}&sender_id=1`
        );
        if (res.ok) {
          const data = await res.json();
          setIsFollowing(data.isFollowing);
        }
      } catch (err) {
        console.error("Error checking follow status:", err);
      }
    };

    checkFollowing();
  }, [follower.follower_id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/get-user_data?user_id=${follower.follower_id}`
        );

        if (response.ok) {
          const userDetailsArray = await response.json();
          if (userDetailsArray && userDetailsArray.length > 0) {
            const userDetails = userDetailsArray[0];
            setUserData({
              name: userDetails.name || "User",
              email: userDetails.email || "No email available",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [follower.follower_id]);

  const handleFollowToggle = () => {
    const senderId = 1;
    const receiverId = follower.follower_id;

    if (isFollowing) {
      dispatch(unfollowUser({ senderId, receiverId }) as any);
      setIsFollowing(false);
    } else {
      dispatch(followUser({ senderId, receiverId }) as any);
      setIsFollowing(true);
    }
  };

  if (loading) {
    return (
      <div className="mx-8 flex justify-between my-5">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="size-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="mx-8 flex justify-between my-5">
      <div className="flex items-center gap-2 overflow-hidden">
        <img
          src={`https://i.pravatar.cc/150?u=${follower.follower_id}`}
          alt="profile"
          className="size-12 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
        />
        <div>
          <h1 className="font-semibold">{userData.name}</h1>
          <p className="text-gray-400">@{userData.email.split("@")[0]}</p>
        </div>
      </div>
      <button
        disabled={isProcessing}
        className={`${
          isFollowing
            ? "border-2 border-gray-100 text-gray-700"
            : "text-white bg-main"
        } rounded-full px-5 py-1 cursor-pointer transition-colors`}
        onClick={handleFollowToggle}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}
