import { NextResponse } from "next/server";
import { Post } from "@axios";

export async function POST(request: Request) {
  try {

    const body = await request.json();

    const result = Post('api/works/create', body);
    return NextResponse.json(result.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
