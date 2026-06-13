import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE INSPECTION
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

        const inspection =
            await prisma.inspection.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    project: true,

                    // user: true,

                },

            });

        const user = await prisma.user.findUnique({
            where: { id: inspection.userId },
        });

        inspection.user = user;

        if (!inspection) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Inspection not found",
                },
                {
                    status: 404,
                }
            );

        }

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
        const existingInspection =
            await prisma.inspection.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingInspection) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Inspection not found",
                },
                {
                    status: 404,
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

                    userId: parseInt(userId),

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
        const existingInspection =
            await prisma.inspection.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingInspection) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Inspection not found",
                },
                {
                    status: 404,
                }
            );

        }
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