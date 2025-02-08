import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async({user} : {user : User}) => {

  if(!user) return null;
  
  const requests = await prisma.followRequest.findMany({
    where:{
      receiverId : user.id,
    },
    include:{
      sender: true,
    },
  });

  if(requests.length == 0) return null;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* ṬOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500">
          See All
        </Link>
      </div>
      {/* USER */}
      <FriendRequestList requests={requests} />
    </div>
  );
};

export default FriendRequests;
