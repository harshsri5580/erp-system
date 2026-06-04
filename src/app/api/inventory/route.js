import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET INVENTORY
// ======================

export async function GET() {
  try {

    const inventories =
      await prisma.inventory.findMany({

        include: {
          vendor: true,
          project: true,
          purchaseorder: true,
        },

        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      inventories,
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
// CREATE INVENTORY
// ======================

export async function POST(request) {

  try {

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
      await prisma.inventory.create({

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
        "Inventory created successfully",
      inventory,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create inventory",
      },
      { status: 500 }
    );
  }
}