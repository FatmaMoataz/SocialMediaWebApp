import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

interface AppFollowingProps {
  userId?: string;
}

export default function AppFollowing({ userId }: AppFollowingProps) {
  const navigate = useNavigate();
  const params = useParams();

  const handleBack = () => {
    // Navigate back to the user's profile or settings page
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      navigate('/setting');
    }
  };

  return (
    <div className="mx-8">
      <MdKeyboardArrowLeft
        className="text-white cursor-pointer bg-main border-2 rounded-sm p-1 text-4xl"
        onClick={handleBack}
      />
      <h1 className="text-3xl text-center">Following</h1>
      {userId && (
        <p className="text-center text-gray-500 text-sm">
          User ID: {userId}
        </p>
      )}
    </div> 
  );
}