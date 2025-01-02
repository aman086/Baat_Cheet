import React from 'react'
import Birthdays from './Birthdays'
import FriendRequests from './FriendRequests'
import Ad from './Ad'
import UserInfoCard from './UserInfoCard'
import UserMediaCard from './UserMediaCard'

export const RightMenu = ({userID} : {userID : string}) => {
  return (
    <div className='flex flex-col gap-6'>
      {userID != '' && (<>
        <UserInfoCard />
        <UserMediaCard />
      </>)}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  )
}
