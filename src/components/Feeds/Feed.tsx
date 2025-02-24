// import React from "react";
// import Post from "./Post";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import prisma from "@/lib/client";

// export const Feed = async ({ username }: { username?: string }) => {
//   console.log("Feed & username -> ", username);
//   const { userId: userClerkId } = await auth();

//   if (!userClerkId) return null;
//   const user_Username = await prisma.user.findFirst({
//     where: {
//       username: username,
//     },
//   });

//   if (!user_Username) return null;
//   const userId = user_Username.id;
//   let posts: any[] = [];
//   if (username) {
//     posts = await prisma.post.findMany({
//       where: {
//         userId: userId,
//       },
//       include: {
//         user: true,
//         likes: {
//           select: {
//             userId: true,
//           },
//         },
//         _count: {
//           select: {
//             comments: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   }

//   console.log("userID -> ", userId);
//   if (!username && userId) {
//     // console.log("username nahi mila");
//     const following = await prisma.follower.findMany({
//       where: {
//         followingId: userId,
//       },
//       select: {
//         followerId: true,
//       },
//     });
   
//     const currentUser = await prisma.user.findFirst({
//       where:{
//         clerkId: userClerkId,
//       }
//     })
//     // console.log("following -> " , following);
//     if(!currentUser) return null;
//     const followingIds = following.map((f) => f.followerId);
//     const Ids = [currentUser.id, ...followingIds];
//     // console.log("followingIds -> " , followingIds);
//     posts = await prisma.post.findMany({
//       where: {
//         userId: {
//           in: Ids,
//         },
//       },
//       include: {
//         user: true,
//         likes: {
//           select: {
//             userId: true,
//           },
//         },
//         _count: {
//           select: {
//             comments: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   }

//   //  console.log("userName -> " + username);
//   //  console.log("Post -> " + posts);

//   return (
//     <div className="p-4 bg-white rounded-lg flex flex-col gap-12">
//       {posts?.length
//         ? posts.map((post) => <Post key={post.id} post={post} />)
//         : "No Post Found"}
//     </div>
//   );
// };





// ----------------------------------------------------------------------------------------------------------------------
// Newly Added Code after mySQL
// ----------------------------------------------------------------------------------------------------------------------


import React from "react";
import Post from "./Post";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

export const Feed = async ({ username }: { username?: string }) => {
  // console.log("Feed & username -> ", username);
  const { userId } = await auth();
  // console.log("user iD -> " , userId);
  if (!userId) return "NOt present";
  let posts: any[] = [];
  if (username) {
    const user_Username = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  
    if (!user_Username) return null;
    const user_userId = user_Username.id;
    posts = await prisma.post.findMany({
      where: {
        userId: user_userId,
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log("Post -> " , posts);
  }

  if (!username && userId) {
    // console.log("username nahi mila");
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });
   
    // const currentUser = await prisma.user.findFirst({
    //   where:{
    //     clerkId: userId,
    //   }
    // })
    // console.log("following -> " , following);
    if(!currentUser) return null;
    const followingIds = following.map((f) => f.followingId);
    const Ids = [userId, ...followingIds];
    // console.log("followingIds -> " , followingIds);
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: Ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  //  console.log("userName -> " + username);
  //  console.log("Total Post -> " + JSON.stringify(posts));

  return (
    <div className="p-4 bg-white rounded-lg flex flex-col gap-12">
      {posts?.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No Post Found"}
    </div>
  );
};

