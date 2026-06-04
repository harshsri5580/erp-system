import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET ATTENDANCE REPORTS

export async function GET() {

  try {

    const attendance =
      await prisma.attendance.findMany({

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
      {
        error:
          "Failed to fetch attendance reports",
      },
      {
        status: 500,
      }
    );
  }
}