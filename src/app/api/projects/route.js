import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL PROJECTS
// ======================

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
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
    const body = await request.json();

    const {
      name,
      description,
      budget,
      status,
      userId,
      clientId,
    } = body;

    const project = await prisma.project.create({
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