import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL CONTRACTS
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
    const contracts =
      await prisma.contract.findMany({

        where: {

          companyId:
            currentUser.companyId,

        },
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
      await prisma.contract.create({
        data: {
          company: {
            connect: {
              id: currentUser.companyId,
            },
          },
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