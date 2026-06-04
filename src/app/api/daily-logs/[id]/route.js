import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE DAILY LOG
// ======================

export async function GET(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const dailyLog =
            await prisma.dailylog.findUnique({

                where: {

                    id: parseInt(id),

                },

                include: {

                    project: true,

                    user: true,

                },

            });

        return NextResponse.json({

            success: true,

            dailyLog,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch daily log",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// UPDATE DAILY LOG
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

            logDate,

            workDone,

            labourCount,

            materialUsed,

            equipmentUsed,

            issues,

            remarks,

            status,

            projectId,

            userId,

        } = body;

        const dailyLog =
            await prisma.dailylog.update({

                where: {

                    id: parseInt(id),

                },

                data: {

                    logDate:
                        logDate
                            ? new Date(logDate)
                            : null,

                    workDone,

                    labourCount:
                        labourCount
                            ? parseInt(labourCount)
                            : null,

                    materialUsed,

                    equipmentUsed,

                    issues,

                    remarks,

                    status,

                    project: {

                        connect: {

                            id:
                                parseInt(projectId),

                        },

                    },

                    user: {

                        connect: {

                            id:
                                parseInt(userId),

                        },

                    },

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Daily log updated successfully",

            dailyLog,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update daily log",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// DELETE DAILY LOG
// ======================

export async function DELETE(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        await prisma.dailylog.delete({

            where: {

                id: parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Daily log deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete daily log",

            },
            {

                status: 500,

            }
        );

    }

}