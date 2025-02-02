"use server"

import prisma from "./client"

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
                    const createUser = await prisma.followRequest.create({
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

// export const switchBlock = async({})

// userId = {user.id} currentUserId = {currentUserID} isUserBlocked={isUserBlocked} isFollowing={isFollowing} isFollowReqSent={isFollowReqSent}