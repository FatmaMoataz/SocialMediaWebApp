import { MdKeyboardArrowLeft, MdEdit  } from "react-icons/md";

export default function AppProfile() {
  return (
    <div className="flex justify-between mx-8">
            <MdKeyboardArrowLeft
              className="text-white cursor-pointer bg-main border-2 rounded-sm p-1 text-4xl"
            />
            <h1 className="text-3xl">Profile</h1>
              <div className="flex gap-4">
            <MdEdit className="text-gray-700 cursor-pointer text-3xl"/>
      </div>
    </div> 
  )
}
