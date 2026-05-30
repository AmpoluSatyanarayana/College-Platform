import {NextRequest,NextResponse} from "next/server";
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
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token) as {
      id: number;
    };

    const savedCollege =
      await prisma.savedCollege.findMany({
        where: {
          userId: decoded.id,
        },

        include: {
          college: true,
        },
      });

    return NextResponse.json(
      {savedCollege:savedCollege},
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch saved colleges" },
      { status: 500 }
    );

  }
}


export async function POST(request: NextRequest) {

  try {

    const token =request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token) as {
      id: number;
    };

    const body = await request.json();

    const { collegeId } = body;

    const savedCollege =
      await prisma.savedCollege.create({
        data: {
          userId: decoded.id,
          collegeId,
        },
      });

    return NextResponse.json(
      {savedCollege:savedCollege},
      { status: 201 }
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to save college" },
      { status: 500 }
    );

  }
}

export async function DELETE(
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

    const body =await request.json();

    const { collegeId } = body;

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId: decoded.id,
          collegeId,
        },
      },
    });

    return NextResponse.json(
      {
        message:"College removed successfully",
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to remove college",
      },
      {
        status: 500,
      }
    );

  }
}