import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL PURCHASE ORDERS
// ======================

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
    const purchaseOrders =
      await prisma.purchaseorder.findMany({

        where: {

          companyId:
            currentUser.companyId,

        },
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
    const vendor =
      await prisma.vendor.findFirst({

        where: {

          id:
            parseInt(vendorId),

          companyId:
            currentUser.companyId,

        },

      });

    if (!vendor) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Vendor",
        },
        {
          status: 404,
        }
      );

    }

    const project =
      await prisma.project.findFirst({

        where: {

          id:
            parseInt(projectId),

          companyId:
            currentUser.companyId,

        },

      });

    if (!project) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Project",
        },
        {
          status: 404,
        }
      );

    }

    const boq =
      await prisma.boq.findFirst({

        where: {

          id:
            parseInt(boqId),

          companyId:
            currentUser.companyId,

        },

      });

    if (!boq) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid BOQ",
        },
        {
          status: 404,
        }
      );

    }
    const total =
      parseFloat(quantity || 0) *
      parseFloat(rate || 0);
    // ======================
    // GET SETTINGS PREFIX
    // ======================

    const settings =
      await prisma.settings.findFirst({
        where: {
          companyId:
            currentUser.companyId,
        },
      });

    const prefix =
      settings?.poPrefix || "PO";

    const poNumber =
      `${prefix}-${Date.now()}`;

    const purchaseOrder =
      await prisma.purchaseorder.create({
        data: {
          company: {
            connect: {
              id: currentUser.companyId,
            },
          },
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