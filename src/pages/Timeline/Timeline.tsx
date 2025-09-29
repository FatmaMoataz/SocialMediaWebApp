import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchTimelinePosts } from "../../redux/slices/timelineSlice";
import AppTimeline from "../../components/AppBars/AppTimeline/AppTimeline";
import BodyTimeline from "../../components/Body/BodyTimeline/BodyTimeline";
import Loader from "../../components/Loader/Loader";

export default function Timeline() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.timeline);

  useEffect(() => {
    dispatch(fetchTimelinePosts());
  }, [dispatch]);

  return (
    <>
      <div className="shadow-sm pb-0.5">
        <AppTimeline />
      </div>

      {loading && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {posts.map((post) => (
        <BodyTimeline
          key={post.id}
          post_id={post.id}
          username={post.username}
          createdAt={new Date(post.created_at).toLocaleString()}
          content={post.text}
          sharesCount={post.shares_count}
          likesCount={post.likes_count}
          commentsCount={post.comments_count}
          isFollowing={false}
        />
      ))}
    </>
  );
}