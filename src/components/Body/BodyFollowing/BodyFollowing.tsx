import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { fetchUserFollowing } from '../../../redux/slices/followingSlice';
import { FollowingItem } from '../../Items/FollowingItem/FollowingItem';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function BodyFollowing() {
  const dispatch = useDispatch();
  const { following, loading, error } = useSelector((state: RootState) => state.following);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      const numericUserId = parseInt(userId, 10);
      if (!isNaN(numericUserId)) {
        dispatch(fetchUserFollowing(numericUserId) as any);
      }
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div className="mx-8">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex justify-between my-5">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="size-12 rounded-full bg-gray-200 animate-pulse"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-8 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      {following.length === 0 ? (
        <div className="mx-8 text-center text-gray-500">
          You are not following anyone yet.
        </div>
      ) : (
        following.map((followingItem) => (
          <FollowingItem key={followingItem.following_id} following={followingItem} />
        ))
      )}
    </div>
  );
}