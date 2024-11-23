import { NextResponse } from "next/server";
import { Post } from "@axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("999999999998888888888888");
    console.log(body);
    console.log();
    const Authorization = request.headers.get("authorization");
    console.log("66666666666666666666666");
    console.log(Authorization);
    const [e, r] = await Post("api/works/create", body, {
      headers: { Authorization },
    });
    console.log("sdgfheprk;ghe;r");
    console.log(r);
    return NextResponse.json(r);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
