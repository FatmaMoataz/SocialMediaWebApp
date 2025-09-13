import AppProfile from "../../components/AppProfile/AppProfile";
import BodyProfile from "../../components/BodyProfile/BodyProfile";
import BottomProfile from "../../components/BottomProfile/BottomProfile";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div 
            initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
    className="my-5">
<AppProfile/>
  <div className="flex-grow border-t border-gray-300 my-3"></div>
<BodyProfile/>
  <div className="flex-grow border-t border-gray-300 my-3"></div>
<BottomProfile/>
    </motion.div>
  )
}
