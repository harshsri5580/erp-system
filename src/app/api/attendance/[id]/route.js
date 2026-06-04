import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET SINGLE ATTENDANCE
export async function GET(
  request,
  context
) {

  try {
    const { id } =
      await context.params;
    const attendance = await prisma.attendance.findUnique({
      where: {
        id: Number(id),
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

    const body = await request.json();

    const { id } = await context.params;

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