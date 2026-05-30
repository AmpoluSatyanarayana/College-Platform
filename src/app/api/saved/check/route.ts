import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import verifyToken from "@/utils/verifyToken";

export async function GET(
  request: NextRequest
) {
  try {

    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { isSaved: false },
        { status: 200 }
      );
    }

    const decoded = verifyToken(token) as {
      id: number;
    };

    const collegeId =
      Number(
        request.nextUrl.searchParams.get(
          "collegeId"
        )
      );

    const savedCollege =
      await prisma.savedCollege.findFirst({
        where: {
          userId: decoded.id,
          collegeId,
        },
      });

    return NextResponse.json({
      isSaved: !!savedCollege,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to check saved status",
      },
      {
        status: 500,
      }
    );

  }
}