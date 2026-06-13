import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";


// ======================
// GET SINGLE CLIENT
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

    const client =
      await prisma.client.findFirst({

        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
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
      await prisma.client.findFirst({

        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
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

    // CHECK CLIENT

    const existingClient =
      await prisma.client.findFirst({

        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
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