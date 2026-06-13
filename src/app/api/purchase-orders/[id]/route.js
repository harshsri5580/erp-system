import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE PURCHASE ORDER
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
    const purchaseOrder =
      await prisma.purchaseorder.findFirst({
        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

        include: {
          vendor: true,
          project: true,
          boq: true,
          inventory: true,
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
  try {
    const { id } =
      await context.params;
    const existingPO =
      await prisma.purchaseorder.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingPO) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Purchase Order not found",
        },
        {
          status: 404,
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

    const existingPO =
      await prisma.purchaseorder.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingPO) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Purchase Order not found",
        },
        {
          status: 404,
        }
      );

    }

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
      {
        status: 500,
      }
    );

  }

}