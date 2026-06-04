import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET PAYROLL REPORTS

export async function GET() {

  try {

    const payrolls =
      await prisma.payroll.findMany({

        include: {
          user: true,
        },

        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json(payrolls);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch payroll reports",
      },
      {
        status: 500,
      }
    );
  }
}