import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET SINGLE
// ======================

export async function GET(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        const changeOrder =
            await prisma.changeorder.findUnique({

                where: {

                    id:
                        parseInt(id),

                },

                include: {

                    project: true,

                    client: true,

                    user: true,

                },

            });

        return NextResponse.json({

            success: true,

            changeOrder,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch change order",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// UPDATE
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

            coNumber,

            title,

            description,

            reason,

            oldAmount,

            newAmount,

            status,

            approvedDate,

            projectId,

            clientId,

            userId,

        } = body;

        const differenceAmount =
            Number(newAmount || 0) -
            Number(oldAmount || 0);

        const changeOrder =
            await prisma.changeorder.update({

                where: {

                    id:
                        parseInt(id),

                },

                data: {

                    coNumber,

                    title,

                    description,

                    reason,

                    oldAmount:
                        parseFloat(
                            oldAmount || 0
                        ),

                    newAmount:
                        parseFloat(
                            newAmount || 0
                        ),

                    differenceAmount,

                    status,

                    approvedDate:
                        approvedDate
                            ? new Date(
                                approvedDate
                            )
                            : null,

                    project: {

                        connect: {

                            id:
                                parseInt(projectId),

                        },

                    },

                    client: {

                        connect: {

                            id:
                                parseInt(clientId),

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
                "Change Order updated successfully",

            changeOrder,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update change order",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// DELETE
// ======================

export async function DELETE(
    request,
    context
) {

    try {

        const { id } =
            await context.params;

        await prisma.changeorder.delete({

            where: {

                id:
                    parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Change Order deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete change order",

            },
            {

                status: 500,

            }
        );

    }

}