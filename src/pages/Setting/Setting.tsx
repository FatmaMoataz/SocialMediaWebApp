import AppSetting from '../../components/AppSetting/AppSetting'
import BodySetting from '../../components/BodySetting/BodySetting'
import BottomSetting from '../../components/BottomSetting/BottomSetting'
import { motion } from "framer-motion"


export default function Setting() {
  return (
    <>
    <motion.div
            initial={{ opacity: 0 }}     
        animate={{ opacity: 1}}     
        transition={{ duration: 0.9 }}  
    className='my-5'>
        <AppSetting/>
  <div className="flex-grow border-t border-gray-300 my-3"></div>
  <BodySetting/>
    <div className="flex-grow border-t border-gray-300 my-3"></div>
    <BottomSetting/>
    </motion.div>
    </>
  )
}
