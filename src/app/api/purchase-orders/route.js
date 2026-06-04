import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL PURCHASE ORDERS
// ======================

export async function GET() {
  try {
    const purchaseOrders =
      await prisma.purchaseorder.findMany({
        include: {
          vendor: true,
          project: true,
          boq: true,
        },

        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      purchaseOrders,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch purchase orders",
      },
      { status: 500 }
    );
  }
}

// ======================
// CREATE PURCHASE ORDER
// ======================

export async function POST(request) {
  try {
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
    // ======================
    // GET SETTINGS PREFIX
    // ======================

    const settings =
      await prisma.settings.findFirst();

    const prefix =
      settings?.poPrefix || "PO";

    const poNumber =
      `${prefix}-${Date.now()}`;

    const purchaseOrder =
      await prisma.purchaseorder.create({
        data: {

          poNumber,

          quantity:
            parseFloat(quantity),

          receivedQty: 0,

          pendingQty:
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
        "Purchase order created successfully",
      purchaseOrder,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create purchase order",
      },
      { status: 500 }
    );
  }
}