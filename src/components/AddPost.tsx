import Image from 'next/image'
import React from 'react'

const AddPost = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md flex gap-4 justify-between text-sm'>
        {/* Avatar */}
      <Image src="https://images.pexels.com/photos/17181016/pexels-photo-17181016/free-photo-of-airplane-against-clouds.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' width={48} height={48} className='w-12 h-12 rounded-full object-cover' />
      {/* POST Details */}
        <div className=' flex-1'>
          {/* Text Input */}
          <div className='flex gap-4'>
            <textarea placeholder="What's on Your Mind" className='flex-1 bg-slate-100 rounded-lg p-2'/>
            <Image src="/emoji.png" alt='' width={20} height={20} className='w-5 h-5 cursor-pointer self-end' />
          </div>
          {/* POST Options */}
          <div className='flex items-center mt-4 gap-4 text-gray-400 flex-wrap'>
              <div className='flex items-center gap-2 cursor-pointer'>
                <Image src="/addImage.png" alt='' width={20} height={20} className='w-5 h-5' />
                Photo
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <Image src="/addVideo.png" alt='' width={20} height={20} className='w-5 h-5' />
                Video
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <Image src="/addevent.png" alt='' width={20} height={20} className='w-5 h-5' />
                Event
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <Image src="/poll.png" alt='' width={20} height={20} className='w-5 h-5' />
                Poll
              </div>
          </div>
        </div>
    </div>
  )
}

export default AddPost