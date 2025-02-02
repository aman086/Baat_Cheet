import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(["/settings(.*)" , "/"]);

export default clerkMiddleware((auth , req)=>{
  // if(isProtectedRoute(req)) auth().protect();  // timestamp : 02:42:35 Hour
})
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};