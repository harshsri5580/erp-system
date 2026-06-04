import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ======================
// GET ALL PAYMENTS
// ======================

export async function GET() {

    try {

        const payments =
            await prisma.payment.findMany({

                include: {

                    invoice: true,

                    client: true,

                },

                orderBy: {

                    id: "desc",

                },

            });

        return NextResponse.json({

            success: true,

            payments,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to fetch payments",

            },
            {

                status: 500,

            }
        );
    }
}

// ======================
// CREATE PAYMENT
// ======================

export async function POST(request) {

    try {

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

        // ======================
        // CREATE PAYMENT
        // ======================

        const payment =
            await prisma.payment.create({

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

                    client: true,

                },

            });

        // ======================
        // UPDATE INVOICE STATUS
        // ======================

        if (
            status === "Completed"
        ) {

            await prisma.invoice.update({

                where: {

                    id: parseInt(invoiceId),

                },

                data: {

                    status: "Paid",

                },

            });
        }

        // ======================
        // CREATE TRANSACTION
        // ======================

        await prisma.transaction.create({

            data: {

                title:
                    `Payment - ${invoice.invoiceNumber}`,

                type: "Credit",

                amount:
                    parseFloat(amount),

                reference:
                    `PAY-${payment.id}`,

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
                "Payment created successfully",

            payment,

        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {

                success: false,

                message:
                    "Failed to create payment",

                error: error.message,

            },
            {

                status: 500,

            }
        );
    }
}