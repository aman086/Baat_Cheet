// "use client"

// import { addPost } from '@/lib/actions';
// import prisma from '@/lib/client';
// import { useUser } from '@clerk/nextjs';
// import { auth, currentUser } from '@clerk/nextjs/server'
// import { CldUploadWidget } from 'next-cloudinary';
// import Image from 'next/image'
// import React, { useState } from 'react'


// const AddPost = () => {

  
//   const {user , isLoaded} = useUser();
//   const [desc , setDesc] = useState("");
//   const [img , setImg] = useState<any>("");
//   const [sending , setSending] = useState(false);
  
//   if(!isLoaded) return "Loading...";
//   if(!user) return "Please Sign In to Continue";
//   // console.log("User Information -> " , user);
//   const submitPost = async()=>{
//     if(!desc && !img) return null;
//     try {
//       const imgUrl = img.secure_url;
//       console.log(imgUrl);
//       console.log(desc);
//       const createdPost = await addPost(imgUrl , desc);
//       // console.log(createdPost);
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//     return;
//     // return createdPost;
//     // console.log(img.secure_url);
//   }

//   return (
//     <div className='p-4 bg-white rounded-lg shadow-md flex gap-4 justify-between text-sm'>
//         {/* Avatar */}
//       <Image src={user.imageUrl} alt='' width={48} height={48} className='w-12 h-12 rounded-full object-cover' />
//       {/* POST Details */}  
//         <div className=' flex-1'>
//           {/* Text Input */}
//           <form className='flex gap-4' action={(formData) => addPost(formData , img?.secure_url || "")}>
//             <textarea name='desc' placeholder="What's on Your Mind" className='flex-1 bg-slate-100 rounded-lg p-2' onChange={(e)=> setDesc(e.target.value)}/>
//             <Image src="/emoji.png" alt='' width={20} height={20} className='w-5 h-5 cursor-pointer self-end' />
//             <button>Send</button>
//           </form>
//           {/* POST Options */}
//           <div className='flex items-center mt-4 gap-4 text-gray-400 flex-wrap'>

//           <CldUploadWidget uploadPreset="Social" onSuccess={(result, {widget})=> {setImg(result.info); widget.close()}}>
//               {({ open }) => {
//                 return (
//                   <button className='flex items-center gap-2 cursor-pointer' onClick={() => open()}>
                  
//                 <Image src="/addImage.png" alt='' width={20} height={20} className='w-5 h-5' />
//                 Photo
//               {/* </div> */}

//                   </button>
//                 );
//               }}
//             </CldUploadWidget>
//               <div className='flex items-center gap-2 cursor-pointer'>
//                 <Image src="/addVideo.png" alt='' width={20} height={20} className='w-5 h-5' />
//                 Video
//               </div>
//               <div className='flex items-center gap-2 cursor-pointer'>
//                 <Image src="/addevent.png" alt='' width={20} height={20} className='w-5 h-5' />
//                 Event
//               </div>
//               <div className='flex items-center gap-2 cursor-pointer'>
//                 <Image src="/poll.png" alt='' width={20} height={20} className='w-5 h-5' />
//                 Poll
//               </div>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default AddPost





// ----------------------------------------------------------------------------------------------------------------------
// Newly Added Code after mySQL
// ----------------------------------------------------------------------------------------------------------------------




"use client"

import { addPost } from '@/lib/actions';
import prisma from '@/lib/client';
import { useUser } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server'
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image'
import React, { useState } from 'react'


const AddPost = () => {

  
  const {user , isLoaded} = useUser();
  const [desc , setDesc] = useState("");
  const [img , setImg] = useState<any>("");
  const [sending , setSending] = useState(false);
  
  if(!isLoaded) return "Loading...";
  if(!user) return "Please Sign In to Continue";
  // console.log("User Information -> " , user);
  // const submitPost = async()=>{
  //   if(!desc && !img) return null;
  //   try {
  //     const imgUrl = img.secure_url;
  //     console.log(imgUrl);
  //     console.log(desc);
  //     const createdPost = await addPost(imgUrl , desc);
  //     // console.log(createdPost);
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  //   return;
  //   // return createdPost;
  //   // console.log(img.secure_url);
  // }

  return (
    <div className='p-4 bg-white rounded-lg shadow-md flex gap-4 justify-between text-sm'>
        {/* Avatar */}
      <Image src={user.imageUrl} alt='' width={48} height={48} className='w-12 h-12 rounded-full object-cover' />
      {/* POST Details */}  
        <div className=' flex-1'>
          {/* Text Input */}
          <form className='flex gap-4' action={(formData) => addPost(formData , img?.secure_url || "")}>
            <textarea name='desc' placeholder="What's on Your Mind" className='flex-1 bg-slate-100 rounded-lg p-2' onChange={(e)=> setDesc(e.target.value)}/>
            <Image src="/emoji.png" alt='' width={20} height={20} className='w-5 h-5 cursor-pointer self-end' />
            <button>Send</button>
          </form>
          {/* POST Options */}
          <div className='flex items-center mt-4 gap-4 text-gray-400 flex-wrap'>

          <CldUploadWidget uploadPreset="Social" onSuccess={(result, {widget})=> {setImg(result.info); widget.close()}}>
              {({ open }) => {
                return (
                  <button className='flex items-center gap-2 cursor-pointer' onClick={() => open()}>
                  
                <Image src="/addImage.png" alt='' width={20} height={20} className='w-5 h-5' />
                Photo
              {/* </div> */}

                  </button>
                );
              }}
            </CldUploadWidget>
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