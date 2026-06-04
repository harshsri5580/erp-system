import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE INSPECTION
// ======================

export async function GET(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const inspection =
            await prisma.inspection.findUnique({

                where: {

                    id:
                        parseInt(id),

                },

                include: {

                    project: true,

                    user: true,

                },

            });

        return NextResponse.json({

            success: true,

            inspection,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch inspection",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// UPDATE INSPECTION
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

        const inspection =
            await prisma.inspection.update({

                where: {

                    id:
                        parseInt(id),

                },

                data: {

                    inspectionNumber,

                    inspectionDate:
                        inspectionDate
                            ? new Date(
                                inspectionDate
                            )
                            : null,

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
                "Inspection updated successfully",

            inspection,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update inspection",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// DELETE INSPECTION
// ======================

export async function DELETE(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        await prisma.inspection.delete({

            where: {

                id:
                    parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Inspection deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete inspection",

            },
            {

                status: 500,

            }
        );

    }

}