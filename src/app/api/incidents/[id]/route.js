import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE INCIDENT
// ======================

export async function GET(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const incident =
            await prisma.incident.findUnique({

                where: {

                    id:
                        parseInt(id),

                },

                include: {

                    project: true,

                    user: true,

                    inspection: true,

                },

            });

        return NextResponse.json({

            success: true,

            incident,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch incident",
            },
            {
                status: 500,
            }
        );

    }

}

// ======================
// UPDATE INCIDENT
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

            incidentNumber,

            incidentDate,

            title,

            description,

            incidentType,

            severity,

            location,

            status,

            projectId,

            userId,

            inspectionId,

        } = body;

        const incident =
            await prisma.incident.update({

                where: {

                    id:
                        parseInt(id),

                },

                data: {

                    incidentNumber,

                    incidentDate:
                        incidentDate
                            ? new Date(
                                incidentDate
                            )
                            : null,

                    title,

                    description,

                    incidentType,

                    severity,

                    location,

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

                    ...(inspectionId
                        ? {

                            inspection: {

                                connect: {

                                    id:
                                        parseInt(
                                            inspectionId
                                        ),

                                },

                            },

                        }
                        : {

                            inspection: {

                                disconnect:
                                    true,

                            },

                        }),

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Incident updated successfully",

            incident,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to update incident",
            },
            {
                status: 500,
            }
        );

    }

}

// ======================
// DELETE INCIDENT
// ======================

export async function DELETE(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        await prisma.incident.delete({

            where: {

                id:
                    parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Incident deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to delete incident",
            },
            {
                status: 500,
            }
        );

    }

}