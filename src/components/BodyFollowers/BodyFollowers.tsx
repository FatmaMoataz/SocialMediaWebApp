import { useEffect, useState } from "react";
import { FollowerItem } from "../FollowerItem/FollowerItem";


export default function BodyFollowers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/get-followers?user_id=1');
        
        if (!response.ok) {
          throw new Error('Failed to fetch followers');
        }
        
        const data = await response.json();
        setFollowers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      {followers.length > 0 ? (
        followers.map(follower => (
          <FollowerItem key={follower.follower_id} follower={follower} />
        ))
      ) : (
        <div className="text-center p-8 text-gray-500">
          No followers found
        </div>
      )}
    </div>
  );
}
