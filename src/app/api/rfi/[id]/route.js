import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE RFI
// ======================

export async function GET(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const rfi =
            await prisma.rfi.findUnique({

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

        const { id } =
            await context.params;

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

                            id:
                                parseInt(userId),

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

        const { id } =
            await context.params;

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