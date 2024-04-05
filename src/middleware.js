import { NextResponse } from "next/server";
import { JWTVerify } from "./helpers/jwt";

export async function middleware(req, res) {
  const publicRoutes = ["/", "/login", "/register"];

  var pathname = req.nextUrl.pathname;
  var token = req.cookies.get("AccessToken")?.value;
  var userID = token && (await JWTVerify(token));

  if (!userID && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (userID && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (userID) {
    var singleUserProfile = await fetch(
      `https://readable-blogging.vercel.app/api/single-user?id=${userID}`
    );
    singleUserProfile = await singleUserProfile.json();
    const userRights = singleUserProfile?.singleUser?.isAdmin;

    const restrictedRoutesForUser = [
      "/dashboard",
      "/dashboard/blogs",
      "/dashboard/category",
    ];

    if (!userRights && restrictedRoutesForUser.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/login", "/register", "/dashboard", "/dashboard/:path*"],
};
