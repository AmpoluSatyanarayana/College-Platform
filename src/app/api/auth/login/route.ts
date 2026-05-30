import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import generateToken from "@/utils/generateToken";
import cookieOptions from "@/utils/cookieOptions";

export async function POST(request:Request){

    try {
        
        const body = await request.json();

        const {email,password} = body;

        if(!email || !password){
            return NextResponse.json(
              { error: "All fields are required." },
              { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where : {
                email,
            },
        });

        if (!existingUser) {
          return NextResponse.json(
            { error: "User does not exist" },
            { status: 400 }
          );
        }

        const isMatch = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!isMatch) {
          return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 400 }
          );
        }

        const token = generateToken(existingUser.id);
        //navigate code to dashboard
        const response = NextResponse.json(
          {
            message: "Login successful",
            user: {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
            },
          },
          {
            status: 200,
          }
        );

        response.cookies.set(
          "token",
          token,
          cookieOptions
        );

        return response;
    } catch (error) {
            console.error(error);
            return NextResponse.json(
              { error: "Something went wrong. Please try again." },
              { status: 500 }
            ); 
    }
}