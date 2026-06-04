import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE BOQ
// ======================

export async function GET(
  request,
  context
) {
  try {
    const { id } =
      await context.params;
    const boq =
      await prisma.boq.findUnique({
        where: {
          id: parseInt(id),
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
    const { id } =
      await context.params;
    const body = await request.json();

    const {
      contractId,
      itemName,
      unit,
      quantity,
      rate,
      description,
    } = body;

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
  const { id } =
    await context.params;
  try {
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