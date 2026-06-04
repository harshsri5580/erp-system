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

        const progressBilling =
            await prisma.progressbilling.findUnique({

                where: {

                    id:
                        parseInt(id),

                },

                include: {

                    project: true,

                    client: true,

                    milestone: true,

                    user: true,

                },

            });

        return NextResponse.json({

            success: true,

            progressBilling,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch progress billing",

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

            billingNumber,

            billingDate,

            contractAmount,

            previousBilled,

            currentBillAmount,

            percentageComplete,

            remarks,

            status,

            projectId,

            clientId,

            milestoneId,

            userId,

        } = body;

        const totalBilled =
            Number(previousBilled || 0) +
            Number(currentBillAmount || 0);

        const balanceAmount =
            Number(contractAmount || 0) -
            totalBilled;

        const progressBilling =
            await prisma.progressbilling.update({

                where: {

                    id:
                        parseInt(id),

                },

                data: {

                    billingNumber,

                    billingDate:
                        billingDate
                            ? new Date(
                                billingDate
                            )
                            : null,

                    contractAmount:
                        parseFloat(
                            contractAmount || 0
                        ),

                    previousBilled:
                        parseFloat(
                            previousBilled || 0
                        ),

                    currentBillAmount:
                        parseFloat(
                            currentBillAmount || 0
                        ),

                    totalBilled,

                    balanceAmount,

                    percentageComplete:
                        parseFloat(
                            percentageComplete || 0
                        ),

                    remarks,

                    status,

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

                    milestone: {

                        connect: {

                            id:
                                parseInt(milestoneId),

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
                "Progress Billing updated successfully",

            progressBilling,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update progress billing",

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

        await prisma.progressbilling.delete({

            where: {

                id:
                    parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Progress Billing deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete progress billing",

            },
            {

                status: 500,

            }
        );

    }

}