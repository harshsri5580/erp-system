import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET INVENTORY
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
    const inventories =
      await prisma.inventory.findMany({

        where: {

          companyId:
            currentUser.companyId,

        },

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
      materialName,
      unit,
      quantity,
      minStock,
      status,
      vendorId,
      projectId,
      // purchaseOrderId,
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

    // const purchaseOrder =
    //   await prisma.purchaseorder.findFirst({

    //     where: {

    //       id:
    //         parseInt(
    //           purchaseOrderId
    //         ),

    //       companyId:
    //         currentUser.companyId,

    //     },

    //   });

    // if (!purchaseOrder) {

    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Invalid Purchase Order",
    //     },
    //     {
    //       status: 404,
    //     }
    //   );

    // }
    const inventory =
      await prisma.inventory.create({

        data: {
          company: {
            connect: {
              id: currentUser.companyId,
            },
          },
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

          // purchaseorder: {
          //   connect: {
          //     id: parseInt(
          //       purchaseOrderId
          //     ),
          //   },
          // },
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