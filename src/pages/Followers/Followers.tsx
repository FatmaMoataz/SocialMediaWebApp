import AppFollowers from '../../components/AppFollowers/AppFollowers'
import BodyFollowers from '../../components/BodyFollowers/BodyFollowers'
import { motion } from "framer-motion";

export default function Followers() {

  return (
    <motion.div className='my-5'
                initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
    >
        <AppFollowers/>
          <div className="flex-grow border-t border-gray-300 my-3"></div>
<BodyFollowers />
    </motion.div>
  )
}
