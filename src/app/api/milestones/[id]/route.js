import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// GET SINGLE

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
        const milestone =
            await prisma.milestone.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {
                    project: true,
                },

            });

        return NextResponse.json({

            success: true,

            milestone,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch milestone",
            },
            { status: 500 }
        );

    }

}

// UPDATE

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
        const existingMilestone =
            await prisma.milestone.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingMilestone) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Milestone not found",
                },
                {
                    status: 404,
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
            await prisma.milestone.update({

                where: {
                    id: parseInt(id),
                },

                data: {

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
                "Milestone updated successfully",

            milestone,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to update milestone",
            },
            { status: 500 }
        );

    }

}

// DELETE

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

        const existingMilestone =
            await prisma.milestone.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingMilestone) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Milestone not found",
                },
                {
                    status: 404,
                }
            );

        }
        await prisma.milestone.delete({

            where: {
                id: parseInt(id),
            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Milestone deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to delete milestone",
            },
            { status: 500 }
        );

    }

}