import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET ALL ATTENDANCE
export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
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

    const body = await request.json();

    const attendance = await prisma.attendance.create({
      data: {
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