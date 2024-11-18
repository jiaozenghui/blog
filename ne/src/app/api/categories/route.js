import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    console.log('reqbegin')
    const categories = await prisma.category.findMany({});
    console.log('begin')
    console.log(categories)
    console.log('end')
    return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
