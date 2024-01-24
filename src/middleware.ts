import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import { AUTH_ROUTES } from "@/lib/utils/consts";
import { createUser, getUserProfile, uploadAvatar } from "./lib/supabase/db";
import { fetchFile } from "./lib/utils/utils";

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    const isAuthRoute = AUTH_ROUTES.find(
      (route) =>
        request.nextUrl.pathname.includes(route) &&
        !request.nextUrl.pathname.includes("verify-password") &&
        !request.nextUrl.pathname.includes("update-password")
    );
    const isTermsRoute = request.nextUrl.pathname.includes("terms");
    console.log("session", session);
    console.log("user", user);
    console.log(request.nextUrl.pathname, isAuthRoute);
    const profile = await getUserProfile(supabase, user?.id).catch(() => null);
    if ((!session || !user) && !isAuthRoute && !isTermsRoute) {
      console.log("redirecting to auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    } else if (
      user &&
      !user.user_metadata.username &&
      !profile &&
      !isAuthRoute
    ) {
      console.log("redirecting to create username");
      return NextResponse.redirect(new URL("/auth/signup/social", request.url));
    }
    // TODO: uncomment this when email verification is implemented
    // else if (
    //   user &&
    //   user.identities?.[0]?.identity_data?.email_verified === false &&
    //   !isAuthRoute
    // ) {
    //   console.log("redirecting to verify email");
    //   return NextResponse.redirect(new URL("/auth/verify-email", request.url));
    // }

    if (
      user &&
      user.user_metadata.username &&
      //user.identities?.[0]?.identity_data?.email_verified === true &&
      !profile
    ) {
      console.log("creating profile");

      let avatarUrl: string | undefined = user.user_metadata.avatar_url;
      if (avatarUrl) {
        const blob = await fetchFile(avatarUrl);
        const res = await uploadAvatar(supabase, blob, user.id);
        avatarUrl = res.path;
      }
      await createUser(supabase, {
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata.fullName,
        username: user.user_metadata.username,
        avatar_url: avatarUrl,
      });
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      user &&
      profile &&
      //user.identities?.[0]?.identity_data?.email_verified === true &&
      isAuthRoute
    ) {
      console.log("redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }
    console.log("returning response");
    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|icons).*)",
  ],
};
