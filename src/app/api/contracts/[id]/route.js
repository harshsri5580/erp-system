import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE CONTRACT
// ======================

export async function GET(
  request,
  context
) {
  try {
    const { id } =
      await context.params;
    const contract =
      await prisma.contract.findUnique({
        where: {
          id: parseInt(id),
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
    const { id } =
      await context.params;
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
    const { id } =
      await context.params;
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