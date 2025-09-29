import AppProfile from "../../components/AppBars/AppProfile/AppProfile";
import BodyProfile from "../../components/Body/BodyProfile/BodyProfile";
import BottomProfile from "../../components/Bottom/BottomProfile/BottomProfile";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="my-5"
    >
      <div className="pb-5 shadow-sm"><AppProfile /></div>
      <div className="pb-5 shadow-sm"><BodyProfile /></div>
      <BottomProfile />
    </motion.div>
  );
}
