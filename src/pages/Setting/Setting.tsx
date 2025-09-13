import { useSelector } from 'react-redux';
import AppSetting from '../../components/AppSetting/AppSetting'
import BodySetting from '../../components/BodySetting/BodySetting'
import BottomSetting from '../../components/BottomSetting/BottomSetting'
import { motion } from "framer-motion"
import type { RootState } from '../../redux/store';

export default function Setting() {
  const userId = useSelector((state: RootState) => state.auth.userId);
  return (
    <>
    <motion.div
            initial={{ opacity: 0 }}     
        animate={{ opacity: 1}}     
        transition={{ duration: 0.9 }}  
    className='my-5'>
        <AppSetting/>
  <div className="flex-grow border-t border-gray-300 my-3"></div>
  <BodySetting userId={userId}/>
    <div className="flex-grow border-t border-gray-300 my-3"></div>
    <BottomSetting/>
    </motion.div>
    </>
  )
}
