import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL VENDORS
// ======================

export async function GET() {
  try {
    const vendors =
      await prisma.vendor.findMany({
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