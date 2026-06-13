import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL INCIDENTS
// ======================

export async function GET(request) {

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
        const incidents =
            await prisma.incident.findMany({
                where: {
                    companyId: currentUser.companyId,
                },

                include: {

                    project: true,

                    user: true,

                    inspection: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            incidents,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch incidents",
            },
            {
                status: 500,
            }
        );

    }

}

// ======================
// CREATE INCIDENT
// ======================

export async function POST(request) {

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


        if (
            incidentDate &&
            new Date(incidentDate) >
            new Date()
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Incident date cannot be in the future",
                },
                {
                    status: 400,
                }
            );

        }

        const validSeverity = [
            "Low",
            "Medium",
            "High",
            "Critical",
        ];

        if (
            severity &&
            !validSeverity.includes(severity)
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid severity level",
                },
                {
                    status: 400,
                }
            );

        }

        if (
            !projectId ||
            !userId ||
            !title
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Project, User and Title are required",
                },
                {
                    status: 400,
                }
            );

        }

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
                    message: "Invalid Project",
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
                    message: "Invalid User",
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

                        id: parseInt(inspectionId),

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
        const existingIncident =
            await prisma.incident.findFirst({

                where: {

                    incidentNumber,

                    companyId:
                        currentUser.companyId,

                },

            });

        if (existingIncident) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Incident number already exists",
                },
                {
                    status: 400,
                }
            );

        }
        const incident =
            await prisma.incident.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
                    incidentNumber,

                    incidentDate:
                        incidentDate
                            ? new Date(
                                incidentDate
                            )
                            : new Date(),

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
                        : {}),

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "Incident created successfully",

            incident,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to create incident",
            },
            {
                status: 500,
            }
        );

    }

}