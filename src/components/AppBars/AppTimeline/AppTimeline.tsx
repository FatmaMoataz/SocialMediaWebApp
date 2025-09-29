import { FiCamera, FiSearch } from "react-icons/fi"; 

export default function AppTimeline() {
  return (
       <div className='my-8 mx-11'>
    <div className='flex justify-between'>
      {/* Feather */}
      <FiCamera size={22}/>
      <FiSearch size={22}/>
    </div>
    <h1 className="text-2xl mt-5 font-semibold">Timeline</h1>
    </div>
  )
}
