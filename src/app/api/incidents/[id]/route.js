import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE INCIDENT
// ======================

export async function GET(
    request,
    context
) {

    try {
        const currentUser = getUser(request);

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

        const existingIncident =
            await prisma.incident.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingIncident) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Incident not found",
                },
                {
                    status: 404,
                }
            );

        }

        const incident =
            await prisma.incident.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    project: true,

                    // user: true,

                    inspection: true,

                },

            });
        const user = await prisma.user.findUnique({
            where: { id: incident.userId },
        });

        incident.user = user;

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
        const currentUser = getUser(request);

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

        const existingIncident =
            await prisma.incident.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingIncident) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Incident not found",
                },
                {
                    status: 404,
                }
            );

        }

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
        const project =
            await prisma.project.findFirst({

                where: {

                    id: parseInt(projectId),

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

                    id: parseInt(userId),

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
        if (inspectionId) {

            const inspection =
                await prisma.inspection.findFirst({

                    where: {

                        id: parseInt(
                            inspectionId
                        ),

                        companyId:
                            currentUser.companyId,

                    },

                });

            if (!inspection) {

                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Invalid Inspection",
                    },
                    {
                        status: 404,
                    }
                );

            }

        }
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
                            id: parseInt(userId),
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
        const currentUser = getUser(request);

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
        const existingIncident =
            await prisma.incident.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingIncident) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Incident not found",
                },
                {
                    status: 404,
                }
            );

        }
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