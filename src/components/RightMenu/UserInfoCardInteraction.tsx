"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";
import { useRouter } from "next/navigation";

const UserInfoCardInteraction = ({
  userId,
  currentUserID,
  isUserBlocked,
  isFollowing,
  isFollowReqSent,
}: {
  userId: string;
  currentUserID: string;
  isUserBlocked: Boolean;
  isFollowing: Boolean;
  isFollowReqSent: Boolean;
}) => {
  
  const router = useRouter();
  const [userData, setUserData] = useState({
    userBlocked: isUserBlocked,
    following: isFollowing,
    followReqSent: isFollowReqSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    await switchFollow({
      userId,
      currentUserID,
      isUserBlocked,
      isFollowing,
      isFollowReqSent,
    });
    setUserData((prev) => ({
      ...prev,
      following: prev.following && false,
      followReqSent: !prev.following && !prev.followReqSent ? true : false,
    }));
    // router.refresh();
  };

  const block = async () => {
    switchOptimisticState("block");
    await switchBlock({ userId, currentUserID, isUserBlocked });
    setUserData((prev) => ({
      ...prev,
      userBlocked: !prev.userBlocked,
    }));
    // router.refresh();
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userData,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followReqSent:
              !state.following && !state.followReqSent ? true : false,
          }
        : {
            ...state,
            userBlocked: !state.userBlocked,
          }
  );

  return (
    <>
      <form action={follow}>
        <button
          className="bg-blue-500 text-white 
            p-2 rounded-lg w-full"
        >
          {optimisticState.following
            ? "Following"
            : (optimisticState.followReqSent
            ? "Follow Request Sent"
            : "Follow")}
        </button>
      </form>
      <form action={block}>
        <div className="flex justify-end">
          <button className="text-red-500 cursor-pointer">
            {optimisticState.userBlocked ? "Unblock User" : "Block User"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
