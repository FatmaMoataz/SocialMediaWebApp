import AppChat from '../../components/AppBars/AppChat/AppChat'
import BodyChat from '../../components/Body/BodyChat/BodyChat'
import { motion } from 'framer-motion'
import BottomChat from '../../components/Bottom/BottomChat/BottomChat'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'

export default function Chat() {

  const user = useSelector((state: RootState) => state.auth.user);
  
  const userId = user?.id;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="flex flex-col h-screen"
    >

      <div className='border-b-2 border-b-gray-50'><AppChat /></div>


      <div className="flex-grow overflow-auto">
        <BodyChat />
      </div>

  
      <div className='border-t-2 pt-3 border-t-gray-50'><BottomChat userId={userId} /></div>
    </motion.div>
  )
}
