import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE VENDOR
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
    const vendor =
      await prisma.vendor.findFirst({
        where: {
          id: parseInt(id),
          companyId:
            currentUser.companyId,
        },
      });

    if (!vendor) {
      return NextResponse.json(
        {
          success: false,
          message: "Vendor not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      vendor,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch vendor",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE VENDOR
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
    const body = await request.json();
    const existingVendor =
      await prisma.vendor.findFirst({

        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
        },

      });

    if (!existingVendor) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Vendor not found",
        },
        {
          status: 404,
        }
      );

    }

    const {
      companyName,
      ownerName,
      phone,
      email,
      gstNumber,
      address,
      bankDetails,
    } = body;

    const vendor =
      await prisma.vendor.update({
        where: {
          id: parseInt(id),
        },

        data: {
          companyName,
          ownerName,
          phone,
          email,
          gstNumber,
          address,
          bankDetails,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Vendor updated successfully",
      vendor,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update vendor",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE VENDOR
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
    const existingVendor =
      await prisma.vendor.findFirst({

        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
        },

      });

    if (!existingVendor) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Vendor not found",
        },
        {
          status: 404,
        }
      );

    }
    await prisma.vendor.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Vendor deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete vendor",
      },
      { status: 500 }
    );
  }
}