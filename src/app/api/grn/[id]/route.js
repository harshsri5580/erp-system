import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET SINGLE GRN
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

        const grn =
            await prisma.grn.findFirst({

                where: {

                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

                include: {

                    vendor: true,

                    project: true,

                    purchaseorder: {

                        include: {
                            boq: true,
                        },

                    },

                },

            });

        if (!grn) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "GRN not found",

                },
                {

                    status: 404,

                }
            );

        }

        return NextResponse.json({

            success: true,

            grn,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch GRN",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// UPDATE GRN
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

        const body =
            await request.json();

        const {

            receivedQty,

            remarks,

            status,

        } = body;

        const oldGrn =
            await prisma.grn.findFirst({

                where: {
                    id: parseInt(id),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!oldGrn) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "GRN not found",

                },
                {

                    status: 404,

                }
            );

        }

        const purchaseOrder =
            await prisma.purchaseorder.findUnique({

                where: {
                    id:
                        oldGrn.purchaseOrderId,
                },

            });

        if (!purchaseOrder) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Purchase Order not found",

                },
                {

                    status: 404,

                }
            );

        }

        const otherGrns =
            await prisma.grn.findMany({

                where: {

                    purchaseOrderId:
                        oldGrn.purchaseOrderId,

                    NOT: {
                        id:
                            oldGrn.id,
                    },

                },

            });

        const otherReceived =
            otherGrns.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.receivedQty || 0
                    ),
                0
            );

        const totalReceived =
            otherReceived +
            Number(
                receivedQty || 0
            );

        const pendingQty =
            Number(
                purchaseOrder.quantity || 0
            ) - totalReceived;

        const updatedGrn =
            await prisma.grn.update({

                where: {
                    id: parseInt(id),
                },

                data: {

                    receivedQty:
                        Number(
                            receivedQty
                        ),

                    pendingQty,

                    remarks,

                    status,

                },

            });

        await prisma.purchaseorder.update({

            where: {
                id:
                    purchaseOrder.id,
            },

            data: {

                receivedQty:
                    totalReceived,

                pendingQty,

                status:
                    pendingQty <= 0
                        ? "Completed"
                        : "Partially Received",

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "GRN updated successfully",

            grn:
                updatedGrn,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update GRN",

            },
            {

                status: 500,

            }
        );

    }

}

// ======================
// DELETE GRN
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

        const grn =
            await prisma.grn.findFirst({

                where: {
                    id: parseInt(id),
                },

            });

        if (!grn) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "GRN not found",

                },
                {

                    status: 404,

                }
            );

        }

        const purchaseOrder =
            await prisma.purchaseorder.findUnique({

                where: {

                    id:
                        grn.purchaseOrderId,

                },

            });

        await prisma.grn.delete({

            where: {

                id: parseInt(id),

            },

        });

        const remainingGrns =
            await prisma.grn.findMany({

                where: {

                    purchaseOrderId:
                        grn.purchaseOrderId,

                },

            });

        const totalReceived =
            remainingGrns.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.receivedQty || 0
                    ),
                0
            );

        const pendingQty =
            Number(
                purchaseOrder.quantity || 0
            ) - totalReceived;

        await prisma.purchaseorder.update({

            where: {

                id:
                    purchaseOrder.id,

            },

            data: {

                receivedQty:
                    totalReceived,

                pendingQty,

                status:
                    totalReceived === 0
                        ? "Approved"
                        : pendingQty <= 0
                            ? "Completed"
                            : "Partially Received",

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "GRN deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete GRN",

            },
            {

                status: 500,

            }
        );

    }

}