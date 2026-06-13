import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL INSPECTIONS
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
        const inspections =
            await prisma.inspection.findMany({

                where: {
                    companyId: currentUser.companyId,
                },

                include: {

                    project: true,

                    // user: true,

                },

                orderBy: {

                    id: "desc",

                },

            });
        const formattedInspections = await Promise.all(
            inspections.map(async (item) => ({
                ...item,
                user: await prisma.user.findUnique({
                    where: { id: item.userId },
                }),
            }))
        );
        return NextResponse.json({
            success: true,
            inspections: formattedInspections,
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
        const project = await prisma.project.findFirst({
            where: {
                id: parseInt(projectId),
                companyId: currentUser.companyId,
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
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(userId),
                companyId: currentUser.companyId,
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

        const existingInspection =
            await prisma.inspection.findFirst({

                where: {

                    inspectionNumber,

                    companyId:
                        currentUser.companyId,

                },

            });

        if (existingInspection) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Inspection number already exists",
                },
                {
                    status: 400,
                }
            );

        }
        const inspection =
            await prisma.inspection.create({

                data: {
                    company: {
                        connect: {
                            id: currentUser.companyId,
                        },
                    },
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

                    userId: parseInt(userId),

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