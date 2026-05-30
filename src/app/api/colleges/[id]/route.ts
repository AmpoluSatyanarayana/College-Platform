import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {

  try {

    const { id } = await params;

    const college = await prisma.college.findUnique({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(college);

  } catch (error) {
    
    return NextResponse.json(
      { error: "Failed to fetch college" },
      { status: 500 }
    );

  }
}