import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendRequests = () => {
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/29677343/pexels-photo-29677343/free-photo-of-rural-life-in-hoi-an-s-rice-fields-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Aman Tiwari</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image
            src="/accept.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 cursor-pointer"
          />
          <Image
            src="/reject.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/29677343/pexels-photo-29677343/free-photo-of-rural-life-in-hoi-an-s-rice-fields-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Aman Tiwari</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image
            src="/accept.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 cursor-pointer"
          />
          <Image
            src="/reject.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/29677343/pexels-photo-29677343/free-photo-of-rural-life-in-hoi-an-s-rice-fields-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Aman Tiwari</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image
            src="/accept.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 cursor-pointer"
          />
          <Image
            src="/reject.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
