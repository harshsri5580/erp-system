import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL BOQ
// ======================

export async function GET() {
  try {
    const boqs =
      await prisma.boq.findMany({
        include: {
          contract: true,
        },

        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      boqs,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch BOQ",
      },
      { status: 500 }
    );
  }
}

// ======================
// CREATE BOQ
// ======================

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      contractId,
      itemName,
      unit,
      quantity,
      rate,
      description,
    } = body;

    // TOTAL

    const total =
      parseFloat(quantity || 0) *
      parseFloat(rate || 0);

    const boq =
      await prisma.boq.create({
        data: {
          itemName,

          unit,

          quantity:
            parseFloat(quantity),

          rate:
            parseFloat(rate),

          total,

          description,

          contract: {
            connect: {
              id: parseInt(
                contractId
              ),
            },
          },
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "BOQ created successfully",
      boq,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create BOQ",
      },
      { status: 500 }
    );
  }
}