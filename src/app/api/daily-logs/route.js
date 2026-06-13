import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL DAILY LOGS
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
        const dailyLogs =
            await prisma.dailylog.findMany({

                where: {

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    project: true,

                    user: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            dailyLogs,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch daily logs",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// CREATE DAILY LOG
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
            await prisma.dailylog.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
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
                "Daily log created successfully",

            dailyLog,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create daily log",

            },
            {

                status: 500,

            }
        );

    }

}