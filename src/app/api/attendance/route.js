import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

// GET ALL ATTENDANCE
export async function GET(request) {
  try {
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }
    const attendance =
      await prisma.attendance.findMany({

        where: {

          companyId:
            currentUser.companyId,

        },
        include: {
          user: true,
        },
        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json(attendance);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}



// CREATE ATTENDANCE
export async function POST(request) {
  try {
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }
    const body = await request.json();
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
    const attendance = await prisma.attendance.create({
      data: {
        companyId:
          currentUser.companyId,
        userId: Number(body.userId),
        date: new Date(body.date),
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        status: body.status,
      },
    });

    return NextResponse.json(attendance, { status: 201 });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to create attendance" },
      { status: 500 }
    );
  }
}