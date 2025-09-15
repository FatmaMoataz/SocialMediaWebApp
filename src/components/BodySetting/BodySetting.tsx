import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { type RootState, type AppDispatch } from "../../redux/store";
import { fetchUserPosts } from "../../redux/slices/postsSlice";
import { fetchUserFollowers } from "../../redux/slices/followersSlice";
import { fetchUserFollowing } from "../../redux/slices/followingSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

type Info = {
  num: string | number,
  title: string
}

type Setting = {
  title: string,
  subtitle: string,
  notification?: number
}

interface BodySettingProps {
  userId?: number;
}

export default function BodySetting({ userId }: BodySettingProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const { posts, loading: postsLoading, error: postsError } = useSelector((state: RootState) => state.posts);
  const { followers, loading: followersLoading, error: followersError } = useSelector((state: RootState) => state.followers);
  const { following, loading: followingLoading, error: followingError } = useSelector((state: RootState) => state.following);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts(userId));
      dispatch(fetchUserFollowers(userId));
      dispatch(fetchUserFollowing(userId));
    }
  }, [dispatch, userId]);

  // Show loading state if userId is not available yet
  if (!userId) {
    return (
<Loader/>
    );
  }

  const infos: Info[] = [
    { num: postsLoading ? "..." : postsError ? 0 : posts.length, title: "Post" },
    { num: followersLoading ? "..." : followersError ? 0 : followers.length, title: "Followers" },
    { num: followingLoading ? "..." : followingError ? 0 : following.length, title: "Following" },
  ];

  const settings: Setting[] = [
    { title: "Notification", subtitle: "See your recent activity", notification: 35 },
    { title: "Friends", subtitle: "Friendlist totals" },
    { title: "Messages", subtitle: "Message your friends", notification: 2 },
    { title: "Albums", subtitle: "Save or post your albums" },
    { title: "Favorites", subtitle: "Friends you love" },
  ];

  return (
    <div className="mx-8">
      <div className="flex justify-around my-3">
        {infos.map((info, index) => (
          <div
            key={index}
            className="border-2 border-gray-300 px-5 py-3 rounded-xl text-center mt-6 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              if (info.title === "Post") navigate(`/posts/${userId}`);
              else if (info.title === "Followers") navigate(`/followers/${userId}`);
              else if (info.title === "Following") navigate(`/following/${userId}`);
            }}
          >
            <h1 className="text-3xl">{info.num}</h1>
            <p className="text-gray-400">{info.title}</p>
          </div>
        ))}
      </div>

      <div>
        {settings.map((setting, index) => (
          <div key={index} className="flex justify-between my-7 mx-11">
            <div className="title">
              <h1 className="font-semibold">{setting.title}</h1>
              <p className="text-gray-400">{setting.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              {setting.notification && (
                <span className="bg-main text-white rounded-full px-3 py-2">
                  {setting.notification}
                </span>
              )}
              <MdKeyboardArrowRight className="text-gray-400 border-2 rounded-full border-gray-300 p-1 text-3xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}