// "use client"

import AddPhoto from "@/components/Feeds/AddPost"
import { Feed } from "@/components/Feeds/Feed"
import { LeftMenu } from "@/components/LeftMenu/LeftMenu"
import { RightMenu } from "@/components/RightMenu/RightMenu"
import Stories from "@/components/Stories"
import News from "./News/page"
import { auth, User } from "@clerk/nextjs/server"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { use } from "react"

const Homepage = async() => {

  // const {user} = useUser();
  // if(!user) return "User not found";
  // console.log("User in RIght menu -> " , user);
  // const [leftWindow, setLeftWindow] = useState("");
  const {userId} = await auth();
  console.log("User iD -> " , userId);
  // if(!userId) return "Please login - Homepage";
  
  return (
    <div className='flex gap-6 pt-6'>
      <div className="hidden xl:block w-[20%]"><LeftMenu type="home"/></div>
      {/* <div className="hidden xl:block w-[20%]"><LeftMenu type="home" setLeftWindow={setLeftWindow} /></div> */}
      {userId  && <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPhoto />
          <Feed />
        </div>
      </div>}
      {userId && <div className="hidden lg:block w-[30%]"><RightMenu userId ={userId} /></div>}
    </div>
  )
}

export default Homepage