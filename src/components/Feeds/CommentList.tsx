"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
import { set } from "zod";

type commentWithUser = Comment & { user: User };
const CommentList = ({
  comments,
  postId,
}: {
  comments: commentWithUser[];
  postId: string;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");


   const add = async()=>{
    console.log("Adding Comment");
     if(!user || !desc) return;
     addOptimisticComment({
        id : Math.random().toString(),
        desc,
        postId,
        userId : user.id,
        user: {
            id: user.id,
            avatar: user.imageUrl || "/noAvatar.png",
            username: "Sending please wait...",
            clerkId : "",
            cover  : "",
            description: "",
            name: "",
            surname: "",
            city: "",
            work: "",
            school: "",
            website: "",
            createdAt : new Date(Date.now()),
            
     },
    });

     try {
        const createdComment = await addComment(postId , desc);
        if(!createdComment) return;
        setCommentState((prev) => [createdComment , ...prev]);
     } catch (error) {
        console.log(error);
     }
   }

  const [optimisticComments , addOptimisticComment] = useOptimistic(commentState , (state , value : commentWithUser)=>{
    return [...state , value];
  });
  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <form action={add} className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
            <input
              type="text"
              placeholder="Write a Comment...."
              className="bg-transparent outline-none flex-1"
              onChange={(e)=> setDesc(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4 rounded-full cursor-pointer "
              />
              </form>
        </div>
      )}
      <div>
        { optimisticComments.map((comment)=>(
 

        <div className="flex justify-between mt-6 gap-4" key={comment.id}>
          {/* AVATAR */}
          <Image
            src={comment.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          {/* Comment Description */}
          <div className="flex flex-1 flex-col gap-2 text-sm">
            <span className="font-medium">{(comment.user.name && comment.user.surname) ? comment.user.name + " " +  comment.user.surname : comment.user.username}</span>
            <p className="text-xs">
              {comment.desc}
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="h-3 w-3 cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">0 Likes</span>
              </div>
              <div className=""> Reply </div>
            </div>
          </div>
          {/* Options ICON */}
          <Image
            src="/more.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
        ))
}
      </div>
    </>
  );
};

export default CommentList;
