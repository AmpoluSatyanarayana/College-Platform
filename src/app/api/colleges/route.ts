import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { collegesData } from "@/data/colleges";




export async function GET(request:Request) {

  

  try {
    
    const {searchParams} = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 21;

    const search = searchParams.get("search") || "";

    const colleges = await prisma.college.findMany({
      where:{
        name:{
          contains: search,
          mode:"insensitive",
        },
      },
      skip: (page - 1) * limit,

      take: limit,
    });

    return NextResponse.json(colleges);

  } catch (error) {
    return NextResponse.json(
      {error: "Failed to fetch colleges"},
      {status: 500}
    );
  }
  
}


export async function POST() {
  try {
    const colleges = await prisma.college.createMany({
      data: collegesData,
    });

    return NextResponse.json(colleges);
  } catch (error) {
     return NextResponse.json(
      {error: "Failed to create college"},
      {status: 500}
     );
  }
}

