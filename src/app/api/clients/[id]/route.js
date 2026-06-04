import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// ======================
// GET SINGLE CLIENT
// ======================

export async function GET(
  request,
  context
) {

  try {
    const { id } =
      await context.params;

    const client =
      await prisma.client.findUnique({

        where: {
          id: parseInt(id),
        },

      });

    if (!client) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Client not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      client,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch client",
      },
      {
        status: 500,
      }
    );
  }
}



// ======================
// UPDATE CLIENT
// ======================

export async function PUT(
  request,
  context
) {

  try {
    const { id } =
      await context.params;
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

    // CHECK CLIENT

    const existingClient =
      await prisma.client.findUnique({

        where: {
          id: parseInt(id),
        },

      });

    if (!existingClient) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Client not found",
        },
        {
          status: 404,
        }
      );
    }

    // UPDATE CLIENT

    const updatedClient =
      await prisma.client.update({

        where: {
          id: parseInt(id),
        },

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
        "Client updated successfully",

      client: updatedClient,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update client",
      },
      {
        status: 500,
      }
    );
  }
}



// ======================
// DELETE CLIENT
// ======================

export async function DELETE(
  request,
  context
) {

  try {
    const { id } =
      await context.params;

    // CHECK CLIENT

    const existingClient =
      await prisma.client.findUnique({

        where: {
          id: parseInt(id),
        },

      });

    if (!existingClient) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Client not found",
        },
        {
          status: 404,
        }
      );
    }

    // DELETE CLIENT

    await prisma.client.delete({

      where: {
        id: parseInt(id),
      },

    });

    return NextResponse.json({

      success: true,

      message:
        "Client deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete client",
      },
      {
        status: 500,
      }
    );
  }
}