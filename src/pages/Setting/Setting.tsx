import { useSelector } from "react-redux";
import AppSetting from "../../components/AppSetting/AppSetting";
import BodySetting from "../../components/BodySetting/BodySetting";
import BottomSetting from "../../components/BottomSetting/BottomSetting";
import { motion } from "framer-motion";
import type { RootState } from "../../redux/store";
import { useEffect } from "react";

export default function Setting() {
  const user = useSelector((state: RootState) => state.auth.user);
  const authState = useSelector((state: RootState) => state.auth);
  const userId = user?.id; // Get the ID from the user object
  
  useEffect(() => {
    console.log("Auth state:", authState);
    console.log("User:", user);
    console.log("User ID:", userId);
  }, [authState, user, userId]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="my-5"
      >
        <AppSetting />
        <div className="flex-grow border-t border-gray-200 my-3"></div>
        {userId ? <BodySetting userId={userId} /> : <div>Loading user data...</div>}
        <div className="flex-grow border-t border-gray-200 my-3"></div>
        <BottomSetting />
      </motion.div>
    </>
  );
}