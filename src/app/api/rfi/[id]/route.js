import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE RFI
// ======================

export async function GET(
    request,
    context
) {

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
        const { id } =
            await context.params;

        const rfi =
            await prisma.rfi.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    project: true,

                    user: true,

                },

            });

        if (!rfi) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "RFI not found",
                },
                {
                    status: 404,
                }
            );

        }
        return NextResponse.json({

            success: true,

            rfi,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch RFI",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// UPDATE RFI
// ======================

export async function PUT(
    request,
    context
) {

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
        const { id } =
            await context.params;
        const existingRfi =
            await prisma.rfi.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingRfi) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "RFI not found",
                },
                {
                    status: 404,
                }
            );

        }
        const body =
            await request.json();

        const {

            rfiNumber,

            title,

            description,

            response,

            priority,

            status,

            dueDate,

            closedDate,

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
        const rfi =
            await prisma.rfi.update({

                where: {

                    id:
                        parseInt(id),

                },

                data: {

                    rfiNumber,

                    title,

                    description,

                    response,

                    priority,

                    status,

                    dueDate:
                        dueDate
                            ? new Date(dueDate)
                            : null,

                    closedDate:
                        closedDate
                            ? new Date(closedDate)
                            : null,

                    project: {

                        connect: {

                            id:
                                parseInt(projectId),

                        },

                    },

                    user: {
                        connect: {
                            id: parseInt(userId),
                        },
                    },

                },

            });

        return NextResponse.json({

            success: true,

            message:
                "RFI updated successfully",

            rfi,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update RFI",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// DELETE RFI
// ======================

export async function DELETE(
    request,
    context
) {

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
        const { id } =
            await context.params;
        const existingRfi =
            await prisma.rfi.findFirst({

                where: {

                    id:
                        parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingRfi) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "RFI not found",
                },
                {
                    status: 404,
                }
            );

        }
        await prisma.rfi.delete({

            where: {

                id:
                    parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "RFI deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete RFI",

            },
            {

                status: 500,

            }
        );

    }

}