import React from 'react'

const page = ({params} : {params : {username : string}}) => {
    const {username} = params;
    // console.log()
  return (
    <div className='w-full h-full'>{username}</div>
  )
}

export default page