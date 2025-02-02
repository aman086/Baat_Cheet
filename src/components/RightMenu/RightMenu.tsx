import React, { Suspense } from "react";
import Birthdays from "./RightMenu/Birthdays";
import FriendRequests from "./RightMenu/FriendRequests";
import Ad from "./Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";

export const RightMenu = ({ user }: { user: User }) => {
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
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};
