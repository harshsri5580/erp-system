import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {

  try {

    const body = await req.json();

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        role: true,
        company: true,
      },
    });

    if (!user) {

      return NextResponse.json({
        success: false,
        message: "User not found",
      });

    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {

      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name,
        companyId: user.companyId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const response =
      NextResponse.json({

        success: true,

        user: {

          id: user.id,

          name: user.name,

          role: user.role.name,

          companyId: user.companyId,

          companyName:
            user.company?.name || "",

        },

      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return response;

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });

  }

}