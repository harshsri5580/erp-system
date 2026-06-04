import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// ======================
// GET ALL CLIENTS
// ======================

export async function GET() {

  try {

    const clients =
      await prisma.client.findMany({

        orderBy: {
          id: "desc",
        },

      });

    return NextResponse.json({
      success: true,
      clients,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch clients",
      },
      {
        status: 500,
      }
    );
  }
}



// ======================
// CREATE CLIENT
// ======================

export async function POST(request) {

  try {

    const body =
      await request.json();

    const {
      companyName,
      ownerName,
      email,
      phone,
      gstNumber,
      address,
      status,
    } = body;

    // VALIDATION

    if (!companyName) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Company name is required",
        },
        {
          status: 400,
        }
      );
    }

    // CREATE CLIENT

    const client =
      await prisma.client.create({

        data: {

          companyName,

          ownerName,

          email,

          phone,

          gstNumber,

          address,

          status,
        },

      });

    return NextResponse.json({
      success: true,
      message:
        "Client created successfully",
      client,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create client",
      },
      {
        status: 500,
      }
    );
  }
}