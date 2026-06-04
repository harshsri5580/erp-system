import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ======================
// GET ALL GRN
// ======================

export async function GET() {

    try {

        const grns =
            await prisma.grn.findMany({

                include: {

                    vendor: true,

                    project: true,

                    purchaseorder: {

                        include: {

                            boq: true,

                        },

                    },

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            grns,

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
// CREATE GRN
// ======================

export async function POST(
    request
) {

    try {

        const body =
            await request.json();

        const {

            purchaseOrderId,

            receivedQty,

            remarks,

        } = body;

        const purchaseOrder =
            await prisma.purchaseorder.findUnique({

                where: {

                    id: parseInt(
                        purchaseOrderId
                    ),

                },

            });

        if (
            !purchaseOrder
        ) {

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

        const currentReceived =
            purchaseOrder.receivedQty || 0;

        const totalQty =
            purchaseOrder.quantity || 0;

        const newReceived =
            currentReceived +
            parseFloat(
                receivedQty
            );

        const newPending =
            totalQty -
            newReceived;

        // ======================
        // GET SETTINGS PREFIX
        // ======================

        const settings =
            await prisma.settings.findFirst();

        const prefix =
            settings?.grnPrefix || "GRN";

        const grnNumber =
            `${prefix}-${Date.now()}`;

        const grn =
            await prisma.grn.create({

                data: {

                    grnNumber,

                    receivedQty:
                        parseFloat(
                            receivedQty
                        ),

                    pendingQty:
                        newPending,

                    remarks,

                    vendor: {

                        connect: {

                            id:
                                purchaseOrder.vendorId,

                        },

                    },

                    project:
                        purchaseOrder.projectId
                            ? {

                                connect: {

                                    id:
                                        purchaseOrder.projectId,

                                },

                            }
                            : undefined,

                    purchaseorder: {

                        connect: {

                            id:
                                purchaseOrder.id,

                        },

                    },

                },

            });

        await prisma.purchaseorder.update({


            where: {

                id:
                    purchaseOrder.id,

            },

            data: {

                receivedQty:
                    newReceived,

                pendingQty:
                    newPending,

                status:
                    newPending <= 0
                        ? "Completed"
                        : "Partially Received",

            },

        });


        // ======================
        // INVENTORY AUTO UPDATE
        // ======================

        const existingInventory =
            await prisma.inventory.findFirst({

                where: {

                    purchaseOrderId:
                        purchaseOrder.id,

                },

            });

        if (existingInventory) {

            await prisma.inventory.update({

                where: {

                    id:
                        existingInventory.id,

                },

                data: {

                    quantity:

                        Number(
                            existingInventory.quantity || 0
                        ) +

                        Number(
                            receivedQty || 0
                        ),

                },

            });

        } else {

            const boq =
                await prisma.boq.findUnique({

                    where: {

                        id:
                            purchaseOrder.boqId,

                    },

                });

            await prisma.inventory.create({

                data: {

                    materialName:
                        boq?.itemName ||
                        "Material",

                    unit:
                        boq?.unit ||
                        "Nos",

                    quantity:
                        Number(
                            receivedQty || 0
                        ),

                    minStock: 0,

                    status:
                        "In Stock",

                    vendor:
                        purchaseOrder.vendorId
                            ? {
                                connect: {
                                    id:
                                        purchaseOrder.vendorId,
                                },
                            }
                            : undefined,

                    project:
                        purchaseOrder.projectId
                            ? {
                                connect: {
                                    id:
                                        purchaseOrder.projectId,
                                },
                            }
                            : undefined,

                    purchaseorder: {
                        connect: {
                            id:
                                purchaseOrder.id,
                        },
                    },

                },

            });

        }

        return NextResponse.json({

            success: true,

            message:
                "GRN created successfully",

            grn,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create GRN",

            },
            {

                status: 500,

            }
        );

    }

}