import connectDB from "@/db/connectDB";
import UserModal from "@/modals/UserModal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();

  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  const user = await UserModal.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign(
    { email: user.email, username: user.username },
    process.env.SECRET_KEY as string,
    { expiresIn: "15d" }
  );

  const response = NextResponse.json({
    message: "User loged in successfully",
    success: true,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && req.url.startsWith("https"),
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 15,
  });

  return response;
}
