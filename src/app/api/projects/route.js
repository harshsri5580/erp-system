import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

// ======================
// GET ALL PROJECTS
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
    const projects = await prisma.project.findMany({

      where: {
        companyId:
          currentUser.companyId,
      },
      include: {
        user: true,
        client: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

// ======================
// CREATE PROJECT
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
      name,
      description,
      budget,
      status,
      userId,
      clientId,
    } = body;
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
    const project = await prisma.project.create({
      data: {
        company: {
          connect: {
            id: currentUser.companyId,
          },
        },
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
          : undefined,

        user: userId
          ? {
            connect: {
              id: parseInt(userId),
            },
          }
          : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}