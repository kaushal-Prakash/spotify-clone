import connectDB from "@/db/connectDB";
import Admin from "@/modals/AdminModal"; 
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await req.json();
    console.log("Admin login attempt:", { email });
  
    if (!email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
  
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found in database.");
      return NextResponse.json({ message: "Admin not found",success:false }, { status: 404 });
    }
  
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      console.log("Invalid password.");
      return NextResponse.json({ message: "Invalid password",success:false }, { status: 401 });
    }
  
    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY is missing in .env");
      return NextResponse.json({ message: "Internal server error",success:false }, { status: 500 });
    }
  
    const token = jwt.sign(
      { email: admin.email, role: "admin" },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
  
    console.log("Admin login successful.");
  
    const response = NextResponse.json({ message: "Admin logged in successfully", success: true });
    response.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
  
}
