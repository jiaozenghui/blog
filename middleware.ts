import {NextResponse} from 'next/server'
import {getToken} from "next-auth/jwt"

export default async function checkAuth(req:any) {
    //获取token
    const session = await getToken({
        req
    })
    //未授权，跳转到登录页面
    if (!session) {
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
