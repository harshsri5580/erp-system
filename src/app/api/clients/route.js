import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";



// ======================
// GET ALL CLIENTS
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
    const clients =
      await prisma.client.findMany({

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

    const existingClient =
      await prisma.client.findFirst({

        where: {

          companyId:
            currentUser.companyId,

          companyName,

        },

      });

    if (existingClient) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Client already exists",
        },
        {
          status: 400,
        }
      );

    }
    if (email) {

      const existingEmail =
        await prisma.client.findFirst({

          where: {

            companyId:
              currentUser.companyId,

            email,

          },

        });

      if (existingEmail) {

        return NextResponse.json(
          {
            success: false,
            message:
              "Email already exists",
          },
          {
            status: 400,
          }
        );

      }

    }
    // CREATE CLIENT

    const client =
      await prisma.client.create({

        data: {
          companyId:
            currentUser.companyId,
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