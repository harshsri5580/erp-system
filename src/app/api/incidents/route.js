import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL INCIDENTS
// ======================

export async function GET() {

    try {

        const incidents =
            await prisma.incident.findMany({

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

        const incident =
            await prisma.incident.create({

                data: {

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