import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET ALL PAYROLLS
export async function GET() {

  try {

    const payrolls = await prisma.payroll.findMany({

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
        error: "Failed to fetch payrolls",
      },
      {
        status: 500,
      }
    );
  }
}




// CREATE PAYROLL
export async function POST(request) {

  try {

    const body = await request.json();

    const basicSalary =
      parseFloat(body.basicSalary) || 0;

    const overtime =
      parseFloat(body.overtime) || 0;

    const deductions =
      parseFloat(body.deductions) || 0;

    // FINAL SALARY

    const finalSalary =
      basicSalary + overtime - deductions;

    const payroll =
      await prisma.payroll.create({

        data: {

          userId: Number(body.userId),

          month: body.month,

          basicSalary,

          overtime,

          deductions,

          finalSalary,

          status: "Paid",
        },
      });

    return NextResponse.json(
      payroll,
      {
        status: 201,
      }
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to create payroll",
      },
      {
        status: 500,
      }
    );
  }
}