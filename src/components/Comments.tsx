import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/16230720/pexels-photo-16230720/free-photo-of-the-london-eye-is-seen-from-the-river-thames.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
        />
        <div className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a Comment...."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 rounded-full cursor-pointer "
          />
        </div>
      </div>
      {/* ALL Posted COMMENTS */}
      <div>
        <div className="flex justify-between mt-6 gap-4">
            {/* AVATAR */}
            <Image
              src="https://images.pexels.com/photos/16230720/pexels-photo-16230720/free-photo-of-the-london-eye-is-seen-from-the-river-thames.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
        />
            {/* Comment Description */}
            <div className="flex flex-1 flex-col gap-2 text-sm">
              <span className="font-medium">Aman Tiwari</span>
              <p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, quo quibusdam itaque repellendus in fugit ad, voluptate, sapiente blanditiis aliquid delectus eos! Eveniet neque eligendi ad? Quod commodi eum harum.</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                    <Image src="/like.png" alt="" width={12} height={12} className="h-3 w-3 cursor-pointer" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">123 Likes</span>
                </div>
                <div className=""> Reply </div>
              </div>
            </div>
            {/* Options ICON */}
            <Image src="/more.png" alt="" width={16} height={16} className="cursor-pointer w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Comments;
