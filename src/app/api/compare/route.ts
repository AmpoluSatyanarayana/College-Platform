import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url);

    const ids = searchParams.get("ids");

    if (!ids) {
      return NextResponse.json([]);
    }

    const idsArray = ids
      .split(",")
      .map((id) => Number(id));

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: idsArray,
        },
      },
    });

    return NextResponse.json(colleges);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to compare colleges" },
      { status: 500 }
    );

  }
}