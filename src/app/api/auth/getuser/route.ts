import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import verifyToken from "@/utils/verifyToken";

export async function GET(
  request: NextRequest
) {

  try {

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token) as {
      id: number;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {user: {
        id: user.id,
        name: user.name,
        email: user.email
      }},
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}