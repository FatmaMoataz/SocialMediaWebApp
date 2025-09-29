import AppFollowing from '../../components/AppBars/AppFollowing/AppFollowing'
import BodyFollowing from '../../components/Body/BodyFollowing/BodyFollowing';
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export default function Following() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <motion.div className='my-5'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
    >
       <div className='shadow-sm pb-5'> <AppFollowing userId={userId} /></div>
        <div className='m-11'><BodyFollowing /></div>
    </motion.div>
  )
}