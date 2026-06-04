import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// ======================
// GET SINGLE USER
// ======================

export async function GET(
  request,
  context
) {
  try {
    const { id } =
      await context.params;
    const user =
      await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },

        include: {
          role: true,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE USER
// ======================

export async function PUT(
  request,
  context
) {
  try {
    const { id } =
      await context.params;
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

    let hashedPassword;

    if (password) {
      hashedPassword =
        await bcrypt.hash(password, 10);
    }

    const user =
      await prisma.user.update({
        where: {
          id: parseInt(id),
        },

        data: {
          name,
          email,

          ...(password && {
            password: hashedPassword,
          }),

          phone,
          address,
          department,
          designation,

          salary: salary
            ? parseFloat(salary)
            : null,

          roleId: parseInt(roleId),
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE USER
// ======================

export async function DELETE(
  request,
  context
) {
  try {
    const { id } =
      await context.params;
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}