// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher(["/settings(.*)" , "/"]);

// export default clerkMiddleware((auth , req)=>{
//   // if(isProtectedRoute(req)) auth().protect();  // timestamp : 02:42:35 Hour
// })
 
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/"]); // Define public routes

export default clerkMiddleware(async(auth, req) => {
  if (isPublicRoute(req)) {
    return;
  }

  // Ensure the user is authenticated
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn(); // Redirects to sign-in page
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Ensures middleware applies to all pages except static assets
};



