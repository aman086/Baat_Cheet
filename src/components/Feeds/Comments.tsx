// import Image from "next/image";
// import React from "react";
// import CommentList from "./CommentList";
// import { auth } from "@clerk/nextjs/server";
// import prisma from "@/lib/client";
// import { Comme } from "next/font/google";

// const Comments = async({postId} : {postId : string}) => {

//   const {userId} = await auth();
//   if(!userId) return null;
//   const userDetails = await prisma.user.findFirst({
//     where: {
//       clerkId: userId,
//     },
//   });

//   const comments = await prisma.comment.findMany({
//     where: {
//       postId: postId,
//     },
//     include: {
//       user: true,
//     },
//   });

//   return (
//     <div className="flex flex-col">
//       <CommentList comments={comments} postId={postId} />
//     </div>
//   );
// };

// export default Comments;






// ----------------------------------------------------------------------------------------------------------------------
// Newly Added Code after mySQL
// ----------------------------------------------------------------------------------------------------------------------


import Image from "next/image";
import React from "react";
import CommentList from "./CommentList";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Comments = async({postId} : {postId : string}) => {

  const {userId} = await auth();
  if(!userId) return null;


  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  if(!comments) return;

  return (
    <div className="flex flex-col">
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
