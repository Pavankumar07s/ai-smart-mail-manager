import { NextResponse } from "next/server";
import { auth } from "node_modules/@clerk/nextjs/dist/types/app-router/server/auth";

export const GET=async()=>{
    const userId=await auth();
    console.log("user id is "+" ",userId)
    return NextResponse.json({message:"hello"},{status:200});
}