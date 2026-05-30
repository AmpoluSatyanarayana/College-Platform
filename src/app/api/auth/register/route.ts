import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import generateToken from "@/utils/generateToken";
import bcrypt from "bcryptjs";
import cookieOptions from "@/utils/cookieOptions";


export async function POST(request:Request){

    try {
        
        const body = await request.json();

        const {name,email,password} = body;

        if(!name || !email || !password){
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

        if(existingUser){
            return NextResponse.json(
              { error: "User already exists." },
              { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = generateToken(user.id);
        
        const response =  NextResponse.json(
           {
              message: "Signup successful",
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              },
            },
           { status: 201 }
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
              { error: "Signup failed." },
              { status: 500 }
            ); 
    }
}