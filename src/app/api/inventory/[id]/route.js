import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE INVENTORY
// ======================
export async function GET(
  request,
  context
) {

  try {
    const { id } =
      await context.params;
    const inventory =
      await prisma.inventory.findUnique({

        where: {
          id: parseInt(id),
        },

        include: {
          vendor: true,
          project: true,
          purchaseorder: true,
        },
      });

    return NextResponse.json({
      success: true,
      inventory,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch inventory",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE INVENTORY
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
      materialName,
      unit,
      quantity,
      minStock,
      status,
      vendorId,
      projectId,
      purchaseOrderId,
    } = body;

    const inventory =
      await prisma.inventory.update({

        where: {
          id: parseInt(id),
        },

        data: {

          materialName,

          unit,

          quantity:
            parseFloat(quantity),

          minStock:
            parseFloat(minStock),

          status,

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

          purchaseorder: {
            connect: {
              id: parseInt(
                purchaseOrderId
              ),
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Inventory updated successfully",
      inventory,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update inventory",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE INVENTORY
// ======================

export async function DELETE(
  request,
  context
) {

  try {
    const { id } =
      await context.params;
    await prisma.inventory.delete({

      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Inventory deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete inventory",
      },
      { status: 500 }
    );
  }
}