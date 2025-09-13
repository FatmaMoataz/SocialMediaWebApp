// import Loader from "../Loader/Loader";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../../redux/store";
// import { useNavigate } from "react-router-dom";


export default function BodyFollowers() {
  //   const dispatch = useDispatch<AppDispatch>();
  // const {
  //   data: user,
  //   loading,
  //   error,
  // } = useSelector((state: RootState) => state.user);
  // const navigate = useNavigate();

  return (
    <>
    <div className="mx-8 flex justify-between my-5">
         <div className="flex items-center gap-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
                className="size-12 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
              />
              <div className="">
                      <h1 className="font-semibold">{"Guest User"}</h1>
                    <p className="text-gray-400">@{"No email"}</p>

              </div>

            </div>
       <button className="text-white bg-main rounded-full px-5 cursor-pointer">Follow</button>
      </div>
  <div className="flex-grow border-t border-gray-100 my-3"></div>
          <div className="mx-8 flex justify-between my-5">
         <div className="flex items-center gap-2 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
                className="size-12 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5"
              />
              <div className="">
                      <h1 className="font-semibold">{"Guest User"}</h1>
                    <p className="text-gray-400">@{"No email"}</p>

              </div>

            </div>
       <button className="border-2 border-gray-100 rounded-full px-5 cursor-pointer">Following</button>
      </div>
</>
  )
}
