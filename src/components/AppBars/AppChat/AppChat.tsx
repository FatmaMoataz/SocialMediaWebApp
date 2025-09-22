import { useEffect, useState } from "react";
import { MdPhone } from "react-icons/md";
import { useParams } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  last_active?: string; 
}

export default function AppChat() {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData>({
    name: "Loading...",
    email: "Loading...",
    last_active: new Date().toISOString(), 
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/get-user_data?user_id=${id}`
        );

        if (response.ok) {
          const userDetailsArray = await response.json();
          if (userDetailsArray && userDetailsArray.length > 0) {
            const userDetails = userDetailsArray[0];
            setUserData({
              name: userDetails.name || "User",
              email: userDetails.email || "No email available",
              last_active: new Date().toISOString(), 
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  return (

<div className="mx-8 flex justify-between items-center py-3">
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-green-500"></span>
<div>
        <h1 className="font-semibold">@{userData.name}</h1>
      <p className="text-gray-400 text-sm">
    Last active: {new Date().toLocaleString()}
  </p>
</div>
  </div>



  <MdPhone
    size={32}
    className="text-main rounded-2xl cursor-pointer bg-green-100 hover:bg-green-200 p-1.5 shadow-green-700"
  />
</div>

  );
}
