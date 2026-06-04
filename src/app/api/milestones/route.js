import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ALL

export async function GET() {

    try {

        const milestones =
            await prisma.milestone.findMany({

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
            await prisma.milestone.create({

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