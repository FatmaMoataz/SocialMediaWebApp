import AppNotifications from '../../components/AppBars/AppNotifications/AppNotifications'
import BodyNotifications from '../../components/Body/BodyNotifications/BodyNotifications'
import { motion } from "framer-motion";

export default function Notifications() {
  return (
    <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="my-5">
        <AppNotifications/>
         <div className="flex-grow border-t border-gray-200 my-3"></div>
        <BodyNotifications/>
    </motion.div>
  )
}
