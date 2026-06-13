import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE INVENTORY
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
    const inventory =
      await prisma.inventory.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

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
    const existingInventory =
      await prisma.inventory.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingInventory) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Inventory not found",
        },
        {
          status: 404,
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
      purchaseOrderId,
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
    const existingInventory =
      await prisma.inventory.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingInventory) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Inventory not found",
        },
        {
          status: 404,
        }
      );

    }
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