import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
 
export default withAuth(
  function middleware(req) {
    console.log('88888888888888888')
    // 获取当前路径和用户角色
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;
    console.log(req.url)
    // 管理员路由保护
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
 
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);
 
// 配置需要保护的路由
export const config = {
  matcher: ["/create-podcast", "/admin/:path*", "/profile/:path*"]
};