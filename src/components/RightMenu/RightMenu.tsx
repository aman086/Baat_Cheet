import React, { Suspense } from "react";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import Ad from "../Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

export const RightMenu = async({ userId }: { userId: string }) => {

  const {userId : currentUserId} = await auth();
  if(!currentUserId) return null;

  const user = await prisma.user.findFirst({
    where:{
      id : userId,
    },
  });
  if(!user) return null;
  return (
    <div className="flex flex-col gap-6">
      {userId && (
        <>
          <Suspense fallback="Loading......">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading......">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      )}
      {currentUserId === user.id &&  <FriendRequests user={user} />}
      {currentUserId === user.id &&  <Birthdays />}
      
      {/* <Ad size="md" /> */}
    </div>
  );
};
