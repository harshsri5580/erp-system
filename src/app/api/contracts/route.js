import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL CONTRACTS
// ======================

export async function GET() {
  try {
    const contracts =
      await prisma.contract.findMany({
        include: {
          project: true,
          vendor: true,
        },

        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      contracts,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contracts",
      },
      { status: 500 }
    );
  }
}

// ======================
// CREATE CONTRACT
// ======================

export async function POST(request) {
  try {
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
      await prisma.contract.create({
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
        "Contract created successfully",
      contract,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create contract",
      },
      { status: 500 }
    );
  }
}