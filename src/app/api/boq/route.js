import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL BOQ
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
    const boqs =
      await prisma.boq.findMany({

        where: {

          companyId:
            currentUser.companyId,

        },
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
      contractId,
      itemName,
      unit,
      quantity,
      rate,
      description,
    } = body;
    const contract =
      await prisma.contract.findFirst({

        where: {

          id:
            parseInt(contractId),

          companyId:
            currentUser.companyId,

        },

      });

    if (!contract) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Contract",
        },
        {
          status: 404,
        }
      );

    }
    // TOTAL

    const total =
      parseFloat(quantity || 0) *
      parseFloat(rate || 0);

    const boq =
      await prisma.boq.create({
        data: {

          company: {
            connect: {
              id: currentUser.companyId,
            },
          },
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