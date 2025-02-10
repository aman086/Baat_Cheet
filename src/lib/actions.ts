"use server"

import { auth } from "@clerk/nextjs/server";
import prisma from "./client"
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async({userId , currentUserID , isUserBlocked , isFollowing , isFollowReqSent} : {
    userId : string,
    currentUserID : string,
    isUserBlocked : Boolean,
    isFollowing : Boolean,
    isFollowReqSent : Boolean
})=>{
    if(!currentUserID || !userId) throw new Error("User not authenticated");

        try {
            const existingFollow = await prisma.follower.findFirst({
                where: {
                    followerId: currentUserID,
                    followingId: userId
                },
            });

            if(existingFollow){
                await prisma.follower.delete({
                    where:{
                        id: existingFollow.id,
                    }
                });
            }else{
                const existingFollowReq = await prisma.followRequest.findFirst({
                    where:{
                        senderId: currentUserID,
                        receiverId: userId
                    },
                });
                if(existingFollowReq){
                    await prisma.followRequest.delete({
                        where:{
                            id : existingFollowReq.id,
                        },
                    });
                }else{
                    await prisma.followRequest.create({
                        data:{
                            senderId: currentUserID,
                            receiverId : userId
                        },
                    });
                }
                
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("Something went Wrong");
        }

}

export const switchBlock = async({userId , currentUserID , isUserBlocked} : {
    userId : string,
    currentUserID : string,
    isUserBlocked : Boolean
})=>{
    try {
        const existingBlock = await prisma.block.findFirst({
            where: {
                blockerId: currentUserID,
                blockedId: userId
            },
        });

        if(existingBlock){
            await prisma.follower.delete({
                where:{
                    id: existingBlock.id,
                }
            });
        }else{
            await prisma.block.create({
                data:{
                    blockerId: currentUserID,
                    blockedId: userId
                },
            });
            
        }
        
    } catch (error) {
        console.log(error);
        throw new Error("Something went Wrong");
    }
}

export const acceptFollowReq = async(userId : string)=>{

    const {userId : currentUser_ClerkId} = await auth();
    if(!currentUser_ClerkId) return null;
    const currentUserFullDetails = await prisma.user.findFirst({
        where:{
            clerkId: currentUser_ClerkId,
        },
    });

    if(!currentUserFullDetails) return null;

    const existingFollowReq = await prisma.followRequest.findFirst({
        where:{
            senderId: userId,
            receiverId: currentUserFullDetails.id
        }
    });


    if(existingFollowReq){
        await prisma.followRequest.delete({
            where:{
                id : existingFollowReq.id,
            },
        });

        await prisma.follower.create({
            data:{
                followerId: currentUserFullDetails.id,
                followingId: userId
            },
        });
    }
}

export const declineFollowReq = async(userId : string)=>{

    const {userId : currentUser_ClerkId} = await auth();
    if(!currentUser_ClerkId) return null;
    const currentUserFullDetails = await prisma.user.findFirst({
        where:{
            clerkId: currentUser_ClerkId,
        },
    });

    if(!currentUserFullDetails) return null;

    const existingFollowReq = await prisma.followRequest.findFirst({
        where:{
            senderId: userId,
            receiverId: currentUserFullDetails.id
        }
    });

    if(existingFollowReq){
        await prisma.followRequest.delete({
            where:{
                id : existingFollowReq.id,
            },
        });
    }
}

export const UpdateUserDetails = async(prevState:{success: boolean , error: boolean} , payload: {formData : FormData , cover : string})=>{
    const {formData , cover} = payload;
    const fields = Object.fromEntries(formData);
    console.log(fields);
    
    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    );

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
    })

    const validateFields = Profile.safeParse({cover , ...filteredFields});
    if(!validateFields.success){
        console.log(validateFields.error.flatten().fieldErrors);
        return {success: false , error : true};
    }
    
    const {userId : CurrentUserClerkId} = await auth();
    if(!CurrentUserClerkId) return {success: false , error : true};

    const currentUserFullDetails = await prisma.user.findFirst({
        where:{
            clerkId: CurrentUserClerkId,
        },
    });

    if(!currentUserFullDetails?.id) return {success: false , error : true};

    try {
        await prisma.user.update({
            where:{
                id : currentUserFullDetails.id,
            },
            data: validateFields.data,
        })
        return {success: true , error : false};
    } catch (error) {
        console.log(error);
        return {success: false , error : true};
    }
}


export const switchLike = async({postId} : {postId : string})=>{
    const {userId : currentUserClerkId} = await auth();
    try {
        if (!currentUserClerkId) throw new Error("User not authenticated");
        if (!postId) throw new Error("Post ID is required");
        const userDetails = await prisma.user.findFirst({
            where:{
                clerkId: currentUserClerkId,
            },
        });

        if(!userDetails) return null;
        const currentUserId = userDetails.id;
        
        const existingLike = await prisma.like.findFirst({
            where:{
                userId: currentUserId,
                postId: postId,
            },
        });

        // console.log("existingLike -> " , existingLike);

        if(existingLike){
            await prisma.like.delete({
                where:{
                    id: existingLike.id,
                },
            });
        }
        else{
            // console.log("Current User ID -> " , currentUserId);
            // console.log("Post ID -> " , postId);

            await prisma.like.create({
                data:{
                    userId: currentUserId,
                    postId: postId
                },
            });
        }  
        
   } catch (error) {
    console.log(error);
    throw new Error("Something went Wrong");
   }
}


export const getUserId_FromClerkId = async(userId : string)=>{

    const getUser = await prisma.user.findFirst({
        where:{
            clerkId: userId,
        }
    });
    if(!getUser) return null;
    return getUser;
}

export const addComment = async(postId : string , desc : string)=>{
    const {userId : currentUserId} = await auth();
    if(!currentUserId) return null;
    try {
        const userDetails = await prisma.user.findFirst({
            where:{
                clerkId: currentUserId,
            },
        });
        if(!userDetails) return null;
        const createComment = await prisma.comment.create({
            data:{
                desc: desc,
                postId: postId,
                userId: userDetails.id
            },
            include:{
                user: true
            }
        });
        return createComment;
    } catch (error) {
        console.log(error);
        throw new Error("Something went Wrong");
    }
}

export const addPost = async(formData : FormData, imgUrl : string)=>{
    const desc = formData.get("desc") as string;
    const Desc = z.string().nonempty().min(1).max(255);
    const validateDesc = Desc.safeParse(desc);
    if(!validateDesc.success){
        console.log(validateDesc.error.flatten().fieldErrors);
        throw new Error("Description is required");
    }
   const {userId : currentUserId} = await auth();
    if(!currentUserId) return;
    try {
        const userDetails = await prisma.user.findFirst({
            where:{
                clerkId: currentUserId,
            },
        });
        if(!userDetails) return;
        const createPost = await prisma.post.create({
            data:{
                desc: validateDesc.data,
                userId: userDetails.id,
                img: imgUrl
            },
            include:{
                user: true
            }
        });
        // console.log("Created Post -> " , createPost);
        revalidatePath("/");
        // return;
    } catch (error) {
        console.log(error);
        throw new Error("Something went Wrong");
    }
}


export const addStory = async(imgUrl : string , userId : string)=>{

    try {
        const existingStory = await prisma.story.findFirst({
            where:{
                userId: userId,
            },
        });
        if(existingStory){
            await prisma.story.delete({
                where:{
                    id: existingStory.id,
                },
            });
        }
        
        const createStory = await prisma.story.create({
            data:{
                userId: userId,
                img: imgUrl,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            include:{
                user: true
            }
        });
        return createStory;
    } catch (error) {
        console.log(error);
        throw new Error("Something went Wrong");
    }
}


export const deletePost = async(postId : string)=>{
    const {userId : currentUserId} = await auth();
    if(!currentUserId) throw new Error("User not authenticated");
    try {
        const userDetails = await prisma.user.findFirst({
            where:{
                clerkId: currentUserId,
            },
        });
        if(!userDetails) return;
        await prisma.post.delete({
            where:{
                id: postId,
                userId : userDetails.id,
            },
        });
        revalidatePath("/");
    } catch (error) {
        console.log(error);
        throw new Error("Something went Wrong");
    }
}