import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";


// GET PAYROLL REPORTS

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
    const payrolls =
      await prisma.payroll.findMany({

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