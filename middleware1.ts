import {NextResponse} from 'next/server'
import { getAuthSession } from "@/utils/auth";
export default async function checkAuth(req:any) {
    //获取token
    const session = await getAuthSession()
    //未授权，跳转到登录页面
    if (!session ) {
        return NextResponse.redirect("http://localhost:3000/sign-in")
    } else {
        NextResponse.next()
    }
}

export const config = {
  matcher: [
    '/create-podcast',
    '/profile',
  ],
};
