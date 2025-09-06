import { MdKeyboardArrowRight } from "react-icons/md";

export default function AppSetting() {
  return (
    <>
<div className="flex justify-between mx-8">
        <div className="flex items-center gap-2 overflow-hidden">
  <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full ring-2 ring-white border-green-500 p-1 border-2 outline -outline-offset-1 outline-black/5" />
<div className="user-info">
      <h1 className=' font-semibold'>Marselin Nor</h1>
  <p className='text-gray-400'>@marselin.nor</p>
</div>
</div>
    <div className="flex items-center gap-4">
      <MdKeyboardArrowRight className="text-gray-400 border-2 rounded-full border-gray-300 p-1 text-3xl" />
    </div>
</div>
    </>
  )
}
