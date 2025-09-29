import { MdSearch } from 'react-icons/md'

export default function AppNotifications() {
  return (
    <div className='mx-8'>
    <div className='flex justify-between items-center'>
            <img
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="profile"
          className="size-10 rounded-full ring-2 ring-white border-green-500 p-1 border-2 outline -outline-offset-1 outline-black/5"
        />
        <MdSearch size={28}/>
    </div>
    <h1 className='my-4 text-2xl font-semibold'>Notifications</h1>
    </div>
  )
}
