import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL INSPECTIONS
// ======================

export async function GET() {

    try {

        const inspections =
            await prisma.inspection.findMany({

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

            inspections,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch inspections",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// CREATE INSPECTION
// ======================

export async function POST(request) {

    try {

        const body =
            await request.json();

        const {

            inspectionNumber,

            inspectionDate,

            inspectionType,

            location,

            checklist,

            remarks,

            status,

            projectId,

            userId,

        } = body;

        if (
            !projectId ||
            !userId
        ) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Project and User are required",

                },
                {

                    status: 400,

                }
            );

        }

        const inspection =
            await prisma.inspection.create({

                data: {

                    inspectionNumber,

                    inspectionDate:
                        inspectionDate
                            ? new Date(
                                inspectionDate
                            )
                            : new Date(),

                    inspectionType,

                    location,

                    checklist,

                    remarks,

                    status,

                    project: {

                        connect: {

                            id:
                                parseInt(
                                    projectId
                                ),

                        },

                    },

                    user: {

                        connect: {

                            id:
                                parseInt(
                                    userId
                                ),

                        },

                    },

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Inspection created successfully",

            inspection,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create inspection",

            },
            {

                status: 500,

            }
        );

    }

}