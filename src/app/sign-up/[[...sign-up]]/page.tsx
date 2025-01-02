import { SignUp } from '@clerk/nextjs'
import { Sign } from 'crypto'

export default function Page() {
  // return <SignUp />

  return(
    <div className='h-[calc(100vh-96px)] flex items-center justify-center'>
      <SignUp />
    </div>
  )  
}