import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE PURCHASE ORDER
// ======================

export async function GET(
  request,
  context
) {
  try {
    const { id } =
      await context.params;
    const purchaseOrder =
      await prisma.purchaseorder.findUnique({
        where: {
          id: parseInt(id),
        },

        include: {
          vendor: true,
          project: true,
          boq: true,
          grn: true,
        },
      });

    return NextResponse.json({
      success: true,
      purchaseOrder,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch purchase order",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE PURCHASE ORDER
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
      vendorId,
      projectId,
      boqId,
      quantity,
      rate,
      status,
      description,
    } = body;

    const total =
      parseFloat(quantity || 0) *
      parseFloat(rate || 0);

    const purchaseOrder =
      await prisma.purchaseorder.update({
        where: {
          id: parseInt(id),
        },

        data: {
          quantity:
            parseFloat(quantity),

          rate:
            parseFloat(rate),

          total,

          status,
          description,

          vendor: {
            connect: {
              id: parseInt(
                vendorId
              ),
            },
          },

          project: {
            connect: {
              id: parseInt(
                projectId
              ),
            },
          },

          boq: {
            connect: {
              id: parseInt(
                boqId
              ),
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Purchase order updated successfully",
      purchaseOrder,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update purchase order",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE PURCHASE ORDER
// ======================

export async function DELETE(
  request,
  context
) {
  const { id } =
    await context.params;
  try {
    await prisma.purchaseorder.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Purchase order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete purchase order",
      },
      { status: 500 }
    );
  }
}