import { NextResponse } from "next/server";
import axios, { type AxiosRequestConfig } from "axios";

export async function POST(request: Request) {
  try {
    let data = {
      model: "wanx-v1",
      input: {
        prompt:
          "近景镜头，18岁的中国女孩，古代服饰，圆脸，正面看着镜头，民族优雅的服装，商业摄影，室外，电影级光照，半身特写，精致的淡妆，锐利的边缘。",
      },
      parameters: {
        style: "<auto>",
        size: "1024*1024",
        n: 1,
      },
    };
    const body = await request.json();
    console.log("8888888");
    console.log(process.env.DASHSCOPE_API_KEY);
    const re = axios.post(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis",
      data,
      {
        "X-DashScope-Async": "enable",
        Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
        "Content-Type": "application/json",
      }
    );
    console.log("9999999999");
    return NextResponse.json(re);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
https://help.aliyun.com/zh/model-studio/developer-reference/text-to-image-api-reference?spm=a2c4g.11186623.0.0.3a63408d40kpfi