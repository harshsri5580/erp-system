import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/getUser";

// ======================
// GET ALL PAYMENTS
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
        const payments = await prisma.payment.findMany({
            where: {
                companyId: currentUser.companyId,
            },
            orderBy: {
                id: "desc",
            },
        });

        const formattedPayments = await Promise.all(
            payments.map(async (payment) => ({
                ...payment,
                invoice: await prisma.invoice.findUnique({
                    where: { id: payment.invoiceId },
                }),
                client: await prisma.client.findUnique({
                    where: { id: payment.clientId },
                }),
            }))
        );

        return NextResponse.json({
            success: true,
            payments: formattedPayments,
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

            invoiceId,

            clientId,

            amount,

            paymentMethod,

            paymentDate,

            status,

            notes,

        } = body;
        const invoice =
            await prisma.invoice.findFirst({

                where: {

                    id: parseInt(invoiceId),

                    companyId:
                        currentUser.companyId,

                },

            });

        if (!invoice) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid Invoice",
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
        // ======================
        // CREATE PAYMENT
        // ======================

        const payment =
            await prisma.payment.create({


                data: {
                    companyId:
                        currentUser.companyId,
                    amount:
                        parseFloat(amount),
                    invoiceId: parseInt(invoiceId),
                    paymentMethod,

                    paymentDate,

                    status,

                    notes,

                    invoiceId: parseInt(invoiceId),
                    clientId: parseInt(clientId),

                },

                // include: {

                //     invoice: true,

                //     client: true,

                // },

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
                companyId:
                    currentUser.companyId,
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