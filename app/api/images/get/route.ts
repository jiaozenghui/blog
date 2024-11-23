import { NextResponse } from 'next/server';
import axios, { type AxiosRequestConfig } from "axios";

export async function GET(request: any) {
  try {
    const { searchParams } = new URL(request.url);
    const task_id = searchParams.get('task_id')
    console.log('99999999999999999999999999999')
    console.log(task_id)
    console.log('begin')
    const resulut = await axios.get(
        `https://dashscope.aliyuncs.com/api/v1/tasks/${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
          },
        }
      );
      console.log('end')
      console.log(resulut)
    return NextResponse.json(resulut.data);
  }  catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}