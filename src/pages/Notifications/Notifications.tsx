import AppNotifications from '../../components/AppBars/AppNotifications/AppNotifications'
import BodyNotifications from '../../components/Body/BodyNotifications/BodyNotifications'
import { motion } from "framer-motion";

export default function Notifications() {
  return (
    <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="my-5">
        <div className='shadow-sm pb-5'><AppNotifications/></div>
        <BodyNotifications/>
    </motion.div>
  )
}
