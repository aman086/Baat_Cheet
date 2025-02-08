import React, { Suspense } from "react";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import Ad from "../Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

export const RightMenu = async({ user }: { user: User }) => {

  const {userId : currentUserClerkId} = await auth();
  if(!currentUserClerkId) return null;
  const currentUser = await prisma.user.findFirst({
    where:{
      clerkId:currentUserClerkId,
    }
  })
  if(!currentUser) return null;
  return (
    <div className="flex flex-col gap-6">
      {user && (
        <>
          <Suspense fallback="Loading......">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading......">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      )}
      {currentUser.id === user.id &&  <FriendRequests user={user} />}
      {currentUser.id === user.id &&  <Birthdays />}
      
      <Ad size="md" />
    </div>
  );
};
