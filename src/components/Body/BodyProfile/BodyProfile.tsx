import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { getUserData } from "../../../redux/slices/userSlice";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { fetchUserPosts } from "../../../redux/slices/postsSlice";
import { fetchUserFollowers } from "../../../redux/slices/followersSlice";
import { fetchUserFollowing } from "../../../redux/slices/followingSlice";

type Info = {
  num: string | number;
  title: string;
};

interface BodyProfileProps {
  userId?: number;
}

export default function BodyProfile({ userId }: BodyProfileProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Local state to handle userId from localStorage
  const [id, setId] = useState<number | null>(userId ?? null);

  const {
    data: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useSelector((state: RootState) => state.posts);

  const {
    followers,
    loading: followersLoading,
    error: followersError,
  } = useSelector((state: RootState) => state.followers);

  const {
    following,
    loading: followingLoading,
    error: followingError,
  } = useSelector((state: RootState) => state.following);

  // If userId not passed, try to load from localStorage
  useEffect(() => {
    if (!userId) {
      const storedId = localStorage.getItem("userId");
      if (storedId) {
        setId(Number(storedId));
      }
    }
  }, [userId]);

  // Fetch all data when we have an id
  useEffect(() => {
    if (id) {
      dispatch(fetchUserPosts(id));
      dispatch(fetchUserFollowers(id));
      dispatch(fetchUserFollowing(id));
      dispatch(getUserData(id))
        .unwrap()
        .then((userData) => {
          console.log("User data fetched:", userData);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [dispatch, id]);

  const infos: Info[] = [
    { num: postsLoading ? "..." : postsError ? 0 : posts.length, title: "Post" },
    {
      num: followersLoading ? "..." : followersError ? 0 : followers.length,
      title: "Followers",
    },
    {
      num: followingLoading ? "..." : followingError ? 0 : following.length,
      title: "Following",
    },
  ];

  // Show loader until we have an id
  if (!id) {
    return <Loader />;
  }

  return (
    <div className="mx-8 text-center py-10">
      <div className="flex justify-center flex-col items-center gap-2 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="profile"
          className="size-17 rounded-full ring-2 ring-white border-green-500 p-1 border-2 outline -outline-offset-1 outline-black/5"
        />
        <div className="user-info">
          {loading ? (
            <Loader />
          ) : error ? (
            <h1 className="text-red-500">{error}</h1>
          ) : (
            <>
              <h1 className="font-semibold text-xl">
                {user?.name || "Guest User"}
              </h1>
              <p className="text-gray-400">{user?.email || "No email"}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-around my-3">
        {infos.map((info, index) => (
          <div
            key={index}
            className="border-2 border-gray-300 px-5 py-3 rounded-xl text-center mt-6 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              if (info.title === "Post") navigate(`/posts/${id}`);
              else if (info.title === "Followers") navigate(`/followers/${id}`);
              else if (info.title === "Following") navigate(`/following/${id}`);
            }}
          >
            <h1 className="text-3xl">{info.num}</h1>
            <p className="text-gray-400">{info.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
