import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE BOQ
// ======================

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
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }
    const { id } =
      await context.params;
    const boq =
      await prisma.boq.findFirst({
        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },
        include: {
          contract: true,
        },
      });

    return NextResponse.json({
      success: true,
      boq,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch BOQ",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE BOQ
// ======================

export async function PUT(
  request,
  context
) {
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
    const { id } =
      await context.params;
    const existingBoq =
      await prisma.boq.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingBoq) {

      return NextResponse.json(
        {
          success: false,
          message:
            "BOQ not found",
        },
        {
          status: 404,
        }
      );

    }
    const body = await request.json();

    const {
      contractId,
      itemName,
      unit,
      quantity,
      rate,
      description,
    } = body;
    const contract =
      await prisma.contract.findFirst({

        where: {

          id:
            parseInt(contractId),

          companyId:
            currentUser.companyId,

        },

      });

    if (!contract) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Contract",
        },
        {
          status: 404,
        }
      );

    }
    const total =
      parseFloat(quantity || 0) *
      parseFloat(rate || 0);

    const boq =
      await prisma.boq.update({
        where: {
          id: parseInt(id),
        },

        data: {
          itemName,
          unit,

          quantity:
            parseFloat(quantity),

          rate:
            parseFloat(rate),

          total,

          description,

          contract: {
            connect: {
              id: parseInt(
                contractId
              ),
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "BOQ updated successfully",
      boq,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update BOQ",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE BOQ
// ======================

export async function DELETE(
  request,
  context
) {


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
    const { id } =
      await context.params;
    const existingBoq =
      await prisma.boq.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingBoq) {

      return NextResponse.json(
        {
          success: false,
          message:
            "BOQ not found",
        },
        {
          status: 404,
        }
      );

    }
    await prisma.boq.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "BOQ deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete BOQ",
      },
      { status: 500 }
    );
  }
}