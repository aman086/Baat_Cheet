"use client";

import { acceptFollowReq, declineFollowReq } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: string, userId: string) => {
    removeOptimisticRequestState(requestId);
    try {
      await acceptFollowReq(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log("Error -> ", error);
    }
  };

  const decline = async (requestId: string, userId: string) => {
    removeOptimisticRequestState(requestId);
    try {
      await declineFollowReq(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log("Error -> ", error);
    }
  };

  const [OptimisticRequestState, removeOptimisticRequestState] = useOptimistic(
    requestState,
    (state, value: string) => state.filter((req) => req.id !== value)
  );

  return (
    <div className="flex flex-col gap-4">
      {OptimisticRequestState.map((request) => (
        <div className="flex justify-between items-center" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={()=> accept(request.id , request.sender.id)}>
              <button>
            <Image
              src="/accept.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 cursor-pointer"
              />
              </button>
            </form>
            <form action={()=> decline(request.id , request.sender.id)}>
              <button>
            <Image
              src="/reject.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 cursor-pointer"
              />
              </button>
              </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
