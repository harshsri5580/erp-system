import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET SINGLE

export async function GET(
    request,
    context
) {

    try {
        const { id } =
            await context.params;
        const milestone =
            await prisma.milestone.findUnique({

                where: {
                    id: parseInt(id),
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
        const { id } =
            await context.params;

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

        const { id } =
            await context.params;

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