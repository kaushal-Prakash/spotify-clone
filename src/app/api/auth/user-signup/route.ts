import connectDB from "@/db/connectDB";
import UserModal from "@/modals/UserModal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await connectDB();

  const { username, email, password } = await req.json();
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields",success:false },
      { status: 400 }
    );
  }

  try {
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists",success: false },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModal({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { email, username },
      process.env.SECRET_KEY as string,
      { expiresIn: "15d" }
    );

    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production" && req.url.startsWith("https"),
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 15,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating user",success:false },
      { status: 500 }
    );
  }
}
