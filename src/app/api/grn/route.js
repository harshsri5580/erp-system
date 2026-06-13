import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";
// ======================
// GET ALL GRN
// ======================

export async function GET(request) {

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
        const grns =
            await prisma.grn.findMany({

                where: {

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

            purchaseOrderId,

            receivedQty,

            remarks,

        } = body;

        const purchaseOrder =
            await prisma.purchaseorder.findFirst({

                where: {

                    id: parseInt(
                        purchaseOrderId
                    ),

                    companyId:
                        currentUser.companyId,

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


        if (
            newReceived >
            totalQty
        ) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Received quantity exceeds PO quantity",

                },
                {

                    status: 400,

                }
            );

        }

        const boq = await prisma.boq.findFirst({
            where: {
                id: purchaseOrder.boqId,
                companyId: currentUser.companyId,
            },
        });

        if (!boq) {
            return NextResponse.json(
                {
                    success: false,
                    message: "BOQ item not found",
                },
                {
                    status: 404,
                }
            );
        }



        // ======================
        // GET SETTINGS PREFIX
        // ======================

        const settings =
            await prisma.settings.findFirst({
                where: {
                    companyId:
                        currentUser.companyId,
                },
            });

        const prefix =
            settings?.grnPrefix || "GRN";

        const grnNumber =
            `${prefix}-${Date.now()}`;

        const grn =
            await prisma.grn.create({

                data: {
                    company: {
                        connect: {
                            id:
                                currentUser.companyId,
                        },
                    },
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

                    // purchaseOrderId:
                    //     purchaseOrder.id,

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

                    companyId:
                        currentUser.companyId,

                    materialName:
                        boq.itemName,

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

            // const boq =
            //     await prisma.boq.findFirst({

            //         where: {

            //             id:
            //                 purchaseOrder.boqId,

            //             companyId:
            //                 currentUser.companyId,

            //         },

            //     });

            await prisma.inventory.create({

                data: {
                    company: {
                        connect: {
                            id:
                                currentUser.companyId,
                        },
                    },
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
                    vendorId:
                        purchaseOrder.vendorId,

                    project:
                        purchaseOrder.projectId
                            ? {
                                connect: {
                                    id:
                                        purchaseOrder.projectId,
                                },
                            }
                            : undefined,

                    projectId:
                        purchaseOrder.projectId,

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