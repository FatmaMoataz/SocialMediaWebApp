import { MdKeyboardArrowRight } from "react-icons/md";

type Info = {
    num:string,
    title:string
}

type Setting = {
    title: string,
    subtitle: string,
    notification?:number
}

export default function BodySetting() {

const infos: Info[] = [
    {
    num: '572',
    title: 'Post',
},
    {
    num: '6.3k',
    title: 'Followers',
},
    {
    num: '2.5k',
    title: 'Following',
},
]

const settings: Setting[] = [
    {
        title:'Notification',
        subtitle:'See your recent activity',
        notification:35
    },
        {
        title:'Friends',
        subtitle:'Friendlist totals',
    },
            {
        title:'Messages',
        subtitle:'Message your friends',
        notification:2
    },
                {
        title:'Albums',
        subtitle:'Save or post your albums',
    },
     {
        title:'Favorites',
        subtitle:'Friends you love',
    },
]
  return (
    <div className='mx-8'>
        <div className="flex justify-around my-3">
{
infos.map( info => {
    return (
            <div className="border-2 border-gray-300 px-5 py-3 rounded-xl text-center mt-6">
    <h1 className="text-3xl">{info.num}</h1>
    <p className="text-gray-400">{info.title}</p>
</div>
    )

})
}
        </div>
        <div>

     {
        settings.map( setting => {
            return (
             <div className="flex justify-between my-7 mx-11">
<div className="title">
<h1 className="font-semibold">{setting.title}</h1>
<p className="text-gray-400">{setting.subtitle}</p>
</div>
    <div className="flex items-center gap-4">
{
    setting.notification && (
        <span className="bg-main text-white rounded-full px-3 py-2">{setting.notification}</span>
    )
}
      <MdKeyboardArrowRight className="text-gray-400 border-2 rounded-full border-gray-300 p-1 text-3xl" />
    </div>
            </div>          
            )}
        )
     }
        </div>
    </div>
  )
}
