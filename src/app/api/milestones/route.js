import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// GET ALL

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
        const milestones =
            await prisma.milestone.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

                include: {
                    project: true,
                },

                orderBy: {
                    id: "desc",
                },

            });

        return NextResponse.json({

            success: true,

            milestones,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch milestones",
            },
            { status: 500 }
        );

    }

}

// CREATE

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
            title,
            description,
            percentage,
            targetDate,
            completedDate,
            status,
            projectId,
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
        const milestone =
            await prisma.milestone.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
                    title,

                    description,

                    percentage:
                        parseFloat(
                            percentage || 0
                        ),

                    targetDate:
                        targetDate
                            ? new Date(targetDate)
                            : null,

                    completedDate:
                        completedDate
                            ? new Date(completedDate)
                            : null,

                    status,

                    project: {
                        connect: {
                            id: parseInt(
                                projectId
                            ),
                        },
                    },

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Milestone created successfully",

            milestone,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to create milestone",
            },
            { status: 500 }
        );

    }

}