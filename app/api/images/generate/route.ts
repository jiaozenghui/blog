import { NextResponse } from "next/server";
import axios, { type AxiosRequestConfig } from "axios";

export async function POST(request: Request) {
  try {

    const body = await request.json();
    console.log('8888888888888888')
    console.log(body)
    const re = await axios.post(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis",
      { ...body },
      {
        headers: {
          "X-DashScope-Async": "enable",
          Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(re.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
