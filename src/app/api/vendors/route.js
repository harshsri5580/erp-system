import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

// ======================
// GET ALL VENDORS
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
    const vendors =
      await prisma.vendor.findMany({

        where: {
          companyId:
            currentUser.companyId,
        },
        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      vendors,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch vendors",
      },
      { status: 500 }
    );
  }
}

// ======================
// CREATE VENDOR
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
      companyName,
      ownerName,
      phone,
      email,
      gstNumber,
      address,
      bankDetails,
    } = body;

    const vendor =
      await prisma.vendor.create({
        data: {
          companyId:
            currentUser.companyId,
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
        "Vendor created successfully",
      vendor,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create vendor",
      },
      { status: 500 }
    );
  }
}