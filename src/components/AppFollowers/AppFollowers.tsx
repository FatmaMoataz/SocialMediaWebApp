import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AppFollowers() {

const navigate = useNavigate()

  return (

    <div className="mx-8">
            <MdKeyboardArrowLeft
              className="text-white cursor-pointer bg-main border-2 rounded-sm p-1 text-4xl"
              onClick={() => navigate('/setting')}
            />
            <h1 className="text-3xl text-center">Followers</h1>
    </div> 


  )
}
