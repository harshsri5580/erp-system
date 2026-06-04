import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE PROJECT
// ======================

export async function GET(
  request,
  context
) {

  try {
    const { id } =
      await context.params;
    const project =
      await prisma.project.findUnique({
        where: {
          id: parseInt(id),
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
    const { id } =
      await context.params;
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