// "use client"

import AddPhoto from "@/components/Feeds/AddPost"
import { Feed } from "@/components/Feeds/Feed"
import { LeftMenu } from "@/components/LeftMenu/LeftMenu"
import { RightMenu } from "@/components/RightMenu/RightMenu"
import Stories from "@/components/Stories"
import News from "./News/page"
import { User } from "@clerk/nextjs/server"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"

const Homepage = () => {

  // const {user} = useUser();
  // const [leftWindow, setLeftWindow] = useState("");

  
  return (
    <div className='flex gap-6 pt-6'>
      <div className="hidden xl:block w-[20%]"><LeftMenu type="home"/></div>
      {/* <div className="hidden xl:block w-[20%]"><LeftMenu type="home" setLeftWindow={setLeftWindow} /></div> */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        
        {/* {(leftWindow && leftWindow == "news") ? <News />
        : */}
        <div className="flex flex-col gap-6">
          {/* <Image src="/brandbird-Card.svg" alt="" width={1000} height={1000} /> */}
          <Stories />
          <AddPhoto />
          <Feed />
        </div>
        {/* } */}
      </div>
      {/* <div className="hidden lg:block w-[30%]"><RightMenu user={user} /></div> */}
    </div>
  )
}

export default Homepage