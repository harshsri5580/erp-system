import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";


// GET SINGLE ATTENDANCE
export async function GET(
  request,
  context
) {

  try {
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }
    const { id } =
      await context.params;
    const attendance = await prisma.attendance.findFirst({
      where: {

        id: Number(id),

        companyId:
          currentUser.companyId,

      },

      include: {
        user: true,
      },
    });

    if (!attendance) {

      return NextResponse.json(
        { error: "Attendance not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attendance);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}




// UPDATE ATTENDANCE
export async function PUT(request, context) {

  try {
    const { id } =
      await context.params;

    const body = await request.json();
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const existingAttendance =
      await prisma.attendance.findFirst({

        where: {

          id: Number(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingAttendance) {

      return NextResponse.json(
        {
          error:
            "Attendance not found",
        },
        {
          status: 404,
        }
      );

    }
    const user =
      await prisma.user.findFirst({

        where: {

          id:
            Number(body.userId),

          companyId:
            currentUser.companyId,

        },

      });

    if (!user) {

      return NextResponse.json(
        {
          error:
            "Invalid User",
        },
        {
          status: 404,
        }
      );

    }

    const attendance = await prisma.attendance.update({
      where: {
        id: Number(id),
      },

      data: {
        userId: Number(body.userId),
        date: new Date(body.date),
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        status: body.status,
      },
    });

    return NextResponse.json(attendance);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to update attendance" },
      { status: 500 }
    );
  }
}




// DELETE ATTENDANCE
export async function DELETE(request, context) {

  try {
    const { id } = await context.params;

    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const existingAttendance =
      await prisma.attendance.findFirst({

        where: {

          id: Number(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingAttendance) {

      return NextResponse.json(
        {
          error:
            "Attendance not found",
        },
        {
          status: 404,
        }
      );

    }
    await prisma.attendance.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Attendance deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to delete attendance" },
      { status: 500 }
    );
  }
}