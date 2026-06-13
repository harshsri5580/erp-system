import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

// ======================
// GET SINGLE PROJECT
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
    const project =
      await prisma.project.findFirst({
        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
        },
        include: {
          user: true,
          client: true,
        },
      });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}

// ======================
// UPDATE PROJECT
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
    const body = await request.json();

    const {
      name,
      description,
      budget,
      status,
      userId,
      clientId,
    } = body;

    const existingProject =
      await prisma.project.findFirst({

        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
        },

      });

    if (!existingProject) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Project not found",
        },
        {
          status: 404,
        }
      );

    }

    if (clientId) {

      const client =
        await prisma.client.findFirst({

          where: {

            id: parseInt(clientId),

            companyId:
              currentUser.companyId,

          },

        });

      if (!client) {

        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid Client",
          },
          {
            status: 404,
          }
        );

      }

    }
    if (userId) {

      const user =
        await prisma.user.findFirst({

          where: {

            id: parseInt(userId),

            companyId:
              currentUser.companyId,

          },

        });

      if (!user) {

        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid User",
          },
          {
            status: 404,
          }
        );

      }

    }

    const project =
      await prisma.project.update({
        where: {
          id: parseInt(id),
        },

        data: {
          name,
          description,

          budget: budget
            ? parseFloat(budget)
            : null,

          status,

          client: clientId
            ? {
              connect: {
                id: parseInt(clientId),
              },
            }
            : {
              disconnect: true,
            },

          user: userId
            ? {
              connect: {
                id: parseInt(userId),
              },
            }
            : {
              disconnect: true,
            },
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Project updated successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
      },
      { status: 500 }
    );
  }
}

// ======================
// DELETE PROJECT
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
    const existingProject =
      await prisma.project.findFirst({

        where: {
          id: parseInt(id),

          companyId:
            currentUser.companyId,
        },

      });

    if (!existingProject) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Project not found",
        },
        {
          status: 404,
        }
      );

    }
    await prisma.project.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}