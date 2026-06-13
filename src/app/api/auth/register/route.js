import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {

  try {

    const body =
      await req.json();

    const {
      companyName,
      ownerName,
      email,
      password,
      phone,
      address,
    } = body;

    // =====================
    // VALIDATION
    // =====================

    if (
      !companyName ||
      !ownerName ||
      !email ||
      !password
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "All required fields are mandatory",
        },
        {
          status: 400,
        }
      );

    }

    // =====================
    // CHECK EMAIL
    // =====================

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Email already exists",
        },
        {
          status: 400,
        }
      );

    }

    // =====================
    // GET ADMIN ROLE
    // =====================

    const adminRole =
      await prisma.role.findFirst({
        where: {
          name: "Admin",
        },
      });

    if (!adminRole) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Admin role not found",
        },
        {
          status: 400,
        }
      );

    }

    // =====================
    // HASH PASSWORD
    // =====================

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // =====================
    // CREATE COMPANY
    // =====================

    const company =
      await prisma.company.create({
        data: {

          name: companyName,

          email,

          phone,

          address,

        },
      });

    await prisma.settings.create({
      data: {
        companyId: company.id,

        companyName,

        companyEmail: email,

        companyPhone: phone,

        companyAddress: address,
      },
    });
    // =====================
    // CREATE ADMIN USER
    // =====================

    const user =
      await prisma.user.create({
        data: {

          name: ownerName,

          email,

          password:
            hashedPassword,

          phone,

          address,

          roleId:
            adminRole.id,

          companyId:
            company.id,

          status: true,

        },
      });

    // =====================
    // RESPONSE
    // =====================

    return NextResponse.json({

      success: true,

      message:
        "Company Registered Successfully",

      company,

      user: {

        id: user.id,

        name: user.name,

        email: user.email,

      },

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Registration failed",
        error:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

}