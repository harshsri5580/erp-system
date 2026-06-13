import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE DAILY LOG
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

        const dailyLog =
            await prisma.dailylog.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    project: true,

                    user: true,

                },

            });

        if (!dailyLog) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Daily log not found",
                },
                {
                    status: 404,
                }
            );

        }

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

        const existingDailyLog =
            await prisma.dailylog.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingDailyLog) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Daily log not found",
                },
                {
                    status: 404,
                }
            );

        }

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

        const user =
            await prisma.user.findFirst({

                where: {

                    id:
                        parseInt(userId),

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
        const existingDailyLog =
            await prisma.dailylog.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingDailyLog) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Daily log not found",
                },
                {
                    status: 404,
                }
            );

        }

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