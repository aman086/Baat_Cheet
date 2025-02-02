import AddPhoto from "@/components/Feeds/AddPost"
import { Feed } from "@/components/Feeds/Feed"
import { LeftMenu } from "@/components/LeftMenu/LeftMenu"
import { RightMenu } from "@/components/RightMenu"
import Stories from "@/components/Feeds/Stories"

const Homepage = () => {
  return (
    <div className='flex gap-6 pt-6'>
      <div className="hidden xl:block w-[20%]"><LeftMenu type="home"/></div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPhoto />
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]"><RightMenu userID="" /></div>
    </div>
  )
}

export default Homepage