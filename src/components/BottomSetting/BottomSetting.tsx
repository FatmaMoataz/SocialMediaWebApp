import { MdKeyboardArrowRight } from "react-icons/md"

export default function BottomSetting() {
  return (
    <div className='mx-8'>
       <div className="flex justify-between my-7 mx-11">
        <div className="title">
        <h1 className="font-semibold">Privacy Policy</h1>
        <p className="text-gray-400">Protect your privacy</p>
        </div>
            <div className="flex items-center gap-4">
              <MdKeyboardArrowRight className="text-gray-400 border-2 rounded-full border-gray-300 p-1 text-3xl" />
            </div>
         </div>
    <button className="text-main border-2 w-full py-3 border-green-200 bg-green-100 font-semibold">Log out</button>
    </div>
  )
}
