import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL USERS
// ======================

export async function GET(request) {
  try {
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }
    const users = await prisma.user.findMany({

      where: {
        companyId:
          currentUser.companyId,
      },
      include: {
        role: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}

// ======================
// CREATE USER
// ======================

export async function POST(request) {
  try {

    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }
    const body = await request.json();

    const {
      name,
      email,
      password,
      phone,
      address,
      department,
      designation,
      salary,
      roleId,
    } = body;

    // VALIDATION

    if (!name || !email || !password || !roleId) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing",
        },
        { status: 400 }
      );
    }

    // CHECK EXISTING USER

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }
    const role =
      await prisma.role.findFirst({

        where: {
          id: parseInt(roleId),
        },

      });

    if (!role) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Role",
        },
        {
          status: 404,
        }
      );

    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER

    const user = await prisma.user.create({
      data: {
        companyId:
          currentUser.companyId,
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        department,
        designation,
        salary: salary ? parseFloat(salary) : null,
        roleId: parseInt(roleId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
}