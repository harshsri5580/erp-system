import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE
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

        const changeOrder =
            await prisma.changeorder.findFirst({

                where: {

                    id:
                        parseInt(id),
                    companyId:
                        currentUser.companyId,
                },

                include: {

                    project: true,

                    // client: true,

                    // user: true,

                },

            });

        const client = await prisma.client.findUnique({
            where: { id: changeOrder.clientId },
        });

        const user = await prisma.user.findUnique({
            where: { id: changeOrder.userId },
        });

        changeOrder.client = client;
        changeOrder.user = user;
        if (!changeOrder) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Change Order not found",
                },
                {
                    status: 404,
                }
            );

        }
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

        const existingChangeOrder =
            await prisma.changeorder.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingChangeOrder) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Change Order not found",
                },
                {
                    status: 404,
                }
            );

        }

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
        const client =
            await prisma.client.findFirst({

                where: {

                    id: parseInt(clientId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!client) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid Client",
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

                    clientId: parseInt(clientId),
                    userId: parseInt(userId),

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
        const existingChangeOrder =
            await prisma.changeorder.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!existingChangeOrder) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Change Order not found",
                },
                {
                    status: 404,
                }
            );

        }
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