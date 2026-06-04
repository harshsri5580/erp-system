import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ======================
// GET SINGLE PAYMENT
// ======================

export async function GET(
    request,
    context
) {
    try {
        const { id } =
            await context.params;
        const payment =
            await prisma.payment.findUnique({

                where: {

                    id: parseInt(id),

                },

                include: {

                    invoice: true,

                    client: true,

                },

            });

        if (!payment) {

            return NextResponse.json(
                {

                    success: false,

                    message:
                        "Payment not found",

                },
                {

                    status: 404,

                }
            );
        }

        return NextResponse.json({

            success: true,

            payment,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch payment",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// UPDATE PAYMENT
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

            invoiceId,

            clientId,

            amount,

            paymentMethod,

            paymentDate,

            status,

            notes,

        } = body;

        const payment =
            await prisma.payment.update({

                where: {

                    id: parseInt(id),

                },

                data: {

                    amount:
                        parseFloat(amount),

                    paymentMethod,

                    paymentDate,

                    status,

                    notes,

                    invoice: {

                        connect: {

                            id: parseInt(invoiceId),

                        },

                    },

                    client: {

                        connect: {

                            id: parseInt(clientId),

                        },

                    },

                },

                include: {

                    invoice: true,

                },

            });

        // ======================
        // UPDATE INVOICE STATUS
        // ======================

        await prisma.invoice.update({

            where: {

                id: parseInt(invoiceId),

            },

            data: {

                status:
                    status === "Completed"
                        ? "Paid"
                        : "Pending",

            },

        });

        // ======================
        // UPDATE TRANSACTION
        // ======================

        await prisma.transaction.updateMany({

            where: {

                reference: `PAY-${id}`,

            },

            data: {

                title:
                    `Payment - ${payment.invoice.invoiceNumber}`,

                amount:
                    parseFloat(amount),

                date: paymentDate,

                status:
                    status === "Completed"
                        ? "Completed"
                        : "Pending",

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Payment updated successfully",

            payment,

        });
    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to update payment",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// DELETE PAYMENT
// ======================

export async function DELETE(
    request,
    context
) {

    try {
        const { id } =
            await context.params;

        await prisma.payment.delete({

            where: {

                id: parseInt(id),

            },

        });

        return NextResponse.json({

            success: true,

            message:
                "Payment deleted successfully",

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to delete payment",

            },
            {

                status: 500,

            }
        );
    }
}