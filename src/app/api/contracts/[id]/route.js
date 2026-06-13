import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE CONTRACT
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
    const contract =
      await prisma.contract.findFirst({
        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

        include: {
          project: true,
          vendor: true,
        },
      });

    return NextResponse.json({
      success: true,
      contract,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch contract",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE CONTRACT
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
    const existingContract =
      await prisma.contract.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingContract) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Contract not found",
        },
        {
          status: 404,
        }
      );

    }

    const body = await request.json();


    const {
      title,
      projectId,
      vendorId,
      contractValue,
      startDate,
      endDate,
      status,
      description,
    } = body;

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
    const contract =
      await prisma.contract.update({
        where: {
          id: parseInt(id),
        },

        data: {
          title,

          contractValue:
            contractValue
              ? parseFloat(
                contractValue
              )
              : null,

          startDate,
          endDate,
          status,
          description,

          project: {
            connect: {
              id: parseInt(
                projectId
              ),
            },
          },

          vendor: {
            connect: {
              id: parseInt(
                vendorId
              ),
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Contract updated successfully",
      contract,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update contract",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE CONTRACT
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
    const existingContract =
      await prisma.contract.findFirst({

        where: {

          id: parseInt(id),

          companyId:
            currentUser.companyId,

        },

      });

    if (!existingContract) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Contract not found",
        },
        {
          status: 404,
        }
      );

    }
    await prisma.contract.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Contract deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete contract",
      },
      { status: 500 }
    );
  }
}