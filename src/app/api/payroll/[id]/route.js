import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";


// GET SINGLE PAYROLL
export async function GET(
  request,
  context
) {

  try {

    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }
    const { id } = await context.params;

    const payroll =
      await prisma.payroll.findFirst({
        where: {

          id: Number(id),

          companyId:
            currentUser.companyId,

        },

        include: {
          user: true,
        },
      });

    if (!payroll) {

      return NextResponse.json(
        {
          error: "Payroll not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(payroll);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to fetch payroll",
      },
      {
        status: 500,
      }
    );
  }
}




// UPDATE PAYROLL
export async function PUT(
  request,
  context
) {
  try {

    const { id } = await context.params;
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const existingPayroll =
      await prisma.payroll.findFirst({

        where: {

          id: Number(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingPayroll) {

      return NextResponse.json(
        {
          error:
            "Payroll not found",
        },
        {
          status: 404,
        }
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

    const basicSalary =
      parseFloat(body.basicSalary) || 0;

    const overtime =
      parseFloat(body.overtime) || 0;

    const deductions =
      parseFloat(body.deductions) || 0;

    const finalSalary =
      basicSalary + overtime - deductions;

    const payroll =
      await prisma.payroll.update({

        where: {
          id: Number(id),
        },

        data: {

          userId: Number(body.userId),

          month: body.month,

          basicSalary,

          overtime,

          deductions,

          finalSalary,
        },
      });

    return NextResponse.json(payroll);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to update payroll",
      },
      {
        status: 500,
      }
    );
  }
}




// DELETE PAYROLL
export async function DELETE(
  request,
  context
) {

  try {

    const { id } = await context.params;
    const currentUser =
      getUser(request);

    if (!currentUser) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const existingPayroll =
      await prisma.payroll.findFirst({

        where: {

          id: Number(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingPayroll) {

      return NextResponse.json(
        {
          error:
            "Payroll not found",
        },
        {
          status: 404,
        }
      );

    }
    await prisma.payroll.delete({

      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message:
        "Payroll deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to delete payroll",
      },
      {
        status: 500,
      }
    );
  }
}