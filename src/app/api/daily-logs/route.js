import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL DAILY LOGS
// ======================

export async function GET() {

    try {

        const dailyLogs =
            await prisma.dailylog.findMany({

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
            await prisma.dailylog.create({

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